import React from 'react'
import { useEffect, useState } from 'react';
import { postKyc } from "../../../../api/postKyc"; // TODO: this form has no company_type/company fields, so postCompany/getCompanyTypes from the original file don't apply — point this at your real KYC submit endpoint.
import Header from '../header/header';
import '../form-style.css'

const SECTIONS = [
  "Bank / Institution Information",
  "Ownership Management Information",
  "General Requirements",
  "General AML Policies",
  "Know Your Customer, Due Diligence and Enhanced Due Diligence",
  "AML Training",
  "Risk Management",
  "AML Controls / Internal Measures",
];

const SECTION_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

// Small reusable Yes/No pair — every field the FormData reader below
// expects is name={name}, value "yes" or "no".
function YesNo({ name, label, required }) {
  return (
    <div className="form-field">
      <label>{label} {required && <span>*</span>}</label>
      <div className="yesno-group">
        <label><input type="radio" name={name} value="yes" required={required} /> Yes</label>
        <label><input type="radio" name={name} value="no" /> No</label>
      </div>
    </div>
  );
}

export default function KnowYourCustomer() {

  const [step, setStep] = useState(0);

  useEffect(() => {
    document.title = "Pisopay | Know Your Customer";
  }, []);

  const next = () => setStep((s) => Math.min(s + 1, SECTIONS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const status = 'pending';

    const data = {
      user_id: userId,
      status: status,

      // Section I: Bank / Institution Information
      bank_institution: formData.get("bank_institution"),
      country: formData.get("country"),
      business_type: formData.get("business_type"),
      business_type_other: formData.get("business_type_other"),
      company_registration_date: formData.get("company_registration_date"),
      business_registration_no: formData.get("business_registration_no"),
      bir_registration_no: formData.get("bir_registration_no"),
      place_of_registration: formData.get("place_of_registration"),
      business_address: formData.get("business_address"),
      web_address: formData.get("web_address"),
      parent_institution_name: formData.get("parent_institution_name"),
      parent_institution_address: formData.get("parent_institution_address"),
      telephone_no: formData.get("telephone_no"),
      fax_no: formData.get("fax_no"),
      email_address: formData.get("email_address"),

      // Section II: Ownership Management Information
      publicly_held: formData.get("publicly_held"),
      publicly_held_listed_where: formData.get("publicly_held_listed_where"),
      privately_owned: formData.get("privately_owned"),
      privately_owned_details: formData.get("privately_owned_details"),
      ownership_changes_5yrs: formData.get("ownership_changes_5yrs"),
      ownership_changes_details: formData.get("ownership_changes_details"),
      board_listing_attached: formData.get("board_listing_attached") === "on",
      executive_mgmt_status: formData.get("executive_mgmt_status"),
      executive_mgmt_names: formData.get("executive_mgmt_names"),
      peps_status: formData.get("peps_status"),
      peps_details: formData.get("peps_details"),
      publishes_financials: formData.get("publishes_financials"),
      good_governance_system: formData.get("good_governance_system"),

      // Section III: General Requirements
      supervised_by_authority: formData.get("supervised_by_authority"),
      supervisory_authority_name: formData.get("supervisory_authority_name"),
      supervision_covers_aml_cft: formData.get("supervision_covers_aml_cft"),
      money_laundering_is_crime: formData.get("money_laundering_is_crime"),
      money_laundering_law: formData.get("money_laundering_law"),
      terrorist_financing_is_crime: formData.get("terrorist_financing_is_crime"),
      terrorist_financing_law: formData.get("terrorist_financing_law"),
      complies_fatf_eu: formData.get("complies_fatf_eu"),
      fatf_eu_compliance_details: formData.get("fatf_eu_compliance_details"),
      anonymous_accounts: formData.get("anonymous_accounts"),
      anonymous_accounts_legal: formData.get("anonymous_accounts_legal"),
      internal_audit_aml: formData.get("internal_audit_aml"),
      external_audit_aml: formData.get("external_audit_aml"),

      // Section IV: General AML Policies
      country_has_aml_laws: formData.get("country_has_aml_laws"),
      aml_program_board_approved: formData.get("aml_program_board_approved"),
      aml_policy_last_version_date: formData.get("aml_policy_last_version_date"),
      customers_have_aml_policies: formData.get("customers_have_aml_policies"),
      prohibits_shell_banks: formData.get("prohibits_shell_banks"),
      account_opening_procedures: formData.get("account_opening_procedures"),
      account_opening_features: formData.get("account_opening_features"),
      record_retention_procedures: formData.get("record_retention_procedures"),
      aml_applies_all_branches: formData.get("aml_applies_all_branches"),
      has_written_aml_policies: formData.get("has_written_aml_policies"),
      aml_policy_includes: formData.getAll("aml_policy_includes"),
      maintains_pep_database: formData.get("maintains_pep_database"),
      pep_high_risk_definition: formData.get("pep_high_risk_definition"),

      // Section V: KYC, Due Diligence and Enhanced Due Diligence
      kyc_identification_process: formData.get("kyc_identification_process"),
      collects_business_activity_info: formData.get("collects_business_activity_info"),
      assesses_customer_aml_policies: formData.get("assesses_customer_aml_policies"),
      updates_high_risk_customer_info: formData.get("updates_high_risk_customer_info"),

      // Section VI: AML Training
      provides_aml_training: formData.get("provides_aml_training"),
      aml_training_frequency: formData.get("aml_training_frequency"),
      retains_training_records: formData.get("retains_training_records"),
      communicates_aml_changes: formData.get("communicates_aml_changes"),

      // Section VII: Risk Management
      risk_focused_assessment: formData.get("risk_focused_assessment"),
      determines_edd_level: formData.get("determines_edd_level"),

      // Section VIII: AML Controls / Internal Measures
      has_aml_officer: formData.get("has_aml_officer"),
      aml_officer_name: formData.get("aml_officer_name"),
      aml_officer_address: formData.get("aml_officer_address"),
      aml_officer_position: formData.get("aml_officer_position"),
      aml_officer_contact: formData.get("aml_officer_contact"),
      aml_officer_email: formData.get("aml_officer_email"),
      officer_produces_reports: formData.get("officer_produces_reports"),
      has_reporting_policies: formData.get("has_reporting_policies"),
      has_audit_trail_recordkeeping: formData.get("has_audit_trail_recordkeeping"),
      has_internal_or_third_party_audit: formData.get("has_internal_or_third_party_audit"),

      // Certification
      certifying_officer_name: formData.get("certifying_officer_name"),
      certifying_officer_position: formData.get("certifying_officer_position"),
      date_signed: formData.get("date_signed"),
    };

    try {
      const response = await postKyc(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (

  <div className='form-overlay'>
  <div className='form-card'>

  <Header>
      <h1>Know Your Customer and Anti-Money Laundering Questionnaire</h1>
  </Header>

  <div className='form-container'>
  <form onSubmit={handleSubmit} className='form'>

    <div className="form-steps">
      {SECTIONS.map((label, i) => (
        <span
          key={label}
          className={`form-step ${i === step ? "active" : i < step ? "done" : ""}`}
        >
          {i + 1}
        </span>
      ))}
    </div>

    <h2 className="section-title">SECTION {SECTION_NUMERALS[step]}: {SECTIONS[step]}</h2>

    {/* Section I: Bank / Institution Information */}
    <div style={{ display: step === 0 ? "flex" : "none", flexDirection: "column", gap: "10px" }}>

      <div className="form-row">
        <div className="input-field">
          <label>Bank / Institution <span>*</span></label>
          <input type='text' name='bank_institution' placeholder="Enter bank/institution name" />
        </div>
        <div className="input-field">
          <label>Country <span>*</span></label>
          <input type='text' name='country' placeholder="Enter country" />
        </div>
      </div>

      <div className="form-field">
        <label>Type of Business <span>*</span></label>
        <div className="checkbox-group">
          <label><input type="radio" name="business_type" value="sole_proprietorship" /> Sole Proprietorship</label>
          <label><input type="radio" name="business_type" value="partnership" /> Partnership</label>
          <label><input type="radio" name="business_type" value="corporation" /> Corporation</label>
          <label><input type="radio" name="business_type" value="others" /> Others (please specify)</label>
        </div>
        <input type='text' name='business_type_other' placeholder="If others, please specify" />
      </div>

      <div className="form-row">
        <div className="input-field">
          <label>Company Registration Date <span>*</span></label>
          <input type='date' name='company_registration_date' />
        </div>
        <div className="input-field">
          <label>Business Registration No. <span>*</span></label>
          <input type='text' name='business_registration_no' placeholder="Enter registration no." />
        </div>
      </div>

      <div className="form-row">
        <div className="input-field">
          <label>BIR Registration No. / TIN No. <span>*</span></label>
          <input type='text' name='bir_registration_no' placeholder="Enter BIR/TIN no." />
        </div>
        <div className="input-field">
          <label>Place of Registration <span>*</span></label>
          <input type='text' name='place_of_registration' placeholder="Enter place of registration" />
        </div>
      </div>

      <div className="form-field">
        <label>Business Address <span>*</span></label>
        <input type='text' name='business_address' placeholder="Enter business address" />
      </div>

      <div className="form-field">
        <label>Web Address</label>
        <input type='url' name='web_address' placeholder="Enter web address" />
      </div>

      <div className="form-row">
        <div className="input-field">
          <label>Name of Parent Institution (If Applicable)</label>
          <input type='text' name='parent_institution_name' placeholder="Enter parent institution name" />
        </div>
        <div className="input-field">
          <label>Address of Parent Institution</label>
          <input type='text' name='parent_institution_address' placeholder="Enter parent institution address" />
        </div>
      </div>

      <div className="form-row">
        <div className="input-field">
          <label>Telephone No. <span>*</span></label>
          <input type='tel' name='telephone_no' placeholder="Enter telephone no." />
        </div>
        <div className="input-field">
          <label>Fax No.</label>
          <input type='text' name='fax_no' placeholder="Enter fax no." />
        </div>
      </div>

      <div className="form-field">
        <label>Email Address <span>*</span></label>
        <input type='email' name='email_address' placeholder="Enter email address" />
      </div>

    </div>

    {/* Section II: Ownership Management Information */}
    <div style={{ display: step === 1 ? "flex" : "none", flexDirection: "column", gap: "10px" }}>

      <YesNo name="publicly_held" label="Is the institution publicly held?" required />
      <div className="form-field">
        <label>If YES, where is it listed?</label>
        <input type='text' name='publicly_held_listed_where' placeholder="Enter where it is listed" />
      </div>

      <YesNo name="privately_owned" label="Is the institution privately owned?" required />
      <div className="form-field">
        <label>If YES, please provide/attach details of ownership/stockholders including % of their interest/stockholdings.</label>
        <input type='text' name='privately_owned_details' placeholder="Enter ownership details" />
      </div>

      <YesNo name="ownership_changes_5yrs" label="Any significant changes in ownership during the last five (5) years?" required />
      <div className="form-field">
        <label>If YES, please provide details and information (shareholding changes due to deceased director).</label>
        <input type='text' name='ownership_changes_details' placeholder="Enter details" />
      </div>

      <div className="form-field">
        <label>
          <input type="checkbox" name="board_listing_attached" style={{ marginRight: '8px' }} />
          Current member of the Board of Directors (with address, birthdates, and valid photo identifications) — Listing Attached
        </label>
      </div>

      <div className="form-field">
        <label>Current Executive Management (with address, birthdates, and valid photo identifications)</label>
        <div className="checkbox-group">
          <label><input type="radio" name="executive_mgmt_status" value="listing_attached" /> Listing Attached</label>
          <label><input type="radio" name="executive_mgmt_status" value="na" /> N/A</label>
        </div>
        <input type='text' name='executive_mgmt_names' placeholder="Provide the names of Senior Executives of the Institution" />
      </div>

      <div className="form-field">
        <label>Politically Exposed Persons (PEPs) — individuals who have or have had positions of public trust (govt./corp., politicians, party officials, their families and close associates)</label>
        <div className="checkbox-group">
          <label><input type="radio" name="peps_status" value="listing_attached" /> Listing Attached</label>
          <label><input type="radio" name="peps_status" value="na" /> N/A</label>
        </div>
        <input type='text' name='peps_details' placeholder="Provide names and roles if there are PEPs" />
      </div>

      <YesNo name="publishes_financials" label="Do you publish your latest financial statement and similar information?" required />
      <YesNo name="good_governance_system" label="Does your institution have a good governance system?" required />

    </div>

    {/* Section III: General Requirements */}
    <div style={{ display: step === 2 ? "flex" : "none", flexDirection: "column", gap: "10px" }}>

      <YesNo name="supervised_by_authority" label="Is your company supervised by a national authority / Agency?" required />
      <div className="form-field">
        <label>Please state the supervisory authority</label>
        <input type='text' name='supervisory_authority_name' placeholder="Enter supervisory authority" />
      </div>

      <YesNo name="supervision_covers_aml_cft" label="Is the supervision carried out with special regard to the prevention of money laundering and combatting terrorist financing?" required />

      <YesNo name="money_laundering_is_crime" label="Is money laundering considered a crime in your country's legislation?" required />
      <div className="form-field">
        <label>If YES, please state the law</label>
        <input type='text' name='money_laundering_law' placeholder="Enter the law" />
      </div>

      <YesNo name="terrorist_financing_is_crime" label="Is terrorist financing considered a crime in your country's legislation?" required />
      <div className="form-field">
        <label>If YES, please state the law</label>
        <input type='text' name='terrorist_financing_law' placeholder="Enter the law" />
      </div>

      <YesNo name="complies_fatf_eu" label="Does your institution comply with the recommendations of the FATF or European Union (EU) or with your equal standards?" required />
      <div className="form-field">
        <label>If YES, please describe the compliance</label>
        <input type='text' name='fatf_eu_compliance_details' placeholder="Describe compliance" />
      </div>

      <YesNo name="anonymous_accounts" label="Does your institution open/maintain accounts for customers which are not identified (anonymous accounts)?" required />
      <div className="form-field">
        <label>If YES, is this legally allowed?</label>
        <input type='text' name='anonymous_accounts_legal' placeholder="Enter details" />
      </div>

      <YesNo name="internal_audit_aml" label="Are you audited in terms of testing the adequacy of your AML procedures and policies — internal audit on a regular basis?" required />
      <YesNo name="external_audit_aml" label="Are you audited in terms of testing the adequacy of your AML procedures and policies — external audit on a regular basis?" required />

    </div>

    {/* Section IV: General AML Policies */}
    <div style={{ display: step === 3 ? "flex" : "none", flexDirection: "column", gap: "10px" }}>

      <YesNo name="country_has_aml_laws" label="Has the country in which you are located established laws designed to prevent money laundering?" required />

      <YesNo name="aml_program_board_approved" label="Does the AML compliance program get approved by your institution's Board of Senior committee?" required />
      <div className="form-field">
        <label>Please provide the date of the last version of AML Compliance policies and procedures.</label>
        <input type='date' name='aml_policy_last_version_date' />
      </div>

      <YesNo name="customers_have_aml_policies" label="Does your institution ensure that its credit / financial institution customers have adequate anti-money laundering written policies & procedures in place?" required />
      <YesNo name="prohibits_shell_banks" label="Does your institution have a policy prohibiting accounts / relationships with shell banks?" required />

      <YesNo name="account_opening_procedures" label="Do you have account opening procedures (customer acceptance policy / customer information sheet) in place?" required />
      <div className="form-field">
        <label>If YES please attach salient features.</label>
        <input type='text' name='account_opening_features' placeholder="Describe salient features" />
      </div>

      <YesNo name="record_retention_procedures" label="Does your institution have appropriate record retention procedures pursuant to applicable law?" required />
      <YesNo name="aml_applies_all_branches" label="Does your institution require that its AML policies and practices be applied to all branches and subsidiaries of the financial institution in the home country and in locations outside of the home country?" required />

      <div className="form-field">
        <label>Do you have written anti-money laundering policies and procedures which include at least:</label>
        <div className="yesno-group">
          <label><input type="radio" name="has_written_aml_policies" value="yes" /> Yes</label>
          <label><input type="radio" name="has_written_aml_policies" value="no" /> No</label>
        </div>
        <div className="checkbox-group">
          <label><input type="checkbox" name="aml_policy_includes" value="compliance_officer_designation" /> Designation of compliance officer</label>
          <label><input type="checkbox" name="aml_policy_includes" value="compliance_officer_roles" /> Roles and Responsibilities of the compliance officer</label>
          <label><input type="checkbox" name="aml_policy_includes" value="staff_training_monitoring" /> Staff training, Monitoring and reporting in terms of AML on a regular basis</label>
          <label><input type="checkbox" name="aml_policy_includes" value="record_keeping" /> Adequate record keeping of transactions</label>
          <label><input type="checkbox" name="aml_policy_includes" value="customer_identification" /> The Identification of the true identity of all customers prior to establishing a business relationship</label>
          <label><input type="checkbox" name="aml_policy_includes" value="pep_policies" /> Written policies/procedures/programs for relationships with PEPs and other high-risk customers</label>
        </div>
      </div>

      <YesNo name="maintains_pep_database" label="Does your institution maintain a database for PEP / High Risk customers?" required />
      <div className="form-field">
        <label>What does your institution define as PEP and high-risk customers? Provide list if necessary.</label>
        <input type='text' name='pep_high_risk_definition' placeholder="Describe your institution's definition" />
      </div>

    </div>

    {/* Section V: Know Your Customer, Due Diligence and Enhanced Due Diligence */}
    <div style={{ display: step === 4 ? "flex" : "none", flexDirection: "column", gap: "10px" }}>

      <YesNo name="kyc_identification_process" label="Has your institution implemented processes for the identification of those customers on whose behalf it maintains or operates or transacts?" required />
      <YesNo name="collects_business_activity_info" label="Does your institution have a requirement to collect information regarding its customers' business activities?" required />
      <YesNo name="assesses_customer_aml_policies" label="Does your institution assess its financial institution customers' AML policies and practices?" required />
      <YesNo name="updates_high_risk_customer_info" label="Does your institution have a process to view and, where appropriate, update customer information relating to high risk client information?" required />

    </div>

    {/* Section VI: AML Training */}
    <div style={{ display: step === 5 ? "flex" : "none", flexDirection: "column", gap: "10px" }}>

      <YesNo name="provides_aml_training" label="Does your institution provide adequate/continuous training on Anti-Money Laundering?" required />
      <div className="form-field">
        <label>If YES, how frequent?</label>
        <input type='text' name='aml_training_frequency' placeholder="Enter frequency" />
      </div>

      <YesNo name="retains_training_records" label="Does your institution retain records of its training sessions including attendance records and relevant training material used?" required />
      <YesNo name="communicates_aml_changes" label="Does your institution communicate new anti-money laundering related laws or changes to existing AML related policies or practices to relevant employees?" required />

    </div>

    {/* Section VII: Risk Management */}
    <div style={{ display: step === 6 ? "flex" : "none", flexDirection: "column", gap: "10px" }}>

      <YesNo name="risk_focused_assessment" label="Does your institution have a risk focused assessment of its customer base and transaction of its customers?" required />
      <YesNo name="determines_edd_level" label="Does your institution determine the appropriate level of enhanced due diligence necessary for those categories of customers and transactions that the institution has reason to believe pose a heightened risk of illicit activities?" required />

    </div>

    {/* Section VIII: AML Controls / Internal Measures */}
    <div style={{ display: step === 7 ? "flex" : "none", flexDirection: "column", gap: "10px" }}>

      <YesNo name="has_aml_officer" label="Is there a person responsible for coordinating and overseeing the anti-money laundering program / system in your institution?" required />

      <div className="form-row">
        <div className="input-field">
          <label>Name</label>
          <input type='text' name='aml_officer_name' placeholder="Enter name" />
        </div>
        <div className="input-field">
          <label>Address</label>
          <input type='text' name='aml_officer_address' placeholder="Enter address" />
        </div>
      </div>

      <div className="form-row">
        <div className="input-field">
          <label>Position</label>
          <input type='text' name='aml_officer_position' placeholder="Enter position" />
        </div>
        <div className="input-field">
          <label>Contact Nos. / Fax No.</label>
          <input type='text' name='aml_officer_contact' placeholder="Enter contact/fax no." />
        </div>
      </div>

      <div className="form-field">
        <label>Email Address</label>
        <input type='email' name='aml_officer_email' placeholder="Enter email address" />
      </div>

      <YesNo name="officer_produces_reports" label="Does the reporting officer produce annual/periodic reports on AML activities, results and conclusions?" required />
      <YesNo name="has_reporting_policies" label="Are there policies or practices for identifying and reporting transactions that are required by applicable law to be reported to the authorities?" required />
      <YesNo name="has_audit_trail_recordkeeping" label="Does the institution have adequate record-keeping, providing an audit trail for suspicious transactions?" required />
      <YesNo name="has_internal_or_third_party_audit" label="In addition to inspection by government supervisors/regulators, does your institution have an internal audit function or other independent third party that assesses AML policies and practices on a regular basis?" required />

      <p className="certification-text">
        I hereby certify that the statements and information given above are true and correct.
      </p>

      <div className="form-row">
        <div className="input-field">
          <label>Name / Signature of Authorized officer of the Institution <span>*</span></label>
          <input type='text' name='certifying_officer_name' placeholder="Enter name" />
        </div>
        <div className="input-field">
          <label>Position/Rank <span>*</span></label>
          <input type='text' name='certifying_officer_position' placeholder="Enter position/rank" />
        </div>
      </div>

      <div className="form-field">
        <label>Date Signed <span>*</span></label>
        <input type='date' name='date_signed' />
      </div>

    </div>

    <div className="form-nav">
      <button type="button" onClick={back} disabled={step === 0}>Back</button>
      {step < SECTIONS.length - 1 ? (
        <button type="button" onClick={next}>Next</button>
      ) : (
        <button type="submit">Submit</button>
      )}
    </div>

  </form>
  </div>
  </div>
  </div>
  )
}