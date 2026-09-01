import { useEffect, useState } from "react";
import "./servicetab.css";

import { postService } from "../../../api/postService.js";
import { getCurrentUser } from "../../../api/auth.js";

const STEPS = [
  "Select Service",
  "Enter Details",
  "Review",
  "Confirm",
];

const SERVICES = [
  {
    id: "collection",
    title: "Collection Service",
    desc: "Manage and collect payments efficiently and securely.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M3 10h18"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },

  {
    id: "system",
    title: "System Development",
    desc: "Custom-built tools and integrations for your business.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M8 20h8M12 16v4"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },

  {
    id: "other",
    title: "Other",
    desc: "Something else not covered above.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 48 48"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        >
          <path
            strokeLinejoin="round"
            d="M22.799 4.201L4.414 22.586a2 2 0 0 0 0 2.828L22.8 43.8a2 2 0 0 0 2.828 0l18.385-18.385a2 2 0 0 0 0-2.828L25.627 4.2a2 2 0 0 0-2.828 0Z"
          />

          <path
            strokeLinecap="round"
            d="M18 24h12m-6-6v12"
          />
        </g>
      </svg>
    ),
  },
];

const RADIO_LABELS = {
  systemType: {
    frontend: "Frontend",
    backend: "Backend",
    fullstack: "Full Stack",
  },

  collectionType: {
    otc: "Over the counter (Bank / Non Bank)",
    online: "Online Banking",
    emoney: "e-Money",
  },
};

function generateApplicationNumber() {
  const year = new Date().getFullYear();

  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");

  return `APP-${year}-${random}`;
}

function ServiceTab() {
  const [step, setStep] = useState(0);

  const [serviceIds, setServiceIds] = useState([]);

  const [details, setDetails] = useState({
    systemType: "",
    collectionType: "",
    otherDetails: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const [applicationNumber] = useState(
    generateApplicationNumber
  );

  useEffect(() => {
    document.title = "Pisopay | Service Request";
  }, []);

  /*
   * Selected services
   */
  const selectedServices = SERVICES.filter((service) =>
    serviceIds.includes(service.id)
  );

  const hasSystem = serviceIds.includes("system");

  const hasCollection = serviceIds.includes("collection");

  const hasOther = serviceIds.includes("other");

  /*
   * Select / deselect service
   */
  const toggleService = (id) => {
    setServiceIds((previous) =>
      previous.includes(id)
        ? previous.filter((serviceId) => serviceId !== id)
        : [...previous, id]
    );
  };

  /*
   * Determine whether the user can continue
   */
  const canContinue =
    step === 0 ? serviceIds.length > 0 : true;

  /*
   * Go back one step
   */
  const back = () => {
    setStep((currentStep) =>
      Math.max(currentStep - 1, 0)
    );
  };

  /*
   * Continue to the next step
   *
   * When leaving Step 2, collect the entered form values.
   */
  const goNext = (event) => {
    if (step === 1) {
      const formData = new FormData(
        event.currentTarget.form
      );

      setDetails({
        systemType:
          formData.get("systemType") || "",

        collectionType:
          formData.get("collectionType") || "",

        otherDetails:
          formData.get("otherDetails") || "",
      });
    }

    setStep((currentStep) =>
      Math.min(
        currentStep + 1,
        STEPS.length - 1
      )
    );
  };

  /*
   * Confirm and submit the service application
   */

const handleConfirm = async () => {
  setSubmitting(true);
  setSubmitError("");

  try {
    /*
     * Get the currently authenticated user.
     *
     * /auth/me uses GET and the access token
     * is automatically attached by api.js.
     */
    const user = await getCurrentUser();

    console.log("Authenticated user:", user);

    /*
     * Make sure we have the authenticated user's ID
     */
    if (!user?.id) {
      throw new Error(
        "Unable to determine the authenticated user."
      );
    }

    /*
     * Get the company ID.
     *
     * Supports both possible backend responses:
     *
     * {
     *   company_id: 1
     * }
     *
     * OR:
     *
     * {
     *   company: {
     *     id: 1
     *   }
     * }
     */
    const companyId =
      user.company_id ||
      user.company?.id;

    console.log(
      "Authenticated user ID:",
      user.id
    );

    console.log(
      "Authenticated company ID:",
      companyId
    );

    /*
     * Make sure the authenticated user has a company
     */
    if (!companyId) {
      throw new Error(
        "Unable to determine the user's company."
      );
    }

    /*
     * Data accepted by:
     *
     * POST /api/application-services
     */
    const applicationData = {
      company_id: companyId,
      user_id: user.id,
      application_number: applicationNumber,

      name: `${selectedServices
        .map((service) => service.title)
        .join(" & ")} Application`,

      status: "pending",
    };

    console.log(
      "Submitting application:",
      applicationData
    );

    /*
     * Send application to backend
     */
    const response = await postService(
      applicationData
    );

    console.log(
      "Application submitted successfully:",
      response
    );

    /*
     * Only move to confirmation after
     * successful backend submission.
     */
    setStep((currentStep) =>
      Math.min(
        currentStep + 1,
        STEPS.length - 1
      )
    );
  } catch (error) {
    console.error(
      "Application submission failed:",
      error
    );

    setSubmitError(
      error.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="ssr-root">

      <form
        className="ssr-panel"
        onSubmit={(event) =>
          event.preventDefault()
        }
      >

        {/* =========================
            STEPPER
        ========================== */}

        <div className="ssr-stepper">

          {STEPS.map((label, index) => (
            <div
              key={label}
              className={`ssr-step ${
                index === step
                  ? "current"
                  : index < step
                  ? "done"
                  : ""
              }`}
            >

              <div className="ssr-dot">
                {index + 1}
              </div>

              <span className="ssr-label">
                {label}
              </span>

              {index < STEPS.length - 1 && (
                <div className="ssr-connector" />
              )}

            </div>
          ))}

        </div>

        {/* =========================
            STEP 1
        ========================== */}

        {step === 0 && (
          <>
            <div className="ssr-panel-head">

              <p className="ssr-eyebrow">
                Step 1 of 4
              </p>

              <h1>
                Select services
              </h1>

              <p className="ssr-sub">
                Choose one or more services you'd
                like to request.
              </p>

            </div>

            <div className="ssr-panel-body">

              <div className="ssr-card-grid">

                {SERVICES.map((service) => (
                  <div
                    key={service.id}
                    onClick={() =>
                      toggleService(service.id)
                    }
                    className={`ssr-svc-card ${
                      serviceIds.includes(
                        service.id
                      )
                        ? "selected"
                        : ""
                    }`}
                  >

                    <div className="ssr-svc-icon">
                      {service.icon}
                    </div>

                    <h3>
                      {service.title}
                    </h3>

                    <p>
                      {service.desc}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          </>
        )}

        {/* =========================
            STEP 2
        ========================== */}

        {step === 1 && (
          <>
            <div className="ssr-panel-head">

              <p className="ssr-eyebrow">
                Step 2 of 4
              </p>

              <h1>
                Enter details
              </h1>

              <p className="ssr-sub">
                Tell us a bit more about the request.
              </p>

            </div>

            <div className="ssr-panel-body">

              <div className="ssr-form">

                {/* SYSTEM DEVELOPMENT */}

                {hasSystem && (
                  <div className="ssr-field">

                    <span>
                      System Development — type
                    </span>

                    <div className="ssr-radio-group">

                      {[
                        {
                          value: "frontend",
                          label: "A. Frontend",
                        },
                        {
                          value: "backend",
                          label: "B. Backend",
                        },
                        {
                          value: "fullstack",
                          label: "C. Full Stack",
                        },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="ssr-radio"
                        >

                          <input
                            type="radio"
                            name="systemType"
                            value={option.value}
                            defaultChecked={
                              details.systemType ===
                              option.value
                            }
                          />

                          <span>
                            {option.label}
                          </span>

                        </label>
                      ))}

                    </div>

                  </div>
                )}

                {/* COLLECTION SERVICE */}

                {hasCollection && (
                  <div className="ssr-field">

                    <span>
                      Collection Service — type
                    </span>

                    <div className="ssr-radio-group">

                      {[
                        {
                          value: "otc",
                          label:
                            "A. Over the counter (Bank / Non Bank)",
                        },
                        {
                          value: "online",
                          label:
                            "B. Online Banking",
                        },
                        {
                          value: "emoney",
                          label:
                            "C. e-Money",
                        },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="ssr-radio"
                        >

                          <input
                            type="radio"
                            name="collectionType"
                            value={option.value}
                            defaultChecked={
                              details.collectionType ===
                              option.value
                            }
                          />

                          <span>
                            {option.label}
                          </span>

                        </label>
                      ))}

                    </div>

                  </div>
                )}

                {/* OTHER */}

                {hasOther && (
                  <label className="ssr-field">

                    <span>
                      Please specify
                    </span>

                    <input
                      name="otherDetails"
                      defaultValue={
                        details.otherDetails
                      }
                      placeholder="What service do you need?"
                    />

                  </label>
                )}

              </div>

            </div>
          </>
        )}

        {/* =========================
            STEP 3
        ========================== */}

        {step === 2 && (
          <>
            <div className="ssr-panel-head">

              <p className="ssr-eyebrow">
                Step 3 of 4
              </p>

              <h1>
                Review your request
              </h1>

              <p className="ssr-sub">
                Make sure everything looks right
                before confirming.
              </p>

            </div>

            <div className="ssr-panel-body">

              <div className="ssr-review">

                <div className="ssr-review-row">

                  <span>
                    Application No.
                  </span>

                  <strong>
                    {applicationNumber}
                  </strong>

                </div>

                <div className="ssr-review-row">

                  <span>
                    Services
                  </span>

                  <strong>
                    {selectedServices
                      .map(
                        (service) =>
                          service.title
                      )
                      .join(", ") || "—"}
                  </strong>

                </div>

                {hasSystem && (
                  <div className="ssr-review-row">

                    <span>
                      System Development type
                    </span>

                    <strong>
                      {RADIO_LABELS.systemType[
                        details.systemType
                      ] || "—"}
                    </strong>

                  </div>
                )}

                {hasCollection && (
                  <div className="ssr-review-row">

                    <span>
                      Collection Service type
                    </span>

                    <strong>
                      {RADIO_LABELS.collectionType[
                        details.collectionType
                      ] || "—"}
                    </strong>

                  </div>
                )}

                {hasOther && (
                  <div className="ssr-review-row">

                    <span>
                      Other — details
                    </span>

                    <strong>
                      {details.otherDetails ||
                        "—"}
                    </strong>

                  </div>
                )}

              </div>

            </div>
          </>
        )}

        {/* =========================
            STEP 4
        ========================== */}

        {step === 3 && (
          <>
            <div className="ssr-panel-head">

              <p className="ssr-eyebrow">
                Step 4 of 4
              </p>

              <h1>
                Request submitted
              </h1>

              <p className="ssr-sub">
                Your request is pending approval
                and onboarding by an admin.
              </p>

            </div>

            <div className="ssr-panel-body">

              <div className="ssr-confirm">

                <div className="ssr-confirm-icon">
                  ✓
                </div>

                <p>
                  You can safely close this window.
                </p>

              </div>

              <div className="ssr-review">

                <div className="ssr-review-row">
                  <span>
                    Approved by
                  </span>

                  <strong className="ssr-placeholder">
                    Pending
                  </strong>
                </div>

                <div className="ssr-review-row">
                  <span>
                    Designation
                  </span>

                  <strong className="ssr-placeholder">
                    Pending
                  </strong>
                </div>

                <div className="ssr-review-row">
                  <span>
                    Date
                  </span>

                  <strong className="ssr-placeholder">
                    Pending
                  </strong>
                </div>

                <div className="ssr-review-row">
                  <span>
                    Onboarded by
                  </span>

                  <strong className="ssr-placeholder">
                    Pending
                  </strong>
                </div>

                <div className="ssr-review-row">
                  <span>
                    Designation
                  </span>

                  <strong className="ssr-placeholder">
                    Pending
                  </strong>
                </div>

                <div className="ssr-review-row">
                  <span>
                    Date
                  </span>

                  <strong className="ssr-placeholder">
                    Pending
                  </strong>
                </div>

              </div>

            </div>
          </>
        )}

        {/* =========================
            ERROR
        ========================== */}

        {step === 2 && submitError && (
          <p className="ssr-error">
            {submitError}
          </p>
        )}

        {/* =========================
            BUTTONS
        ========================== */}

        {step < 3 && (
          <div className="ssr-actions ssr-actions-footer">

            <button
              type="button"
              className="ssr-btn"
              onClick={back}
              disabled={step === 0}
            >
              Back
            </button>

            {step < 2 ? (
              <button
                type="button"
                className="ssr-btn primary"
                onClick={goNext}
                disabled={!canContinue}
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="ssr-btn primary"
                onClick={handleConfirm}
                disabled={submitting}
              >
                {submitting
                  ? "Submitting…"
                  : "Confirm"}
              </button>
            )}

          </div>
        )}

      </form>
    </div>
  );
}

export default ServiceTab;

