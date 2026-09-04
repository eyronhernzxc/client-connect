// src\pages\merchant\forms\kyc\kyc.jsx
import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import { getKYC } from "../../../../api/getKYC";
import { postKYCSectionOne } from "../../../../api/postKYCSectionOne";
import { postKYCAnswer } from "../../../../api/postKYCAnswer";
import { postCertifiedBy } from "../../../../api/postCertifiedby";

import "../form-style.css";
import "./kyc.css";


const handleKYCInputValidation = (event) => {
    const input = event.target;
    const { name } = input;
    if (!name) return;

    const digitsOnly = (max) => input.value.replace(/\D/g, "").slice(0, max);
    const phoneValue = () => input.value.replace(/[^0-9+()\-\s]/g, "").slice(0, 20);

    if (["telephone_no", "fax_no"].includes(name)) {
        input.value = phoneValue();
    } else if (name === "country") {
        input.value = input.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s.'\-]/g, "");
    } else if (["business_reg_no", "bir_reg_tin_no"].includes(name)) {
        input.value = input.value.replace(/[^A-Za-z0-9.\-\s]/g, "");
    } else if (name === "business_type_other") {
        input.value = input.value.slice(0, 100);
    } else if (["certified_name"].includes(name)) {
        input.value = input.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'\-]/g, "").slice(0, 150);
    } else if (name === "certified_position") {
        input.value = input.value.slice(0, 100);
    } else if (name === "certified_signature") {
        input.value = input.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'\-]/g, "").slice(0, 150);
    }
};

// ─────────────────────────────────────────────────────────────────────
// BUSINESS TYPES
// ─────────────────────────────────────────────────────────────────────

const BUSINESS_TYPES = [
    {
        value: "sole_proprietorship",
        label: "Sole Proprietorship",
    },
    {
        value: "partnership",
        label: "Partnership",
    },
    {
        value: "corporation",
        label: "Corporation",
    },
    {
        value: "cooperative",
        label: "Cooperative",
    },
    {
        value: "others",
        label: "Others",
    },
];

// ─────────────────────────────────────────────────────────────────────
// AUTOSAVE
// ─────────────────────────────────────────────────────────────────────

const DRAFT_KEY = "pisopay_kyc_draft";

function loadDraft() {
    try {
        const raw =
            localStorage.getItem(DRAFT_KEY);

        if (!raw) {
            return {
                step: 0,
                fields: {},
            };
        }

        const parsed =
            JSON.parse(raw);

        return {
            step:
                Number(
                    parsed.step ?? 0
                ),
            fields:
                parsed.fields ?? {},
        };
    } catch {
        return {
            step: 0,
            fields: {},
        };
    }
}

function saveDraft(step, fields) {
    try {
        localStorage.setItem(
            DRAFT_KEY,
            JSON.stringify({
                step,
                fields,
            })
        );
    } catch {
        // Ignore localStorage errors.
    }
}

function clearDraft() {
    try {
        localStorage.removeItem(
            DRAFT_KEY
        );
    } catch {
        // Ignore localStorage errors.
    }
}

// ─────────────────────────────────────────────────────────────────────
// QUESTION HELPERS
// ─────────────────────────────────────────────────────────────────────

function getQuestionId(question) {
    return (
        question?.id ??
        question?.kyc_question_id ??
        null
    );
}

/*
 * Only use actual question fields.
 *
 * Do NOT fall back to "type".
 * "type" can belong to other database/API data
 * and was one possible source of the "0" issue.
 */
function getQuestionText(question) {
    const value =
        question?.question ??
        question?.text ??
        question?.label ??
        "";

    /*
     * Never allow numeric 0 or other non-string
     * metadata values to become visible question text.
     */
    if (
        value === null ||
        value === undefined ||
        typeof value === "number"
    ) {
        return "";
    }

    return String(value).trim();
}

// ─────────────────────────────────────────────────────────────────────
// YES / NO DETECTION
// ─────────────────────────────────────────────────────────────────────

function isYesNoQuestion(question) {
    const text =
        getQuestionText(question)
            .toLowerCase();

    if (!text) {
        return false;
    }

    /*
     * Explicit Yes/No questions.
     */
    if (
        text.includes("(yes/no)") ||
        text.includes("yes/no")
    ) {
        return true;
    }

    /*
     * Questions beginning with these words
     * are normally Yes/No questions.
     */
    const yesNoStart =
        /^(is|are|does|do|did|has|have|can|will|was|were|any)\b/;

    return yesNoStart.test(text);
}

// ─────────────────────────────────────────────────────────────────────
// LISTING QUESTION
// ─────────────────────────────────────────────────────────────────────

/*
 * Broadened beyond exact "Listing Attached" wording — the PEPs and
 * Executive Management questions get edited over time and don't always
 * contain that literal phrase. Keep this in sync with however these
 * questions are worded going forward; anything that fails to match here
 * falls through to "text" and silently gets swallowed as a follow-up of
 * whatever question precedes it (see buildFollowUpMap below).
 */
function isListingQuestion(question) {
    const text =
        getQuestionText(question)
            .toLowerCase();

    if (!text) return false;

    return (
        text.includes(
            "listing attached"
        ) ||
        text.includes(
            "photo identifications"
        ) ||
        text.includes(
            "valid photo identification"
        ) ||
        text.includes(
            "executive management"
        ) ||
        text.includes(
            "politically exposed"
        )
    );
}

// ─────────────────────────────────────────────────────────────────────
// INPUT TYPE
// ─────────────────────────────────────────────────────────────────────

function getQuestionType(question) {
    /*
     * Only trust input_type.
     *
     * Do NOT use question.type because your
     * API may use "type" for something other
     * than the HTML input type.
     */
    const inputType =
        question?.input_type;

    if (
        typeof inputType ===
            "string" &&
        inputType.trim()
    ) {
        const normalized =
            inputType
                .trim()
                .toLowerCase();

        if (
            normalized ===
                "yes_no" ||
            normalized ===
                "yes-no" ||
            normalized ===
                "radio"
        ) {
            return "yes_no";
        }

        if (
            normalized ===
                "listing"
        ) {
            return "listing";
        }

        if (
            normalized ===
                "textarea"
        ) {
            return "textarea";
        }

        if (
            normalized ===
                "text"
        ) {
            return "text";
        }
    }

    /*
     * If there is no explicit input_type,
     * safely infer only Yes/No.
     */
    if (
        isYesNoQuestion(question)
    ) {
        return "yes_no";
    }

    if (
        isListingQuestion(question)
    ) {
        return "listing";
    }

    return "text";
}

// ─────────────────────────────────────────────────────────────────────
// NORMALIZE API RESPONSE
// ─────────────────────────────────────────────────────────────────────

function normalizeKYCResponse(data) {
    let questions = [];

    /*
     * Supported API response formats:
     *
     * [
     *   {...},
     *   {...}
     * ]
     *
     * {
     *   data: [...]
     * }
     *
     * {
     *   questions: [...]
     * }
     */
    if (Array.isArray(data)) {
        questions = data;
    } else if (
        Array.isArray(data?.data)
    ) {
        questions =
            data.data;
    } else if (
        Array.isArray(
            data?.questions
        )
    ) {
        questions =
            data.questions;
    } else if (
        Array.isArray(
            data?.data?.questions
        )
    ) {
        questions =
            data.data.questions;
    }

    return questions
        .filter(
            (question) =>
                question &&
                question.is_active !==
                    false
        )
        .map((question) => {
            const id =
                getQuestionId(
                    question
                );

            const text =
                getQuestionText(
                    question
                );

            const sectionId =
                question?.kyc_section_id ??
                question?.section_id ??
                question?.kyc_section
                    ?.id ??
                null;

            const displayOrder =
                Number(
                    question?.display_order ??
                        0
                );

            return {
                ...question,

                id,

                question:
                    text,

                kyc_section_id:
                    sectionId,

                display_order:
                    Number.isFinite(
                        displayOrder
                    )
                        ? displayOrder
                        : 0,
            };
        })
        .filter(
            (question) =>
                question.id !==
                    null &&
                question.id !==
                    undefined &&
                question.kyc_section_id !==
                    null &&
                question.kyc_section_id !==
                    undefined &&
                question.question !==
                    ""
        )
        .sort(
            (a, b) =>
                Number(
                    a.kyc_section_id
                ) -
                    Number(
                        b.kyc_section_id
                    ) ||
                Number(
                    a.display_order
                ) -
                    Number(
                        b.display_order
                    ) ||
                Number(a.id) -
                    Number(b.id)
        );
}

// ─────────────────────────────────────────────────────────────────────
// GROUP QUESTIONS BY SECTION
// ─────────────────────────────────────────────────────────────────────

function groupQuestionsBySection(
    questions
) {
    const groups = {};

    for (const question of questions) {
        const sectionId =
            question.kyc_section_id;

        if (
            !groups[sectionId]
        ) {
            groups[sectionId] =
                [];
        }

        groups[sectionId].push(
            question
        );
    }

    Object.values(groups).forEach(
        (sectionQuestions) => {
            sectionQuestions.sort(
                (a, b) =>
                    Number(
                        a.display_order
                    ) -
                        Number(
                            b.display_order
                        ) ||
                    Number(a.id) -
                        Number(b.id)
            );
        }
    );

    return groups;
}

// ─────────────────────────────────────────────────────────────────────
// BUILD FOLLOW-UP RELATIONSHIPS
// ─────────────────────────────────────────────────────────────────────

/*
 * A "text"-type question is treated as the follow-up detail field of
 * whichever yes_no/listing question immediately precedes it, in display
 * order, within the same section. This is positional, not wording-based
 * — detail questions are phrased too inconsistently ("If yes...", "If
 * there are...", "Provide the names of...", "Please state...") to
 * regex-match reliably. Every yes_no/listing question "owns" every
 * plain-text question right after it, until the next yes_no/listing
 * question starts a new group.
 *
 * NOTE: a question can only become a follow-up if it fails to be
 * classified as yes_no or listing. If a real standalone question gets
 * misclassified as "text", it will silently get folded into the
 * previous question's reveal box instead of rendering on its own — so
 * keep isListingQuestion/isYesNoQuestion matching in sync with however
 * question text gets worded going forward.
 */
function buildFollowUpMap(
    questions
) {
    const map = {};

    let parentId = null;

    for (const question of questions) {
        const id =
            getQuestionId(
                question
            );

        const type =
            getQuestionType(
                question
            );

        if (
            type === "yes_no" ||
            type === "listing"
        ) {
            parentId = id;
            continue;
        }

        if (parentId !== null) {
            if (
                !map[parentId]
            ) {
                map[parentId] =
                    [];
            }

            map[parentId].push(
                question
            );
        }
    }

    return map;
}

function buildFollowUpParentMap(
    questions
) {
    const map = {};

    let parentId = null;

    for (const question of questions) {
        const id =
            getQuestionId(
                question
            );

        const type =
            getQuestionType(
                question
            );

        if (
            type === "yes_no" ||
            type === "listing"
        ) {
            parentId = id;
            continue;
        }

        if (parentId !== null) {
            map[id] = parentId;
        }
    }

    return map;
}

// ─────────────────────────────────────────────────────────────────────
// SECTION LABELS
// ─────────────────────────────────────────────────────────────────────

function getSectionLabel(
    sectionId
) {
    const labels = {
        1: "Bank / Institution Information",
        2: "Ownership Management Information",
        3: "General Requirements",
        4: "General AML Policies",
        5: "KYC, Due Diligence and Enhanced Due Diligence",
        6: "AML Training",
        7: "Risk Management",
        8: "AML Controls / Internal Measures",
    };

    return (
        labels[sectionId] ??
        `Section ${sectionId}`
    );
}

// ─────────────────────────────────────────────────────────────────────
// DYNAMIC TEXT FIELD
// ─────────────────────────────────────────────────────────────────────

function DynamicDetailField({
    question,
    draftValue,
}) {
    const id =
        getQuestionId(
            question
        );

    const text =
        getQuestionText(
            question
        );

    /*
     * Do not render an invalid question.
     */
    if (!text) {
        return null;
    }

    return (
        <div className="kyc-field">
            <label>
                {text}

                {question.is_required && (
                    <span>
                        {" "}
                        *
                    </span>
                )}
            </label>

            <textarea
                name={`q_${id}`}
                placeholder="Enter your answer"
                defaultValue={
                    draftValue || ""
                }
                required={
                    Boolean(
                        question.is_required
                    )
                }
            />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────
// YES / NO FIELD
// ─────────────────────────────────────────────────────────────────────

function DynamicYesNo({
    question,
    draftValue,
    followUps,
    draftFields,
}) {
    const id =
        getQuestionId(
            question
        );

    const text =
        getQuestionText(
            question
        );

    const [value, setValue] =
        useState(
            draftValue || ""
        );

    if (!text) {
        return null;
    }

    return (
        <div className="kyc-field">
            <label>
                {text}

                {question.is_required && (
                    <span>
                        {" "}
                        *
                    </span>
                )}
            </label>

            <div className="kyc-yesno-group">
                <label>
                    <input
                        type="radio"
                        name={`q_${id}`}
                        value="yes"
                        checked={
                            value ===
                            "yes"
                        }
                        required={
                            Boolean(
                                question.is_required
                            )
                        }
                        onChange={() =>
                            setValue(
                                "yes"
                            )
                        }
                    />

                    Yes
                </label>

                <label>
                    <input
                        type="radio"
                        name={`q_${id}`}
                        value="no"
                        checked={
                            value ===
                            "no"
                        }
                        onChange={() =>
                            setValue(
                                "no"
                            )
                        }
                    />

                    No
                </label>
            </div>

            {/* 
             * FOLLOW-UP QUESTIONS ONLY APPEAR
             * WHEN YES IS SELECTED.
             */}
            {value ===
                "yes" &&
                followUps.length >
                    0 && (
                    <div className="kyc-reveal-detail">
                        {followUps.map(
                            (
                                followUp
                            ) => (
                                <DynamicDetailField
                                    key={getQuestionId(
                                        followUp
                                    )}
                                    question={
                                        followUp
                                    }
                                    draftValue={
                                        draftFields[
                                            `q_${getQuestionId(
                                                followUp
                                            )}`
                                        ]
                                    }
                                />
                            )
                        )}
                    </div>
                )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────
// LISTING / N/A FIELD
// ─────────────────────────────────────────────────────────────────────

function DynamicListing({
    question,
    draftValue,
    followUps,
    draftFields,
}) {
    const id =
        getQuestionId(
            question
        );

    const text =
        getQuestionText(
            question
        );

    const [value, setValue] =
        useState(
            draftValue || ""
        );

    if (!text) {
        return null;
    }

    return (
        <div className="kyc-field">
            <label>
                {text}

                {question.is_required && (
                    <span>
                        {" "}
                        *
                    </span>
                )}
            </label>

            <div className="kyc-checkbox-group">
                <label>
                    <input
                        type="radio"
                        name={`q_${id}`}
                        value="listing_attached"
                        checked={
                            value ===
                            "listing_attached"
                        }
                        required={
                            Boolean(
                                question.is_required
                            )
                        }
                        onChange={() =>
                            setValue(
                                "listing_attached"
                            )
                        }
                    />

                    Listing Attached
                </label>

                <label>
                    <input
                        type="radio"
                        name={`q_${id}`}
                        value="na"
                        checked={
                            value ===
                            "na"
                        }
                        onChange={() =>
                            setValue(
                                "na"
                            )
                        }
                    />

                    N/A
                </label>
            </div>

            {value ===
                "listing_attached" &&
                followUps.length >
                    0 && (
                    <div className="kyc-reveal-detail">
                        {followUps.map(
                            (
                                followUp
                            ) => (
                                <DynamicDetailField
                                    key={getQuestionId(
                                        followUp
                                    )}
                                    question={
                                        followUp
                                    }
                                    draftValue={
                                        draftFields[
                                            `q_${getQuestionId(
                                                followUp
                                            )}`
                                        ]
                                    }
                                />
                            )
                        )}
                    </div>
                )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────
// DYNAMIC QUESTION
// ─────────────────────────────────────────────────────────────────────

function DynamicQuestion({
    question,
    followUpMap,
    followUpParentMap,
    draftFields,
}) {
    const id =
        getQuestionId(
            question
        );

    /*
     * NEVER render a follow-up by itself.
     *
     * Its parent renders it when appropriate.
     */
    if (
        followUpParentMap[id] !==
        undefined
    ) {
        return null;
    }

    const text =
        getQuestionText(
            question
        );

    if (!text) {
        return null;
    }

    const type =
        getQuestionType(
            question
        );

    const followUps =
        followUpMap[id] ||
        [];

    if (
        type === "yes_no"
    ) {
        return (
            <DynamicYesNo
                question={
                    question
                }
                draftValue={
                    draftFields[
                        `q_${id}`
                    ]
                }
                followUps={
                    followUps
                }
                draftFields={
                    draftFields
                }
            />
        );
    }

    if (
        type === "listing"
    ) {
        return (
            <DynamicListing
                question={
                    question
                }
                draftValue={
                    draftFields[
                        `q_${id}`
                    ]
                }
                followUps={
                    followUps
                }
                draftFields={
                    draftFields
                }
            />
        );
    }

    return (
        <DynamicDetailField
            question={
                question
            }
            draftValue={
                draftFields[
                    `q_${id}`
                ]
            }
        />
    );
}

// ─────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────

export default function KnowYourCustomer() {
    const formRef =
        useRef(null);

    const [draft] =
        useState(
            loadDraft
        );

    const [step, setStep] =
        useState(
            Number(
                draft.step || 0
            )
        );

    const [
        businessType,
        setBusinessType,
    ] = useState(
        draft.fields
            .business_type ||
            ""
    );

    const [
        submitting,
        setSubmitting,
    ] = useState(false);

    const [
        submitError,
        setSubmitError,
    ] = useState("");

    const [
        questions,
        setQuestions,
    ] = useState([]);

    const [
        loadingQuestions,
        setLoadingQuestions,
    ] = useState(true);

    const [
        questionLoadError,
        setQuestionLoadError,
    ] = useState("");

    // ─────────────────────────────────────────────────────────────────
    // LOAD QUESTIONS
    // ─────────────────────────────────────────────────────────────────

    useEffect(() => {
        const fetchQuestions =
            async () => {
                try {
                    setLoadingQuestions(
                        true
                    );

                    setQuestionLoadError(
                        ""
                    );

                    const response =
                        await getKYC();

                    const normalized =
                        normalizeKYCResponse(
                            response
                        );

                    console.log(
                        "KYC questions from API:",
                        normalized
                    );

                    setQuestions(
                        normalized
                    );
                } catch (
                    error
                ) {
                    console.error(
                        "Failed to fetch KYC questions:",
                        error
                    );

                    setQuestionLoadError(
                        error.message ||
                            "Failed to load KYC questions."
                    );
                } finally {
                    setLoadingQuestions(
                        false
                    );
                }
            };

        fetchQuestions();
    }, []);

    // ─────────────────────────────────────────────────────────────────
    // PAGE TITLE
    // ─────────────────────────────────────────────────────────────────

    useEffect(() => {
        document.title =
            "Pisopay | Know Your Customer";
    }, []);

    // ─────────────────────────────────────────────────────────────────
    // AUTOSAVE
    // ─────────────────────────────────────────────────────────────────

    const persistDraft =
        () => {
            if (
                !formRef.current
            ) {
                return;
            }

            const formData =
                new FormData(
                    formRef.current
                );

            const fields =
                Object.fromEntries(
                    formData.entries()
                );

            saveDraft(
                step,
                {
                    ...fields,
                    business_type:
                        businessType,
                }
            );
        };

    useEffect(() => {
        persistDraft();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        step,
        businessType,
    ]);

    // ─────────────────────────────────────────────────────────────────
    // GROUPING
    // ─────────────────────────────────────────────────────────────────

    const groupedQuestions =
        groupQuestionsBySection(
            questions
        );

    const sectionIds =
        Object.keys(
            groupedQuestions
        )
            .map(Number)
            .filter(
                Number.isFinite
            )
            .sort(
                (a, b) =>
                    a - b
            );

    /*
     * Step 0 = Section I
     *
     * Steps 1+ = DB sections
     *
     * Final step = Certification
     */
    const totalSteps =
        sectionIds.length +
        2;

    const isSectionOneStep =
        step === 0;

    const isCertificationStep =
        step ===
        totalSteps - 1;

    const sectionIndex =
        !isSectionOneStep &&
        !isCertificationStep
            ? step - 1
            : null;

    const currentSectionId =
        sectionIndex !==
            null
            ? sectionIds[
                  sectionIndex
              ]
            : null;

    const stepLabel =
        isSectionOneStep
            ? "Bank / Institution Information"
            : isCertificationStep
              ? "Certification"
              : getSectionLabel(
                    currentSectionId
                );

    // ─────────────────────────────────────────────────────────────────
    // VALIDATION
    // ─────────────────────────────────────────────────────────────────

    const isStepComplete =
        (stepIndex) => {
            if (
                !formRef.current
            ) {
                return true;
            }

            const container =
                formRef.current.querySelector(
                    `[data-step="${stepIndex}"]`
                );

            if (!container) {
                return true;
            }

            const requiredEls =
                container.querySelectorAll(
                    "[required]"
                );

            const seenRadioGroups =
                new Set();

            for (const el of requiredEls) {
                if (
                    !el.checkValidity()
                ) {
                    return false;
                }

                if (
                    el.type ===
                    "radio"
                ) {
                    if (
                        seenRadioGroups.has(
                            el.name
                        )
                    ) {
                        continue;
                    }

                    seenRadioGroups.add(
                        el.name
                    );

                    const checked =
                        container.querySelector(
                            `input[name="${el.name}"]:checked`
                        );

                    if (
                        !checked
                    ) {
                        return false;
                    }

                    continue;
                }

                if (
                    el.type ===
                    "checkbox"
                ) {
                    if (
                        !el.checked
                    ) {
                        return false;
                    }

                    continue;
                }

                if (
                    !el.value ||
                    !el.value
                        .trim()
                ) {
                    return false;
                }
            }

            return true;
        };

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    const next =
        () => {
            if (
                !isStepComplete(
                    step
                )
            ) {
                setSubmitError(
                    "Please complete all required fields before continuing."
                );

                return;
            }

            setSubmitError(
                ""
            );

            setStep(
                (current) =>
                    Math.min(
                        current +
                            1,
                        totalSteps -
                            1
                    )
            );
        };

    const back =
        () => {
            setSubmitError(
                ""
            );

            setStep(
                (current) =>
                    Math.max(
                        current -
                            1,
                        0
                    )
            );
        };

    const canJumpTo =
        (target) => {
            if (
                target <=
                step
            ) {
                return true;
            }

            for (
                let i = 0;
                i < target;
                i++
            ) {
                if (
                    !isStepComplete(
                        i
                    )
                ) {
                    return false;
                }
            }

            return true;
        };

    const goToStep =
        (target) => {
            if (
                canJumpTo(
                    target
                )
            ) {
                setSubmitError(
                    ""
                );

                setStep(
                    target
                );
            }
        };

    // ─────────────────────────────────────────────────────────────────
    // SUBMIT
    // ─────────────────────────────────────────────────────────────────

    const handleSubmit =
        async (event) => {
            event.preventDefault();

            if (
                !isStepComplete(
                    totalSteps -
                        1
                )
            ) {
                setSubmitError(
                    "Please complete all required certification fields."
                );

                return;
            }

            const formData =
                new FormData(
                    event.currentTarget
                );

            // ---------------------------------------------------------
            // COMPANY ID
            // ---------------------------------------------------------

            let user = {};

            try {
                user =
                    JSON.parse(
                        localStorage.getItem(
                            "user"
                        )
                    ) || {};
            } catch {
                user = {};
            }

            const companyId =
                user?.company_id ??
                user?.company
                    ?.id ??
                null;

            if (!companyId) {
                setSubmitError(
                    "Unable to determine your company ID. Please log in again."
                );

                return;
            }

            setSubmitting(
                true
            );

            setSubmitError(
                ""
            );

            try {
                // =====================================================
                // SECTION ONE
                // =====================================================

                const selectedBusinessType =
                    formData.get(
                        "business_type"
                    );

                const sectionOneData =
                    {
                        company_id:
                            companyId,

                        bank_institution:
                            formData.get(
                                "bank_institution"
                            ),

                        country:
                            formData.get(
                                "country"
                            ),

                        business_type:
                            selectedBusinessType ===
                            "others"
                                ? formData.get(
                                      "business_type_other"
                                  ) ||
                                  "Others"
                                : selectedBusinessType,

                        company_reg_date:
                            formData.get(
                                "company_reg_date"
                            ),

                        business_reg_number:
                            formData.get(
                                "business_reg_no"
                            ),

                        bir_reg_tin_number:
                            formData.get(
                                "bir_reg_tin_no"
                            ),

                        registration_place:
                            formData.get(
                                "registration_place"
                            ),

                        business_address:
                            formData.get(
                                "business_address"
                            ),

                        web_address:
                            formData.get(
                                "web_address"
                            ),

                        parent_institution:
                            formData.get(
                                "parent_institution"
                            ) ||
                            null,

                        parent_institution_address:
                            formData.get(
                                "parent_institution_address"
                            ) ||
                            null,

                        telephone_no:
                            formData.get(
                                "telephone_no"
                            ),

                        fax_no:
                            formData.get(
                                "fax_no"
                            ),

                        email:
                            formData.get(
                                "email"
                            ),
                    };

                await postKYCSectionOne(
                    sectionOneData
                );

                // =====================================================
                // DYNAMIC QUESTIONS
                // =====================================================

                for (const sectionId of sectionIds) {
                    const sectionQuestions =
                        groupedQuestions[
                            sectionId
                        ] || [];

                    const followUpMap =
                        buildFollowUpMap(
                            sectionQuestions
                        );

                    const followUpParentMap =
                        buildFollowUpParentMap(
                            sectionQuestions
                        );

                    for (const question of sectionQuestions) {
                        const id =
                            getQuestionId(
                                question
                            );

                        /*
                         * Skip follow-up questions.
                         *
                         * They are saved in the
                         * parent's if_yes field.
                         */
                        if (
                            followUpParentMap[
                                id
                            ] !==
                            undefined
                        ) {
                            continue;
                        }

                        const raw =
                            formData.get(
                                `q_${id}`
                            );

                        if (
                            raw ===
                                null ||
                            raw ===
                                undefined ||
                            !String(
                                raw
                            ).trim()
                        ) {
                            continue;
                        }

                        let answer =
                            String(
                                raw
                            ).trim();

                        if (
                            answer ===
                            "yes"
                        ) {
                            answer =
                                "Yes";
                        }

                        if (
                            answer ===
                            "no"
                        ) {
                            answer =
                                "No";
                        }

                        if (
                            answer ===
                            "listing_attached"
                        ) {
                            answer =
                                "Listing Attached";
                        }

                        if (
                            answer ===
                            "na"
                        ) {
                            answer =
                                "N/A";
                        }

                        // -------------------------------------------------
                        // FOLLOW-UP ANSWERS
                        // -------------------------------------------------

                        const followUps =
                            followUpMap[
                                id
                            ] || [];

                        const followUpValues =
                            [];

                        /*
                         * Follow-ups are collected ONLY
                         * when the parent answer is Yes.
                         */
                        if (
                            answer ===
                            "Yes"
                        ) {
                            for (const followUp of followUps) {
                                const followUpId =
                                    getQuestionId(
                                        followUp
                                    );

                                const value =
                                    formData.get(
                                        `q_${followUpId}`
                                    );

                                if (
                                    value &&
                                    String(
                                        value
                                    ).trim()
                                ) {
                                    followUpValues.push(
                                        String(
                                            value
                                        ).trim()
                                    );
                                }
                            }
                        }

                        const answerData =
                            {
                                company_id:
                                    companyId,

                                kyc_question_id:
                                    id,

                                answer,

                                if_yes:
                                    followUpValues.length >
                                    0
                                        ? followUpValues.join(
                                              "\n"
                                          )
                                        : null,
                            };

                        console.log(
                            "Submitting KYC answer:",
                            answerData
                        );

                        await postKYCAnswer(
                            answerData
                        );
                    }
                }

                // =====================================================
                // CERTIFICATION
                // =====================================================

                const certifiedByData =
                    {
                        company_id:
                            companyId,

                        name:
                            formData.get(
                                "certified_name"
                            ),

                        signature:
                            formData.get(
                                "certified_signature"
                            ),

                        position:
                            formData.get(
                                "certified_position"
                            ),

                        date_signed:
                            formData.get(
                                "certified_date_signed"
                            ),
                    };

                await postCertifiedBy(
                    certifiedByData
                );

                clearDraft();

                alert(
                    "KYC submitted successfully!"
                );
            } catch (
                error
            ) {
                console.error(
                    "KYC submission failed:",
                    error
                );

                setSubmitError(
                    error.message ||
                        "Something went wrong while submitting the KYC form."
                );
            } finally {
                setSubmitting(
                    false
                );
            }
        };

    // ─────────────────────────────────────────────────────────────────
    // LOADING
    // ─────────────────────────────────────────────────────────────────

    if (
        loadingQuestions
    ) {
        return (
            <div className="kyc-root">
                <div className="kyc-panel">
                    <div className="kyc-panel-head">
                        <p className="kyc-eyebrow">
                            Know Your Customer
                        </p>

                        <h1>
                            Loading KYC questions...
                        </h1>
                    </div>

                    <div className="kyc-panel-body">
                        <p>
                            Please wait while we
                            load the latest KYC
                            questions.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────
    // ERROR
    // ─────────────────────────────────────────────────────────────────

    if (
        questionLoadError
    ) {
        return (
            <div className="kyc-root">
                <div className="kyc-panel">
                    <div className="kyc-panel-head">
                        <p className="kyc-eyebrow">
                            Know Your Customer
                        </p>

                        <h1>
                            Unable to load KYC
                            questions
                        </h1>
                    </div>

                    <div className="kyc-panel-body">
                        <p className="kyc-error">
                            {
                                questionLoadError
                            }
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────

    return (
        <div className="kyc-root">
            <form
                ref={formRef}
                onChange={
                    persistDraft
                }
                onInput={
                    handleKYCInputValidation
                }
                onSubmit={
                    handleSubmit
                }
                noValidate
                className="kyc-panel"
            >
                {/* STEPPER */}

                <div className="kyc-stepper">
                    {Array.from({
                        length: totalSteps,
                    }).map(
                        (
                            _,
                            i
                        ) => {
                            const unlocked =
                                canJumpTo(
                                    i
                                );

                            return (
                                <div
                                    key={i}
                                    className={`kyc-step ${
                                        i ===
                                        step
                                            ? "current"
                                            : i <
                                                step
                                              ? "done"
                                              : ""
                                    } ${
                                        unlocked
                                            ? "clickable"
                                            : "locked"
                                    }`}
                                    onClick={() =>
                                        goToStep(
                                            i
                                        )
                                    }
                                    title={
                                        unlocked
                                            ? undefined
                                            : "Complete the previous required fields first"
                                    }
                                >
                                    <div className="kyc-dot">
                                        {i +
                                            1}
                                    </div>

                                    {i <
                                        totalSteps -
                                            1 && (
                                        <div className="kyc-connector" />
                                    )}
                                </div>
                            );
                        }
                    )}
                </div>

                {/* HEADER */}

                <div className="kyc-panel-head">
                    <p className="kyc-eyebrow">
                        Step{" "}
                        {step +
                            1}{" "}
                        of{" "}
                        {
                            totalSteps
                        }
                    </p>

                    <h1>
                        {
                            stepLabel
                        }
                    </h1>
                </div>

                <div className="kyc-panel-body">
                    {submitError && (
                        <p className="kyc-error">
                            {
                                submitError
                            }
                        </p>
                    )}

                    {/* =================================================
                        SECTION I
                    ================================================= */}

                    <div
                        data-step={
                            0
                        }
                        style={{
                            display:
                                isSectionOneStep
                                    ? "flex"
                                    : "none",
                            flexDirection:
                                "column",
                            gap: "18px",
                        }}
                    >
                        <div className="kyc-row">
                            <div className="kyc-input-field">
                                <label>
                                    Bank /
                                    Institution{" "}
                                    <span>
                                        *
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="bank_institution"
                                    placeholder="Enter bank/institution name"
                                    defaultValue={
                                        draft
                                            .fields
                                            .bank_institution ||
                                        ""
                                    }
                                    required
                                />
                            </div>

                            <div className="kyc-input-field">
                                <label>
                                    Country{" "}
                                    <span>
                                        *
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="country" maxLength={100} pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s.'\-]+"
                                    placeholder="Enter country"
                                    defaultValue={
                                        draft
                                            .fields
                                            .country ||
                                        ""
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="kyc-field">
                            <label>
                                Type of Business{" "}
                                <span>
                                    *
                                </span>
                            </label>

                            <div className="kyc-checkbox-group">
                                {BUSINESS_TYPES.map(
                                    (
                                        option
                                    ) => (
                                        <label
                                            key={
                                                option.value
                                            }
                                        >
                                            <input
                                                type="radio"
                                                name="business_type"
                                                value={
                                                    option.value
                                                }
                                                checked={
                                                    businessType ===
                                                    option.value
                                                }
                                                required
                                                onChange={(
                                                    event
                                                ) => {
                                                    setBusinessType(
                                                        event
                                                            .target
                                                            .value
                                                    );

                                                    setSubmitError(
                                                        ""
                                                    );
                                                }}
                                            />

                                            {
                                                option.label
                                            }
                                        </label>
                                    )
                                )}
                            </div>

                            {businessType ===
                                "others" && (
                                <input
                                    type="text"
                                    name="business_type_other"
                                    placeholder="Please specify"
                                    defaultValue={
                                        draft
                                            .fields
                                            .business_type_other ||
                                        ""
                                    }
                                    required
                                />
                            )}
                        </div>

                        <div className="kyc-row">
                            <div className="kyc-input-field">
                                <label>
                                    Company Registration
                                    Date{" "}
                                    <span>
                                        *
                                    </span>
                                </label>

                                <input
                                    type="date"
                                    name="company_reg_date"
                                    defaultValue={
                                        draft
                                            .fields
                                            .company_reg_date ||
                                        ""
                                    }
                                    required
                                />
                            </div>

                            <div className="kyc-input-field">
                                <label>
                                    Business Registration
                                    No.{" "}
                                    <span>
                                        *
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="business_reg_no" maxLength={50} pattern="[A-Za-z0-9.\-\s]+"
                                    placeholder="Enter registration no."
                                    defaultValue={
                                        draft
                                            .fields
                                            .business_reg_no ||
                                        ""
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="kyc-row">
                            <div className="kyc-input-field">
                                <label>
                                    BIR Registration
                                    No. / TIN No.{" "}
                                    <span>
                                        *
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="bir_reg_tin_no" maxLength={30} pattern="[A-Za-z0-9.\-\s]+"
                                    placeholder="Enter BIR/TIN no."
                                    defaultValue={
                                        draft
                                            .fields
                                            .bir_reg_tin_no ||
                                        ""
                                    }
                                    required
                                />
                            </div>

                            <div className="kyc-input-field">
                                <label>
                                    Place of Registration{" "}
                                    <span>
                                        *
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="registration_place"
                                    placeholder="Enter place of registration"
                                    defaultValue={
                                        draft
                                            .fields
                                            .registration_place ||
                                        ""
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="kyc-field">
                            <label>
                                Business Address{" "}
                                <span>
                                    *
                                </span>
                            </label>

                            <input
                                type="text"
                                name="business_address"
                                placeholder="Enter business address"
                                defaultValue={
                                    draft
                                        .fields
                                        .business_address ||
                                    ""
                                }
                                required
                            />
                        </div>

                        <div className="kyc-field">
                            <label>
                                Web Address
                            </label>

                            <input
                                type="url"
                                name="web_address"
                                placeholder="Enter web address"
                                defaultValue={
                                    draft
                                        .fields
                                        .web_address ||
                                    ""
                                }
                            />
                        </div>

                        <div className="kyc-row">
                            <div className="kyc-input-field">
                                <label>
                                    Name of Parent
                                    Institution
                                    {" "}
                                    (If applicable)
                                </label>

                                <input
                                    type="text"
                                    name="parent_institution"
                                    placeholder="Enter parent institution name"
                                    defaultValue={
                                        draft
                                            .fields
                                            .parent_institution ||
                                        ""
                                    }
                                />
                            </div>

                            <div className="kyc-input-field">
                                <label>
                                    Address of Parent
                                    Institution
                                </label>

                                <input
                                    type="text"
                                    name="parent_institution_address"
                                    placeholder="Enter parent institution address"
                                    defaultValue={
                                        draft
                                            .fields
                                            .parent_institution_address ||
                                        ""
                                    }
                                />
                            </div>
                        </div>

                        <div className="kyc-row">
                            <div className="kyc-input-field">
                                <label>
                                    Telephone No.{" "}
                                    <span>
                                        *
                                    </span>
                                </label>

                                <input
                                    type="tel"
                                    name="telephone_no" maxLength={20} pattern="[0-9+()\-\s]{7,20}"
                                    placeholder="Enter telephone no."
                                    defaultValue={
                                        draft
                                            .fields
                                            .telephone_no ||
                                        ""
                                    }
                                    required
                                />
                            </div>

                            <div className="kyc-input-field">
                                <label>
                                    Fax No.
                                </label>

                                <input
                                    type="text"
                                    name="fax_no" maxLength={20} pattern="[0-9+()\-\s]{7,20}"
                                    placeholder="Enter fax no."
                                    defaultValue={
                                        draft
                                            .fields
                                            .fax_no ||
                                        ""
                                    }
                                />
                            </div>
                        </div>

                        <div className="kyc-field">
                            <label>
                                Email Address{" "}
                                <span>
                                    *
                                </span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                defaultValue={
                                    draft
                                        .fields
                                        .email ||
                                    ""
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* =================================================
                        DATABASE QUESTIONS
                    ================================================= */}

                    {sectionIds.map(
                        (
                            sectionId,
                            index
                        ) => {
                            const sectionQuestions =
                                groupedQuestions[
                                    sectionId
                                ] || [];

                            const followUpMap =
                                buildFollowUpMap(
                                    sectionQuestions
                                );

                            const followUpParentMap =
                                buildFollowUpParentMap(
                                    sectionQuestions
                                );

                            return (
                                <div
                                    key={
                                        sectionId
                                    }
                                    data-step={
                                        index +
                                        1
                                    }
                                    style={{
                                        display:
                                            sectionIndex ===
                                            index
                                                ? "flex"
                                                : "none",
                                        flexDirection:
                                            "column",
                                        gap: "18px",
                                    }}
                                >
                                    {sectionQuestions.map(
                                        (
                                            question
                                        ) => (
                                            <DynamicQuestion
                                                key={getQuestionId(
                                                    question
                                                )}
                                                question={
                                                    question
                                                }
                                                followUpMap={
                                                    followUpMap
                                                }
                                                followUpParentMap={
                                                    followUpParentMap
                                                }
                                                draftFields={
                                                    draft
                                                        .fields
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            );
                        }
                    )}

                    {/* =================================================
                        CERTIFICATION
                    ================================================= */}

                    <div
                        data-step={
                            totalSteps -
                            1
                        }
                        style={{
                            display:
                                isCertificationStep
                                    ? "flex"
                                    : "none",
                            flexDirection:
                                "column",
                            gap: "18px",
                        }}
                    >
                        <p className="kyc-certification-text">
                            I hereby
                            certify
                            that the
                            statements
                            and
                            information
                            given
                            above are
                            true and
                            correct.
                        </p>

                        <div className="kyc-row">
                            <div className="kyc-input-field">
                                <label>
                                    Name of Authorized
                                    Officer{" "}
                                    <span>
                                        *
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="certified_name" maxLength={150} pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+"
                                    placeholder="Enter name"
                                    defaultValue={
                                        draft
                                            .fields
                                            .certified_name ||
                                        ""
                                    }
                                    required
                                />
                            </div>

                            <div className="kyc-input-field">
                                <label>
                                    Position/Rank{" "}
                                    <span>
                                        *
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="certified_position" maxLength={100}
                                    placeholder="Enter position/rank"
                                    defaultValue={
                                        draft
                                            .fields
                                            .certified_position ||
                                        ""
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="kyc-row">
                            <div className="kyc-input-field">
                                <label>
                                    Signature{" "}
                                    <span>
                                        *
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="certified_signature" maxLength={150} pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+"
                                    placeholder="Type full name as signature"
                                    defaultValue={
                                        draft
                                            .fields
                                            .certified_signature ||
                                        ""
                                    }
                                    required
                                />
                            </div>

                            <div className="kyc-input-field">
                                <label>
                                    Date Signed{" "}
                                    <span>
                                        *
                                    </span>
                                </label>

                                <input
                                    type="date"
                                    name="certified_date_signed"
                                    defaultValue={
                                        draft
                                            .fields
                                            .certified_date_signed ||
                                        ""
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}

                <div className="kyc-actions kyc-actions-footer">
                    <button
                        type="button"
                        className="kyc-btn"
                        onClick={
                            back
                        }
                        disabled={
                            step === 0
                        }
                    >
                        Back
                    </button>

                    {!isCertificationStep ? (
                        <button
                            type="button"
                            className="kyc-btn primary"
                            onClick={
                                next
                            }
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="kyc-btn primary"
                            disabled={
                                submitting
                            }
                        >
                            {submitting
                                ? "Submitting…"
                                : "Submit"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}