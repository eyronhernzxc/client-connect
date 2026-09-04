import { useState, useEffect, useRef } from 'react';
import {
    createRiskAssessmentProfile,
    createClientCertification,
} from "../../../../api/postRisk";
import Header from '../header/header';
import '../form-style.css';
import './risk-assess.css';

const STORAGE_KEY = 'pisopay_risk_assessment_draft';
const AUTOSAVE_DELAY_MS = 500;

const BUSINESS_NATURE_OPTIONS = [
    "Private Household with Employed Persons",
    "Extra-territorial Organizations and Bodies",
    "Jewelry and Precious Stones Dealer",
    "Foreign Exchange Dealer/Money Changer/Remittance Agent",
    "Agriculture, Forestry, and Fishing",
    "Mining and Quarrying",
    "Manufacturing",
    "Electricity, Gas, Steam, and Air-conditioning Supply",
    "Real Estate Activities",
    "Water Supply, Sewerage, Waste Management and Remediation Activities",
    "Construction",
    "Wholesale and Retail Trade, Repair of Motor Vehicles and Motorcycles",
    "Transportation and Storage",
    "Accommodation and Food Service Activities",
    "Information and Communication",
    "Professional, Scientific, and Technical Activities",
    "Administrative and Support Service",
    "Public Administrative and Defense Education",
    "Human Health and Social Work Activities",
    "Activities of Private Households as Employers and Undifferentiated",
    "Financial and Insurance Activities",
    "Activities of Extraterritorial Organizations, and Bodies",
    "Gambling and Betting Activities",
    "Goods and Services and Producing Activities of Households for own use",
];

const SOURCE_OF_FUND_OPTIONS = [
    "Business",
    "Sale of Assets",
    "Professional Fees",
    "Interest/Commission",
    "Loans",
    "Salary",
    "Government Appropriations",
];

const MONTHLY_INCOME_OPTIONS = [
    "Php 100,000.00 and below",
    "Php 100,000.01 - 500,000.00",
    "Php 500,000.01 - 1,000,000.00",
    "Php 1,000,000.01 - 5,000,000.00",
    "Over Php 5,000,000.01",
];

const ANNUAL_INCOME_OPTIONS = [
    "Php 1,000,000.00 and below",
    "Php 1,000,000.01 - 5,000,000.00",
    "Php 5,000,000.01 - 10,000,000.00",
    "Php 10,000,000.01 - 50,000,000.00",
    "Over Php 50,000,000.01",
];

const INITIAL_SIMPLE_FIELDS = {
    business_name: "",
    business_address: "",
    business_contact_number: "",
    contact_person: "",
    contact_number: "",
    monthly_gross_income: "",
    annual_gross_income: "",
    transactions_per_day: "",
    transactions_per_month: "",
    daily_transaction_amount: "",
    monthly_transaction_amount: "",
    certified_name: "",
    certified_designation: "",
    certified_date: "",
};

const INITIAL_LICENSES = [
    { type: "", number: "", year: "" },
    { type: "", number: "", year: "" },
    { type: "", number: "", year: "" },
];

export default function RiskAssessment() {

    const [simpleFields, setSimpleFields] = useState(INITIAL_SIMPLE_FIELDS);
    const [natureOfBusiness, setNatureOfBusiness] = useState([]);
    const [otherNature, setOtherNature] = useState("");
    const [sourceOfFund, setSourceOfFund] = useState([]);
    const [otherSource, setOtherSource] = useState("");
    const [countries, setCountries] = useState(["", "", "", "", "", ""]);

    const [isPep, setIsPep] = useState("no");
    const [pepName, setPepName] = useState("");
    const [pepPosition, setPepPosition] = useState("");

    const [isBspRegulated, setIsBspRegulated] = useState("no");
    const [licenses, setLicenses] = useState(INITIAL_LICENSES);

    const [isAmlcRegistered, setIsAmlcRegistered] = useState("no");
    const [amlcYear, setAmlcYear] = useState("");
    const [conductsKyc, setConductsKyc] = useState("");

    const [draftRestored, setDraftRestored] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const hasLoadedDraft = useRef(false);

    useEffect(() => {

        try {

            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {

                const draft = JSON.parse(saved);

                if (draft.simpleFields) {
                    setSimpleFields((prev) => ({
                        ...prev,
                        ...draft.simpleFields
                    }));
                }

                if (draft.natureOfBusiness) {
                    setNatureOfBusiness(draft.natureOfBusiness);
                }

                if (typeof draft.otherNature === "string") {
                    setOtherNature(draft.otherNature);
                }

                if (draft.sourceOfFund) {
                    setSourceOfFund(draft.sourceOfFund);
                }

                if (typeof draft.otherSource === "string") {
                    setOtherSource(draft.otherSource);
                }

                if (draft.countries) {
                    setCountries(draft.countries);
                }

                if (draft.isPep) {
                    setIsPep(draft.isPep);
                }

                if (typeof draft.pepName === "string") {
                    setPepName(draft.pepName);
                }

                if (typeof draft.pepPosition === "string") {
                    setPepPosition(draft.pepPosition);
                }

                if (draft.isBspRegulated) {
                    setIsBspRegulated(draft.isBspRegulated);
                }

                if (draft.licenses) {
                    setLicenses(draft.licenses);
                }

                if (draft.isAmlcRegistered) {
                    setIsAmlcRegistered(draft.isAmlcRegistered);
                }

                if (typeof draft.amlcYear === "string") {
                    setAmlcYear(draft.amlcYear);
                }

                if (typeof draft.conductsKyc === "string") {
                    setConductsKyc(draft.conductsKyc);
                }

                setDraftRestored(true);
            }

        } catch (error) {

            console.error(
                "Failed to restore saved progress: ",
                error
            );

        } finally {

            hasLoadedDraft.current = true;

        }

    }, []);

    useEffect(() => {

        if (!hasLoadedDraft.current) return;

        const timeout = setTimeout(() => {

            const draft = {
                simpleFields,
                natureOfBusiness,
                otherNature,
                sourceOfFund,
                otherSource,
                countries,
                isPep,
                pepName,
                pepPosition,
                isBspRegulated,
                licenses,
                isAmlcRegistered,
                amlcYear,
                conductsKyc,
                savedAt: new Date().toISOString(),
            };

            try {

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(draft)
                );

            } catch (error) {

                console.error(
                    "Failed to save progress: ",
                    error
                );

            }

        }, AUTOSAVE_DELAY_MS);

        return () => clearTimeout(timeout);

    }, [
        simpleFields,
        natureOfBusiness,
        otherNature,
        sourceOfFund,
        otherSource,
        countries,
        isPep,
        pepName,
        pepPosition,
        isBspRegulated,
        licenses,
        isAmlcRegistered,
        amlcYear,
        conductsKyc
    ]);

    const handleFieldChange = (event) => {

        const { name, value } = event.target;
        let validatedValue = value;

        if (
            ["transactions_per_day", "transactions_per_month"]
                .includes(name)
        ) {
            validatedValue = value.replace(/\D/g, "");
        }

        if (
            ["daily_transaction_amount", "monthly_transaction_amount"]
                .includes(name)
        ) {
            validatedValue = value.replace(/[^0-9.]/g, "");
        }

        if (
            name === "contact_person" ||
            name === "certified_name"
        ) {
            validatedValue = value.replace(
                /[^A-Za-zÀ-ÖØ-öø-ÿ\s'\-]/g,
                ""
            );
        }

        if (
            name === "business_contact_number" ||
            name === "contact_number"
        ) {
            validatedValue = value.replace(
                /[^0-9+()\-\s]/g,
                ""
            );
        }

        setSimpleFields((prev) => ({
            ...prev,
            [name]: validatedValue
        }));
    };

    const toggleNature = (option) => {

        setNatureOfBusiness((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );

    };

    const toggleSource = (option) => {

        setSourceOfFund((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );

    };

    const handleCountryChange = (index, value) => {

        const validatedValue = value.replace(
            /[^A-Za-zÀ-ÖØ-öø-ÿ\s.'\-]/g,
            ""
        );

        setCountries((prev) => {

            const updated = [...prev];
            updated[index] = validatedValue;

            return updated;

        });

    };

    const handleLicenseChange = (index, field, value) => {

        let validatedValue = value;

        if (field === "type") {

            validatedValue = value
                .replace(/[^A-Za-z0-9._\-]/g, "")
                .slice(0, 11);

        } else if (field === "number") {

            validatedValue = value.replace(
                /[^A-Za-z0-9._\-]/g,
                ""
            );

        } else if (field === "year") {

            validatedValue = value
                .replace(/\D/g, "")
                .slice(0, 4);

        }

        setLicenses((prev) => {

            const updated = [...prev];

            updated[index] = {
                ...updated[index],
                [field]: validatedValue
            };

            return updated;

        });

    };

    const clearSavedProgress = () => {

        if (
            !window.confirm(
                "Clear all progress on this form? This cannot be undone."
            )
        ) {
            return;
        }

        try {

            localStorage.removeItem(STORAGE_KEY);

        } catch (error) {

            console.error(
                "Failed to clear saved progress: ",
                error
            );

        }

        setSimpleFields(INITIAL_SIMPLE_FIELDS);
        setNatureOfBusiness([]);
        setOtherNature("");
        setSourceOfFund([]);
        setOtherSource("");
        setCountries(["", "", "", "", "", ""]);
        setIsPep("no");
        setPepName("");
        setPepPosition("");
        setIsBspRegulated("no");
        setLicenses(INITIAL_LICENSES);
        setIsAmlcRegistered("no");
        setAmlcYear("");
        setConductsKyc("");
        setDraftRestored(false);

    };

    const handleRiskAssessmentSubmit = async (event) => {

        event.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {

            /*
             * --------------------------------------------------
             * Get logged-in user
             * --------------------------------------------------
             */

            const storedUser = localStorage.getItem("user");

            if (!storedUser) {

                throw new Error(
                    "No logged-in user was found."
                );

            }

            const user = JSON.parse(storedUser);

            /*
             * The stored user is wrapped inside a "data" object.
             * Therefore company_id needs to be checked inside
             * user.data rather than directly on user.
             */

            const companyId =
                user?.data?.company_id ??
                user?.data?.company?.id ??
                user?.data?.profile?.company_id ??
                user?.data?.profile?.company?.id ??
                user?.company_id ??
                user?.company?.id ??
                user?.profile?.company_id ??
                user?.profile?.company?.id;

            if (!companyId) {

                console.error(
                    "Stored user:",
                    user
                );

                throw new Error(
                    "Unable to find company_id for the logged-in user."
                );

            }

            /*
             * --------------------------------------------------
             * STEP 1
             * Create Risk Assessment Profile
             * POST /api/risk-assessment-profiles
             * --------------------------------------------------
             */

            const connectedCountry = countries
                .filter(
                    (country) => country.trim() !== ""
                )
                .join(", ");

            const businessNatureValues = [
                ...natureOfBusiness,
                ...(otherNature.trim()
                    ? [`Other: ${otherNature.trim()}`]
                    : [])
            ];

            const sourceOfFundValues = [
                ...sourceOfFund,
                ...(otherSource.trim()
                    ? [`Other: ${otherSource.trim()}`]
                    : [])
            ];

            const riskAssessmentResponse =
                await createRiskAssessmentProfile({

                    companyId,

                    businessNature:
                        businessNatureValues.join(", "),

                    wealthSource:
                        sourceOfFundValues.join(", "),

                    monthlyGrossIncome:
                        simpleFields.monthly_gross_income,

                    annualGrossIncome:
                        simpleFields.annual_gross_income,

                    transactionPerDay:
                        Number(
                            simpleFields.transactions_per_day
                        ),

                    totalAmountPerDay:
                        Number(
                            simpleFields.daily_transaction_amount
                        ),

                    transactionPerMonth:
                        Number(
                            simpleFields.transactions_per_month
                        ),

                    totalAmountPerMonth:
                        Number(
                            simpleFields.monthly_transaction_amount
                        ),

                    connectedCountry,

                    politicallyExposedPerson:
                        isPep === "yes"
                            ? "Yes"
                            : "No",

                    regulatedByBsp:
                        isBspRegulated === "yes"
                            ? "Yes"
                            : "No",

                    anonymityBoundaryRegistration: "No",

                });

            console.log(
                "Risk Assessment Profile response:",
                riskAssessmentResponse
            );

            const riskAssessmentProfileId =
                riskAssessmentResponse?.data?.id ??
                riskAssessmentResponse?.id;

            if (!riskAssessmentProfileId) {

                throw new Error(
                    "The Risk Assessment Profile was created, but no ID was returned."
                );

            }

            /*
             * --------------------------------------------------
             * STEP 2
             * Create Client Certification
             * POST /api/client-certifications
             * --------------------------------------------------
             */

            const clientCertificationResponse =
                await createClientCertification({

                    companyId,

                    riskAssessmentProfileId,

                    name:
                        simpleFields.certified_name,

                    designation:
                        simpleFields.certified_designation,

                    date:
                        simpleFields.certified_date,

                    signature:
                        simpleFields.certified_name,

                });

            console.log(
                "Client Certification response:",
                clientCertificationResponse
            );

            alert(
                "Risk assessment submitted successfully."
            );

            try {

                localStorage.removeItem(
                    STORAGE_KEY
                );

            } catch (storageError) {

                console.error(
                    "Failed to clear saved progress:",
                    storageError
                );

            }

            setDraftRestored(false);

        } catch (error) {

            console.error(
                "Risk assessment submission failed:",
                error
            );

            if (error.response) {

                console.error(
                    "API status:",
                    error.response.status
                );

                console.error(
                    "API response:",
                    error.response.data
                );

            }

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to submit the risk assessment."
            );

        } finally {

            setIsSubmitting(false);

        }

    };

    return (

        <div className='ra-root'>

            <div className='ra-panel'>

                <Header>
                    <h1>Risk Assessment Questionnaire</h1>
                </Header>

                <div className="ra-panel-head">

                    <p className="ra-eyebrow">
                        Compliance
                    </p>

                    <h1>
                        Risk Assessment Questionnaire
                    </h1>

                    <p className="ra-sub">
                        Tell us about your business so we can
                        complete your merchant risk profile.
                    </p>

                </div>

                <div className='ra-panel-body'>

                    <div className="autosave-bar">

                        <span>
                            Your progress is saved automatically
                            on this device.
                        </span>

                        {draftRestored && (
                            <span className="autosave-restored">
                                Draft restored from your last session.
                            </span>
                        )}

                        <button
                            type='button'
                            className="autosave-clear"
                            onClick={clearSavedProgress}
                        >
                            Clear form
                        </button>

                    </div>

                    <form
                        onSubmit={handleRiskAssessmentSubmit}
                        className='ra-form'
                    >

                        <div className="ra-field">

                            <label>
                                Business Name <span>*</span>
                            </label>

                            <input
                                type='text'
                                name='business_name'
                                maxLength={200}
                                placeholder="Enter business name"
                                value={simpleFields.business_name}
                                onChange={handleFieldChange}
                                required
                            />

                        </div>

                        <div className="ra-field">

                            <label>
                                Business Address <span>*</span>
                            </label>

                            <input
                                type='text'
                                name='business_address'
                                maxLength={300}
                                placeholder="Enter business address"
                                value={simpleFields.business_address}
                                onChange={handleFieldChange}
                                required
                            />

                        </div>

                        <div className="ra-row">

                            <div className="ra-field">

                                <label>
                                    Business Contact Number <span>*</span>
                                </label>

                                <input
                                    type='tel'
                                    name='business_contact_number'
                                    maxLength={20}
                                    pattern="[-0-9+()\s]{7,20}"
                                    placeholder="Enter business contact number"
                                    value={simpleFields.business_contact_number}
                                    onChange={handleFieldChange}
                                    required
                                />

                            </div>

                            <div className="ra-field">

                                <label>
                                    Contact Person <span>*</span>
                                </label>

                                <input
                                    type='text'
                                    name='contact_person'
                                    maxLength={150}
                                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+"
                                    placeholder="Enter contact person"
                                    value={simpleFields.contact_person}
                                    onChange={handleFieldChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="ra-field">

                            <label>
                                Contact Number <span>*</span>
                            </label>

                            <input
                                type='tel'
                                name='contact_number'
                                maxLength={20}
                                pattern="[-0-9+()\s]{7,20}"
                                placeholder="Enter contact number"
                                value={simpleFields.contact_number}
                                onChange={handleFieldChange}
                                required
                            />

                        </div>

                        <div className="ra-field">

                            <label>
                                Nature of Business/Economic Activity <span>*</span>
                            </label>

                            <div className="checkbox-grid">

                                {BUSINESS_NATURE_OPTIONS.map((option) => (

                                    <label
                                        key={option}
                                        className="checkbox-option"
                                    >

                                        <input
                                            type="checkbox"
                                            checked={natureOfBusiness.includes(option)}
                                            onChange={() => toggleNature(option)}
                                        />

                                        {option}

                                    </label>

                                ))}

                            </div>

                            <input
                                type='text'
                                placeholder="Others, please specify"
                                value={otherNature}
                                onChange={(e) =>
                                    setOtherNature(e.target.value)
                                }
                            />

                        </div>

                        <div className="ra-field">

                            <label>
                                Source of Fund/Wealth <span>*</span>
                            </label>

                            <div className="checkbox-grid">

                                {SOURCE_OF_FUND_OPTIONS.map((option) => (

                                    <label
                                        key={option}
                                        className="checkbox-option"
                                    >

                                        <input
                                            type="checkbox"
                                            checked={sourceOfFund.includes(option)}
                                            onChange={() => toggleSource(option)}
                                        />

                                        {option}

                                    </label>

                                ))}

                            </div>

                            <input
                                type='text'
                                placeholder="Others, please specify"
                                value={otherSource}
                                onChange={(e) =>
                                    setOtherSource(e.target.value)
                                }
                            />

                        </div>

                        <div className="ra-field">

                            <label>
                                Monthly Gross Income <span>*</span>
                            </label>

                            <div className="radio-group">

                                {MONTHLY_INCOME_OPTIONS.map((option) => (

                                    <label
                                        key={option}
                                        className="radio-option"
                                    >

                                        <input
                                            type="radio"
                                            name="monthly_gross_income"
                                            value={option}
                                            checked={
                                                simpleFields.monthly_gross_income === option
                                            }
                                            onChange={handleFieldChange}
                                            required
                                        />

                                        {option}

                                    </label>

                                ))}

                            </div>

                        </div>

                        <div className="ra-field">

                            <label>
                                Annual Gross Income <span>*</span>
                            </label>

                            <div className="radio-group">

                                {ANNUAL_INCOME_OPTIONS.map((option) => (

                                    <label
                                        key={option}
                                        className="radio-option"
                                    >

                                        <input
                                            type="radio"
                                            name="annual_gross_income"
                                            value={option}
                                            checked={
                                                simpleFields.annual_gross_income === option
                                            }
                                            onChange={handleFieldChange}
                                            required
                                        />

                                        {option}

                                    </label>

                                ))}

                            </div>

                        </div>

                        <div className="ra-row">

                            <div className="ra-field">

                                <label>
                                    Number of Transactions per Day <span>*</span>
                                </label>

                                <input
                                    type='number'
                                    name='transactions_per_day'
                                    inputMode="numeric"
                                    placeholder="Enter number of transactions"
                                    value={simpleFields.transactions_per_day}
                                    onChange={handleFieldChange}
                                    required
                                    min="0"
                                />

                            </div>

                            <div className="ra-field">

                                <label>
                                    Number of Transactions per Month <span>*</span>
                                </label>

                                <input
                                    type='number'
                                    name='transactions_per_month'
                                    inputMode="numeric"
                                    placeholder="Enter number of transactions"
                                    value={simpleFields.transactions_per_month}
                                    onChange={handleFieldChange}
                                    required
                                    min="0"
                                />

                            </div>

                        </div>

                        <div className="ra-row">

                            <div className="ra-field">

                                <label>
                                    Total Amount of Daily Transaction <span>*</span>
                                </label>

                                <input
                                    type='number'
                                    name='daily_transaction_amount'
                                    placeholder="Enter total amount"
                                    value={simpleFields.daily_transaction_amount}
                                    onChange={handleFieldChange}
                                    required
                                    min="0"
                                    step="0.01"
                                />

                            </div>

                            <div className="ra-field">

                                <label>
                                    Total Amount of Monthly Transaction <span>*</span>
                                </label>

                                <input
                                    type='number'
                                    name='monthly_transaction_amount'
                                    placeholder="Enter total amount"
                                    value={simpleFields.monthly_transaction_amount}
                                    onChange={handleFieldChange}
                                    required
                                    min="0"
                                    step="0.01"
                                />

                            </div>

                        </div>

                        <div className="ra-field">

                            <label>
                                Countries Where You Provide Services/Transactions
                            </label>

                            <div className="country-grid">

                                {countries.map((country, index) => (

                                    <input
                                        key={index}
                                        type='text'
                                        placeholder={`Country ${index + 1}`}
                                        value={country}
                                        onChange={(e) =>
                                            handleCountryChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />

                                ))}

                            </div>

                        </div>

                        <div className="ra-field">

                            <label>
                                Is your company connected/related to any
                                Politically Exposed Person? <span>*</span>
                            </label>

                            <div className="radio-group inline">

                                <label className="radio-option">

                                    <input
                                        type="radio"
                                        name="is_pep"
                                        value="no"
                                        checked={isPep === "no"}
                                        onChange={() => setIsPep("no")}
                                        required
                                    />

                                    No

                                </label>

                                <label className="radio-option">

                                    <input
                                        type="radio"
                                        name="is_pep"
                                        value="yes"
                                        checked={isPep === "yes"}
                                        onChange={() => setIsPep("yes")}
                                    />

                                    Yes

                                </label>

                            </div>

                            {isPep === "yes" && (

                                <div className="ra-row">

                                    <div className="ra-field">

                                        <label>Name</label>

                                        <input
                                            type='text'
                                            value={pepName}
                                            onChange={(e) =>
                                                setPepName(
                                                    e.target.value.replace(
                                                        /[^A-Za-zÀ-ÖØ-öø-ÿ\s'\-]/g,
                                                        ""
                                                    )
                                                )
                                            }
                                            placeholder="Enter name"
                                        />

                                    </div>

                                    <div className="ra-field">

                                        <label>Position</label>

                                        <input
                                            type='text'
                                            value={pepPosition}
                                            onChange={(e) =>
                                                setPepPosition(
                                                    e.target.value.replace(
                                                        /[^A-Za-z0-9À-ÖØ-öø-ÿ\s.,'\-]/g,
                                                        ""
                                                    )
                                                )
                                            }
                                            placeholder="Enter position"
                                        />

                                    </div>

                                </div>

                            )}

                        </div>

                        <div className="ra-field">

                            <label>
                                Is your company regulated by Bangko Sentral
                                ng Pilipinas (BSP)? <span>*</span>
                            </label>

                            <div className="radio-group inline">

                                <label className="radio-option">

                                    <input
                                        type="radio"
                                        name="is_bsp_regulated"
                                        value="no"
                                        checked={isBspRegulated === "no"}
                                        onChange={() => setIsBspRegulated("no")}
                                        required
                                    />

                                    No

                                </label>

                                <label className="radio-option">

                                    <input
                                        type="radio"
                                        name="is_bsp_regulated"
                                        value="yes"
                                        checked={isBspRegulated === "yes"}
                                        onChange={() => setIsBspRegulated("yes")}
                                    />

                                    Yes

                                </label>

                            </div>

                            {isBspRegulated === "yes" && (

                                <div className="license-table">

                                    {licenses.map((license, index) => (

                                        <div
                                            className="ra-row"
                                            key={index}
                                        >

                                            <div className="ra-field">

                                                <label>
                                                    Type of License {index + 1}
                                                </label>

                                                <input
                                                    type='text'
                                                    value={license.type}
                                                    onChange={(e) =>
                                                        handleLicenseChange(
                                                            index,
                                                            "type",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Type of license"
                                                />

                                            </div>

                                            <div className="ra-field">

                                                <label>
                                                    License No. {index + 1}
                                                </label>

                                                <input
                                                    type='text'
                                                    value={license.number}
                                                    onChange={(e) =>
                                                        handleLicenseChange(
                                                            index,
                                                            "number",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="License number"
                                                />

                                            </div>

                                            <div className="ra-field">

                                                <label>
                                                    Issued Year {index + 1}
                                                </label>

                                                <input
                                                    type='number'
                                                    value={license.year}
                                                    onChange={(e) =>
                                                        handleLicenseChange(
                                                            index,
                                                            "year",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Issued year"
                                                    min="1900"
                                                    max="2100"
                                                />

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                        {isBspRegulated === "yes" && (

                            <div className="ra-field">

                                <label>
                                    If you are regulated by BSP, are you
                                    registered with Anti-Money Laundering
                                    Council? <span>*</span>
                                </label>

                                <div className="radio-group inline">

                                    <label className="radio-option">

                                        <input
                                            type="radio"
                                            name="is_amlc_registered"
                                            value="no"
                                            checked={isAmlcRegistered === "no"}
                                            onChange={() =>
                                                setIsAmlcRegistered("no")
                                            }
                                            required
                                        />

                                        No

                                    </label>

                                    <label className="radio-option">

                                        <input
                                            type="radio"
                                            name="is_amlc_registered"
                                            value="yes"
                                            checked={isAmlcRegistered === "yes"}
                                            onChange={() =>
                                                setIsAmlcRegistered("yes")
                                            }
                                        />

                                        Yes

                                    </label>

                                </div>

                                {isAmlcRegistered === "yes" && (

                                    <div className="ra-row">

                                        <div className="ra-field">

                                            <label>
                                                AMLC Certificate of Registration
                                                Issued Year
                                            </label>

                                            <input
                                                type='number'
                                                value={amlcYear}
                                                onChange={(e) =>
                                                    setAmlcYear(
                                                        e.target.value
                                                            .replace(/\D/g, "")
                                                            .slice(0, 4)
                                                    )
                                                }
                                                placeholder="Enter year"
                                                min="1900"
                                                max="2100"
                                            />

                                        </div>

                                        <div className="ra-field">

                                            <label>
                                                Do you conduct Know-Your-Customer?
                                            </label>

                                            <input
                                                type='text'
                                                value={conductsKyc}
                                                onChange={(e) =>
                                                    setConductsKyc(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter details"
                                            />

                                        </div>

                                    </div>

                                )}

                            </div>

                        )}

                        <div className="form-field certification">

                            <label>
                                Certification
                            </label>

                            <p>
                                I certify that the responses provided in this
                                Risk Assessment Questionnaire are true and correct.
                            </p>

                        </div>

                        <div className="ra-row">

                            <div className="ra-field">

                                <label>
                                    Name <span>*</span>
                                </label>

                                <input
                                    type='text'
                                    name='certified_name'
                                    maxLength={150}
                                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+"
                                    placeholder="Enter name"
                                    value={simpleFields.certified_name}
                                    onChange={handleFieldChange}
                                    required
                                />

                            </div>

                            <div className="ra-field">

                                <label>
                                    Designation <span>*</span>
                                </label>

                                <input
                                    type='text'
                                    name='certified_designation'
                                    maxLength={100}
                                    placeholder="Enter designation"
                                    value={simpleFields.certified_designation}
                                    onChange={handleFieldChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="ra-field">

                            <label>
                                Date <span>*</span>
                            </label>

                            <input
                                type='date'
                                name='certified_date'
                                value={simpleFields.certified_date}
                                onChange={handleFieldChange}
                                required
                            />

                        </div>

                        <div className="ra-actions">

                            <button
                                type="submit"
                                className="ra-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Submit"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}