import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/merchant/merchant.css";
import pisopayLogo from "../../assets/pisopay_logo.png";
import pisopayName from "../../assets/pisopay_name.png";
import { createUser } from "../../api/userApi";

function MerchantRegister() {
  const navigate = useNavigate();

  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    document.title = "Pisopay | Merchant Register";
  }, []);

  // Text validation only
  const handleTextValidation = (event) => {
    const target = event.target;

    if (target.name === "firstname" || target.name === "lastname") {
      target.value = target.value
        .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g, "")
        .slice(0, 150);
    }

    if (target.name === "phone_num") {
      target.value = target.value
        .replace(/[^0-9+()\- ]/g, "")
        .slice(0, 20);
    }
  };

  const handleMerchantRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const month = formData.get("birth_month");
    const day = formData.get("birth_day");
    const year = formData.get("birth_year");

    const data = {
      first_name: formData.get("firstname"),
      last_name: formData.get("lastname"),
      email: formData.get("email"),

      mobile_number:
        formData.get("country-code") +
        formData.get("phone_num"),

      birth_date: `${year}-${month}-${day}`,

      password: formData.get("password"),
      password_confirmation: formData.get("confirm_password"),
    };

    try {
      const result = await createUser(data);
    } catch (error) {
      console.error(error);
    }

    // validation here

    navigate("/");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="image-container"></div>
          <div className="form-container">
            <div className="logo-container">
              <div className="login-logo">
                <img src={pisopayLogo} alt="pisopay logo" />
              </div>
              <div className="login-name">
                <img src={pisopayName} alt="pisopay name" />
              </div>
            </div>

            <form
              className="merchant-register-form"
              onSubmit={handleMerchantRegister}
              onInput={handleTextValidation}
            >
              <div className="name-container">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  maxLength={150}
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ' -]+"
                  required
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  maxLength={150}
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ' -]+"
                  required
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                className="register-input"
                name="email"
                required
              />

              <div className="label-container">
                <label>Phone Number</label>
              </div>

              <div className="phone-container">
                <select name="country-code">
                  <option hidden value="">
                    +
                  </option>
                  <option value="+63">+63</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+81">+81</option>
                  <option value="+82">+82</option>
                  <option value="+65">+65</option>
                  <option value="+91">+91</option>
                </select>

                <input
                  className="phone_num"
                  name="phone_num"
                  type="tel"
                  maxLength={20}
                  pattern="[0-9+()\\- ]{7,20}"
                />
              </div>

              <div className="label-container">
                <label>Birthday</label>
              </div>

              <div className="birthday-container">
                <select
                  name="birth_month"
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                >
                  <option value="">Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>

                <select
                  name="birth_day"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                >
                  <option value="">Day</option>

                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <select
                  name="birth_year"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                >
                  <option value="">Year</option>

                  {Array.from({ length: 120 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <input
                type="password"
                placeholder="Password"
                className="register-input"
                name="password"
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                name="confirm_password"
                className="register-input"
                required
              />

              <div className="terms-container">
                <label>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    required
                  />
                  Creating your account and you accepting
                  <button
                    type="button"
                    className="terms-link"
                    onClick={() => setShowTerms(true)}
                  >
                    Terms and Conditions
                  </button>
                  .
                </label>
              </div>

              <button className="register-btn" type="submit">
                Register
              </button>

              <div className="log-container">
                <p>
                  Already Have an account?? <Link to="/">Log In</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Terms Modal */}

      {showTerms && (
        <div className="TermsOverlay">
          <div className="TermsModal">
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <button
              type="button"
              className="AgreeTermsBtn"
              onClick={() => {
                setAcceptedTerms(true);
                setShowTerms(false);
              }}
            >
              I Agree
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MerchantRegister;