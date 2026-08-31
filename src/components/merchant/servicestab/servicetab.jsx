import { useState } from "react";
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

function Stepper({ current }) {
  return (
    <div className="ssr-stepper">
      {STEPS.map((label, i) => (
        <div key={label} className={`ssr-step ${i === current ? "current" : i < current ? "done" : ""}`}>
          <div className="ssr-dot">{i + 1}</div>
          <span className="ssr-label">{label}</span>
          {i < STEPS.length - 1 && <div className="ssr-connector" />}
        </div>
      ))}
    </div>
  );
}

function RadioGroup({ name, value, onChange, options }) {
  return (
    <div className="ssr-radio-group">
      {options.map((opt) => (
        <label key={opt.value} className="ssr-radio">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

/* Step 1: Select Service (multi-select) */
function StepSelectService({ serviceIds, toggleService }) {
  return (
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
              {s.tag && <span className="ssr-tag">{s.tag}</span>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* Step 2: Enter Details — only the fields relevant to what was selected in Step 1. */
function StepEnterDetails({ form, setForm, serviceIds }) {
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const hasSystem = serviceIds.includes("system");
  const hasCollection = serviceIds.includes("collection");
  const hasOther = serviceIds.includes("other");

  return (
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
              <RadioGroup
                name="systemType"
                value={form.systemType}
                onChange={update("systemType")}
                options={[
                  { value: "frontend", label: "A. Frontend" },
                  { value: "backend", label: "B. Backend" },
                  { value: "fullstack", label: "C. Full Stack" },
                ]}
              />
            </div>
          )}

          {hasCollection && (
            <div className="ssr-field">
              <span>Collection Service — type</span>
              <RadioGroup
                name="collectionType"
                value={form.collectionType}
                onChange={update("collectionType")}
                options={[
                  { value: "otc", label: "A. Over the counter (Bank / Non Bank)" },
                  { value: "online", label: "B. Online Banking" },
                  { value: "emoney", label: "C. e-Money" },
                ]}
              />
            </div>
          )}

          {hasOther && (
            <label className="ssr-field">
              <span>Please specify</span>
              <input
                name="otherDetails"
                value={form.otherDetails}
                onChange={update("otherDetails")}
                placeholder="What service do you need?"
              />
            </label>
          )}
        </div>
      </div>
    </>
  );
}

/* Step 3: Review */
const RADIO_LABELS = {
  systemType: { frontend: "Frontend", backend: "Backend", fullstack: "Full Stack" },
  collectionType: { otc: "Over the counter (Bank / Non Bank)", online: "Online Banking", emoney: "e-Money" },
};

function StepReview({ services, form }) {
  const names = services.map((s) => s.title).join(", ") || "—";
  const serviceIds = services.map((s) => s.id);

  return (
    <>
      <div className="ssr-panel-head">
        <p className="ssr-eyebrow">Step 3 of 4</p>
        <h1>Review your request</h1>
        <p className="ssr-sub">Make sure everything looks right before confirming.</p>
      </div>
      <div className="ssr-panel-body">
        <div className="ssr-review">
          <div className="ssr-review-row"><span>Services</span><strong>{names}</strong></div>

          {serviceIds.includes("system") && (
            <div className="ssr-review-row">
              <span>System Development type</span>
              <strong>{RADIO_LABELS.systemType[form.systemType] || "—"}</strong>
            </div>
          )}

          {serviceIds.includes("collection") && (
            <div className="ssr-review-row">
              <span>Collection Service type</span>
              <strong>{RADIO_LABELS.collectionType[form.collectionType] || "—"}</strong>
            </div>
          )}

          {serviceIds.includes("other") && (
            <div className="ssr-review-row"><span>Other — details</span><strong>{form.otherDetails || "—"}</strong></div>
          )}
        </div>
      </div>
    </>
  );
}

/* Step 4: Confirm */
function StepConfirm() {
  return (
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
  );
}

export default function SelectServiceRedesign() {
  const [step, setStep] = useState(0);
  const [serviceIds, setServiceIds] = useState(["collection"]);
  const [form, setForm] = useState({
    systemType: "",
    collectionType: "",
    otherDetails: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const selectedServices = SERVICES.filter((s) => serviceIds.includes(s.id));

  const toggleService = (id) =>
    setServiceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const canContinue = step === 0 ? serviceIds.length > 0 : true;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  // Fires only when the "Confirm" button on the Review step is clicked.
  const handleConfirm = async () => {
    const data = {
      services: serviceIds,
      system_type: form.systemType || null,
      collection_type: form.collectionType || null,
      other_details: form.otherDetails || null,
    };

    setSubmitting(true);
    setSubmitError("");
    try {
      await postService(data);
      next(); // move to the Confirm step only after a successful call
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
        <Stepper current={step} />

        {step === 0 && <StepSelectService serviceIds={serviceIds} toggleService={toggleService} />}
        {step === 1 && <StepEnterDetails form={form} setForm={setForm} serviceIds={serviceIds} />}
        {step === 2 && <StepReview services={selectedServices} form={form} />}
        {step === 3 && <StepConfirm />}

        {step === 2 && submitError && (
          <p className="ssr-error">{submitError}</p>
        )}

        {step < 3 && (
          <div className="ssr-actions ssr-actions-footer">
            <button type="button" className="ssr-btn" onClick={back} disabled={step === 0}>
              Back
            </button>

            {step < 2 ? (
              <button type="button" className="ssr-btn primary" onClick={next} disabled={!canContinue}>
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