import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import "./css/login.css"
import SignupFormModal from "../modal-pages/SignupFormModal";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to={`/`} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = await dispatch(login(credentials, password));

    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("Demo", "password"));
  };

  const demoAdminLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("DemoAdmin", "password"));
  };

  return (
    <div className="login-container">
      <div className="login-container-2">
        <div className="login-container-3">
          {/* HEADING AND WELCOME BACK MESSAGE */}
          <div>
            <h1 className="form-login-header">Welcome to Sweet Petals!</h1>
            <p className="form-login-message">
              Please log in to continue!
            </p>
          </div>
          <div className="login-container-4">
            <div className="login-container-5">
              <div className="login-container-6">
                {/* FORM SECTION */}
                <form onSubmit={handleSubmit}>
                  {errors.length || errors.password ? (
                    <p className="form-input-label-error">
                      Email or Username{" "}
                      <span className="form-input-label-error-span">
                        - Login or password is invalid.
                        {!errors && errors.password}
                      </span>
                    </p>
                  ) : (
                    <p className="form-input-label">
                      Email or Username <span>*</span>
                    </p>
                  )}
                  <input
                    type="text"
                    className="form-input-field"
                    value={credentials}
                    required
                    onChange={(e) => {
                      setCredentials(e.target.value);
                    }}
                  />
                  {errors.length || errors.password ? (
                    <p className="form-input-label-error">
                      Password -{" "}
                      <span className="form-input-label-error-span">
                        {" "}
                        Login or Password is invalid.
                      </span>
                    </p>
                  ) : (
                    <p className="form-input-label">
                      Password <span>*</span>
                    </p>
                  )}
                  <input
                    type="password"
                    className="form-input-field"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />{" "}
                  <div className="login-button-container">
                    <button type="submit" className="login-button">
                      Log in
                    </button>
                  </div>
                  <div
                    // style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="reg-wrap-continer">
                      <p >
                        Don't have an account?
                        <span className="register-link" >
                            <SignupFormModal />
                        </span>
                      </p>
                    </div>
                    <div className="demo-login-wrapper">
                      <p className="register-container">
                        Login as
                        <span
                          className="demo-user-link"
                          onClick={(e) => demoLogin(e)}
                        >
                          Demo User
                        </span>
                      </p>
                      <p className="register-container">
                        Login as
                        <span
                          className="demo-user-link"
                          onClick={(e) => demoAdminLogin(e)}
                        >
                          Demo Admin User
                        </span>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
