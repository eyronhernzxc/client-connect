import { Link, useNavigate } from "react-router-dom"; 
import { useEffect } from "react"; 
import { useState } from "react";
import "../../../styles/admin/admin.css";
import pisopayLogo from "../../../assets/pisopay_logo.png";
import pisopayName from "../../../assets/pisopay_name.png";
import { api } from "../../../api/api";
import Spinner from "../../../loader/spinner";
import { getCurrentUser } from "../../../api/auth";
import { getCompany } from "../../../api/getCompany";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Pisopay | Admin Login";
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
            <button className=" MerchantLogBtn" type="submit">
              {loading ? (
                <Spinner />
              ) : (
                "Login"
              )}
            </button>
          </form>
          </div>
      </div>
    </div>
  );
}

export default Login;
