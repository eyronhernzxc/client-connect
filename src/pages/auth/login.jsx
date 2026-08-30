import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import "../../styles/merchant/merchant.css";
import pisopayLogo from "../../assets/pisopay_logo.png";
import pisopayName from "../../assets/pisopay_name.png";
import ReCAPTCHA from "react-google-recaptcha";
import { api } from "../../api/api";
import Spinner from "../../loader/spinner";
import { getCurrentUser } from "../../api/auth";
import { getCompany } from "../../api/getCompany";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Pisopay | Merchant Login";
  }, []);

  const [captchaToken, setCaptchaToken] = useState(null);

  const handleMerchantLog = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // validation here

    if (!captchaToken) {
      alert("Please verify that you are not a robot.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      console.log(response.data);

      localStorage.setItem("access_token", response.data.access_token);
      const user = await getCurrentUser();
      localStorage.setItem("user", JSON.stringify(user));

      const companies = await getCompany();
      const hasCompany = companies.some((company) => company.user_id === user.id);

      if(hasCompany){

        navigate('merchant/home');
      } else {

        navigate('form/company')
      }
      
    } catch (error) {
    console.error("LOGIN ERROR:", error);
    console.error("RESPONSE:", error.response?.data);
    console.error("STATUS:", error.response?.status);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginContainer">
      <div className="LoginCard">
        <div className="ImageContainer"></div>
        <div className="LogFormContainer">
          <div className="LogInLogo">
            <img src={pisopayLogo} alt="pisopay logo" />
          </div>
          <div className="LogInName">
            <img src={pisopayName} alt="pisopay name" />
          </div>

          <form className="MerchantLogForm" onSubmit={handleMerchantLog}>
            <div className="LogInputContainer">
              <input
                id="merchant_email"
                type="email"
                placeholder="Email"
                required
                name="email"
              />

              <input
                id="merchant_password"
                type="password"
                placeholder="Password"
                required
                name="password"
              />
            </div>
            <div className="ForgotContainer">
              <a href="/merchant/forgot-password">Forgot Password?</a>
            </div>
            <div className="CaptchaContainer">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>
            <button className=" MerchantLogBtn" type="submit">
              {loading ? (
                <Spinner />
              ) : (
                "Login"
              )}
            </button>
            <div className="RegisterContainer">
              <p>
                Don't have an account?{" "}
                <Link to="/register">Register Here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
