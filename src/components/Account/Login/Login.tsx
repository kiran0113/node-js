import { Button } from "primereact/button";
import React, { useState, useEffect, useContext } from "react";
import { ILogin } from "../../../models/ILogin";
import IRLOGO from "../../../assets/images/icon/logo-icon.png";
import passImg from "../../../assets/images/pass-img.svg";
import username from "../../../assets/images/username-img.svg";
import { useNavigate } from "react-router";
import "./Login.css";
import { LoginService } from "../../../services/Account/LoginService";
import { validEmail } from "../../../utils/utils";
import { Logindata } from "../../../utils/AccountUtils"
import sessionStorageContext from "../../context/LocalStorageContext";

interface IState {
  user: ILogin;
}
const Login: React.FC = () => {

  const navigate = useNavigate();
  const context = useContext(sessionStorageContext);

  const [state, setState] = useState<IState>({
    user: {
      userName: "",
      password: "",
    },
  });

  const [userErrorMessage, setuserErrorMessage] = React.useState("");

  const [passErrorMessage, setpassErrorMessage] = React.useState("");

  const [loading, setLoading] = useState(false);

  const [passwordType, setPasswordType] = useState("password");



  //Empty error message 
  const ErrorMessageEmptyModel = () => {
    setuserErrorMessage("");
    setpassErrorMessage("");
  };



  // checkNull value
  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
  };


  // validation check
  const isValidate = (values: any) => {
    let formIsValid = true;
    ErrorMessageEmptyModel();
    if (!validEmail.test(values.userName)) {
      setuserErrorMessage("Please enter valid username");
      formIsValid = false;
    }

    if (CheckNull(values.userName)) {
      setuserErrorMessage("Please enter username");
      formIsValid = false;
    }

    if (CheckNull(values.password)) {
      setpassErrorMessage("Please enter password");
      formIsValid = false;
    }
    if (!CheckNull(values.password)) {
      if (values.password.trim().length === 0) {
        setpassErrorMessage("Please enter password");
        formIsValid = false;
      }
    }
    return formIsValid;
  };


  //   handle change function
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      user: {
        ...state.user,
        [event.target.name]: event.target.value,
      },
    });
  };


  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  // form handling
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>): void => {

    event.preventDefault();
    setLoading(true);

    if (isValidate(state.user)) {

      LoginService.login(state.user)
        .then((response: any) => {

          Logindata(response, navigate);
          context.updateLogoSrc(response.data.logoURL);
          context.updateStatus(response.data.onboardingStatus);
          context.updateStepFlag(response.data.stepFlag);
          context.updateFacilitator(response.data.isfacilitator);
          context.updateRole(response.data.partnerRole);
          setLoading(false);


        })
        .catch((error) => {
          if (error.response.status === 401) {
            setpassErrorMessage("Invalid user or credentials");
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (

    <div className="Sigin-page bg-height">
      <div className="Login-form">
        <div className="login-page">
          <img src={IRLOGO} alt="img" className="logo-white" />
        </div>
        <div className="signin-form-display">
          <div className="login-form-display">


            <div className="username-form">
              <form>
                <div className="form-group login-form-input ">
                  <p>
                    {" "}
                    <img src={username} alt="img" /> Username
                  </p>

                  <input
                    id="exampleInputEmail1"
                    name="userName"
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter username"
                    onChange={handleChange}
                    value={state.user.userName}
                  />

                  {userErrorMessage !== null &&
                    userErrorMessage.length > 0 ? (
                    <span className="login-error-msg">
                      {userErrorMessage}
                    </span>
                  ) : null}
                </div>
                <div className="form-group login-form-input password-input">
                  <p>
                    {" "}
                    <img src={passImg} alt="img" /> Password
                  </p>
                  <div className="password-input-icon">
                    <input
                      type={passwordType}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter password"
                      name="password"
                      value={state.user.password}
                      onChange={handleChange}
                    />
                    <span className="eyeicon" style={{top:'-2px'}}>
                      {passwordType === "password" ? <i className="pi pi-eye-slash" onClick={togglePassword}></i> : <i className="pi pi-eye" onClick={togglePassword}></i>}
                    </span>
                  </div>

                  {passErrorMessage !== null &&
                    passErrorMessage.length > 0 ? (
                    <span className="login-error-msg">
                      {passErrorMessage}
                    </span>
                  ) : null}
                </div>
                <Button
                  loading={loading}
                  label="Login"
                  className="btn btn-login"
                  onClick={handleSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
