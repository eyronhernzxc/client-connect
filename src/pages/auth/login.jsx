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

  

  const handleMerchantLog = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // validation here

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

        navigate('form/signatory');
      } else {

        navigate('form/company')
      }
      
    } catch (error) {
    console.error("LOGIN ERROR:", error);
    console.error("RESPONSE:", error.response?.data);
    console.error("STATUS:", error.response?.status);
    alert("error");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-in-container">
      <div className="log-in-card">
        <div className="login-image-container"></div>
        <div className="login-form-container">
          <div className="login-logo">
            <img src={pisopayLogo} alt="pisopay logo" />
          </div>
          <div className="login-name">
            <img src={pisopayName} alt="pisopay name" />
          </div>

          <form className="merchant-log-form" onSubmit={handleMerchantLog}>
            <div className="log-input-container">
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
            <div className="forgot-container">
              <a href="/merchant/forgot-password">Forgot Password?</a>
            </div>
            <button className="merchant-log-btn" type="submit">
              {loading ? (
                <Spinner />
              ) : (
                "Login"
              )}
            </button>
            <div className="register-container">
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
