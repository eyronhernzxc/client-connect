import { useEffect, useState } from "react";
import "./servicetab.css";
import { postService } from "../../../api/postService";

const STEPS = ["Select Service", "Enter Details", "Review", "Confirm"];

const SERVICES = [
  {
    id: "collection",
    title: "Collection Service",
    desc: "Manage and collect payments efficiently and securely.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "system",
    title: "System Development",
    desc: "Custom-built tools and integrations for your business.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "other",
    title: "Other",
    desc: "Something else not covered above.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
        <title xmlns="">other</title>
        <g fill="none" stroke="currentColor" strokeWidth="4">
          <path strokeLinejoin="round" d="M22.799 4.201L4.414 22.586a2 2 0 0 0 0 2.828L22.8 43.8a2 2 0 0 0 2.828 0l18.385-18.385a2 2 0 0 0 0-2.828L25.627 4.2a2 2 0 0 0-2.828 0Z" />
          <path strokeLinecap="round" d="M18 24h12m-6-6v12" />
        </g>
      </svg>
    ),
  },
];

const RADIO_LABELS = {
  systemType: { frontend: "Frontend", backend: "Backend", fullstack: "Full Stack" },
  collectionType: { otc: "Over the counter (Bank / Non Bank)", online: "Online Banking", emoney: "e-Money" },
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

  // Populated from FormData once the user leaves the "Enter Details" step
  // (see goNext) — same idea as reading formData.get(...) in
  // MerchantRegister.handleMerchantRegister. The inputs on step 2 are
  // uncontrolled; this is just what Review/Confirm read from.
  const [details, setDetails] = useState({
    systemType: "",
    collectionType: "",
    otherDetails: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Generated once when the component first mounts, so it stays the same
  // across re-renders and across steps.
  const [applicationNumber] = useState(generateApplicationNumber);

  useEffect(() => {
    document.title = "Pisopay | Service Request";
  }, []);

  // TODO: adjust to match how your app actually stores the logged-in
  // user/company — this assumes a shape like { id, company_id } under
  // the "user" key, matching your CompanyRegistration.jsx pattern.
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userId = storedUser.id ?? null;
  const companyId = storedUser.company_id ?? null;

  const selectedServices = SERVICES.filter((s) => serviceIds.includes(s.id));
  const hasSystem = serviceIds.includes("system");
  const hasCollection = serviceIds.includes("collection");
  const hasOther = serviceIds.includes("other");

  const toggleService = (id) =>
    setServiceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const canContinue = step === 0 ? serviceIds.length > 0 : true;
  const back = () => setStep((s) => Math.max(s - 1, 0));

  // "Continue" from step 1 (Select Service) just advances — the fields on
  // step 2 depend on what was picked, so they only render once we're
  // actually on step 2 (that's the "pops up only when I proceed" part).
  // "Continue" from step 2 (Enter Details) reads whatever fields are
  // currently on the page via FormData — same pattern as
  // MerchantRegister — and stores them in `details` before advancing.
  const goNext = (event) => {
    if (step === 1) {
      const formData = new FormData(event.currentTarget.form);
      setDetails({
        systemType: formData.get("systemType") || "",
        collectionType: formData.get("collectionType") || "",
        otherDetails: formData.get("otherDetails") || "",
      });
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  // Fires only when the "Confirm" button on the Review step is clicked.
  const handleConfirm = async () => {
    const data = {
      company_id: companyId,
      user_id: userId,
      application_number: applicationNumber,
      name: `${selectedServices.map((s) => s.title).join(" & ")} Application`,
      status: "pending",
    };

    setSubmitting(true);
    setSubmitError("");

    try {
      const result = await postService(data);
      setStep((s) => Math.min(s + 1, STEPS.length - 1)); // move to the Confirm step
    } catch (error) {
      console.error(error);
      setSubmitError(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ssr-root">
      {/* onSubmit is a no-op safety net — every button below is wired
          directly via onClick, so this should never actually run. */}
      <form className="ssr-panel" onSubmit={(e) => e.preventDefault()}>
        <div className="ssr-stepper">
          {STEPS.map((label, i) => (
            <div key={label} className={`ssr-step ${i === step ? "current" : i < step ? "done" : ""}`}>
              <div className="ssr-dot">{i + 1}</div>
              <span className="ssr-label">{label}</span>
              {i < STEPS.length - 1 && <div className="ssr-connector" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Service (multi-select) */}
        {step === 0 && (
          <>
            <div className="ssr-panel-head">
              <p className="ssr-eyebrow">Step 1 of 4</p>
              <h1>Select services</h1>
              <p className="ssr-sub">Choose one or more services you'd like to request.</p>
            </div>
            <div className="ssr-panel-body">
              <div className="ssr-card-grid">
                {SERVICES.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`ssr-svc-card ${serviceIds.includes(s.id) ? "selected" : ""}`}
                  >
                    <div className="ssr-svc-icon">{s.icon}</div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Step 2: Enter Details — only the fields relevant to what was
            selected in Step 1, and only shown once the user has actually
            proceeded to this step. Inputs are uncontrolled (defaultChecked
            / defaultValue seeded from `details`); goNext reads them via
            FormData when the user clicks Continue. */}
        {step === 1 && (
          <>
            <div className="ssr-panel-head">
              <p className="ssr-eyebrow">Step 2 of 4</p>
              <h1>Enter details</h1>
              <p className="ssr-sub">Tell us a bit more about the request.</p>
            </div>
            <div className="ssr-panel-body">
              <div className="ssr-form">
                {hasSystem && (
                  <div className="ssr-field">
                    <span>System Development — type</span>
                    <div className="ssr-radio-group">
                      {[
                        { value: "frontend", label: "A. Frontend" },
                        { value: "backend", label: "B. Backend" },
                        { value: "fullstack", label: "C. Full Stack" },
                      ].map((opt) => (
                        <label key={opt.value} className="ssr-radio">
                          <input
                            type="radio"
                            name="systemType"
                            value={opt.value}
                            defaultChecked={details.systemType === opt.value}
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {hasCollection && (
                  <div className="ssr-field">
                    <span>Collection Service — type</span>
                    <div className="ssr-radio-group">
                      {[
                        { value: "otc", label: "A. Over the counter (Bank / Non Bank)" },
                        { value: "online", label: "B. Online Banking" },
                        { value: "emoney", label: "C. e-Money" },
                      ].map((opt) => (
                        <label key={opt.value} className="ssr-radio">
                          <input
                            type="radio"
                            name="collectionType"
                            value={opt.value}
                            defaultChecked={details.collectionType === opt.value}
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {hasOther && (
                  <label className="ssr-field">
                    <span>Please specify</span>
                    <input
                      name="otherDetails"
                      defaultValue={details.otherDetails}
                      placeholder="What service do you need?"
                    />
                  </label>
                )}
              </div>
            </div>
          </>
        )}

        {/* Step 3: Review */}
        {step === 2 && (
          <>
            <div className="ssr-panel-head">
              <p className="ssr-eyebrow">Step 3 of 4</p>
              <h1>Review your request</h1>
              <p className="ssr-sub">Make sure everything looks right before confirming.</p>
            </div>
            <div className="ssr-panel-body">
              <div className="ssr-review">
                <div className="ssr-review-row"><span>Application No.</span><strong>{applicationNumber}</strong></div>
                <div className="ssr-review-row">
                  <span>Services</span>
                  <strong>{selectedServices.map((s) => s.title).join(", ") || "—"}</strong>
                </div>

                {hasSystem && (
                  <div className="ssr-review-row">
                    <span>System Development type</span>
                    <strong>{RADIO_LABELS.systemType[details.systemType] || "—"}</strong>
                  </div>
                )}

                {hasCollection && (
                  <div className="ssr-review-row">
                    <span>Collection Service type</span>
                    <strong>{RADIO_LABELS.collectionType[details.collectionType] || "—"}</strong>
                  </div>
                )}

                {hasOther && (
                  <div className="ssr-review-row"><span>Other — details</span><strong>{details.otherDetails || "—"}</strong></div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Step 4: Confirm */}
        {step === 3 && (
          <>
            <div className="ssr-panel-head">
              <p className="ssr-eyebrow">Step 4 of 4</p>
              <h1>Request submitted</h1>
              <p className="ssr-sub">We've received your request and will be in touch shortly.</p>
            </div>
            <div className="ssr-panel-body">
              <div className="ssr-confirm">
                <div className="ssr-confirm-icon">✓</div>
                <p>You can safely close this window.</p>
              </div>
            </div>
          </>
        )}

        {step === 2 && submitError && (
          <p className="ssr-error">{submitError}</p>
        )}

        {step < 3 && (
          <div className="ssr-actions ssr-actions-footer">
            <button type="button" className="ssr-btn" onClick={back} disabled={step === 0}>
              Back
            </button>

            {step < 2 ? (
              <button type="button" className="ssr-btn primary" onClick={goNext} disabled={!canContinue}>
                Continue
              </button>
            ) : (
              <button type="button" className="ssr-btn primary" onClick={handleConfirm} disabled={submitting}>
                {submitting ? "Submitting…" : "Confirm"}
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default ServiceTab;