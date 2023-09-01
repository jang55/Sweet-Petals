import { Redirect } from "react-router-dom";
import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/session";
import "./css/signup.css";
import LoginFormPage from "./LoginFormPage";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showLoginPage, setShowLoginPage] = useState(false)

  if (sessionUser) return <Redirect to="/app" />;

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const errors = {};
    
    if(password !== confirmPassword) {
      errors.password = "Passwords did not match"
    }
    
    if(password.length < 8) {
      errors.password = "Password needs to be atleast 8 characters long"
    }

    if(Object.values(errors).length > 0) {
      setErrors({...errors});
      return;
    }

    const data = await dispatch(signUp(username, email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      {!showLoginPage && <div className="signup-container">
        <div className="signup-container-2">
          <div className="signup-container-3">
            {/* HEADING AND WELCOME BACK MESSAGE */}
            <div>
              <h1 className="form-signup-header">Create an Account</h1>
            </div>
            <div className="signup-container-4">
              <div className="signup-container-5">
                <div className="signup-container-6">
                  {/* FORM SECTION */}
                  <form onSubmit={handleSubmit}>
                    <div>
                      {/* ------- email ------ */}
                      {errors.email ? (
                        <p className="form-input-label-error">
                          Email -{" "}
                          <span className="form-input-label-error-span">
                            {errors.email}
                          </span>
                        </p>
                      ) : (
                        <p className="form-input-label">
                          Email <span>*</span>
                        </p>
                      )}
                      <input
                        type="email"
                        className="form-input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {/* ------ username ------ */}
                      {errors.username ? (
                        <p className="form-input-label-error">
                          Username -{" "}
                          <span className="form-input-label-error-span">
                            {errors.username}
                          </span>
                        </p>
                      ) : (
                        <p className="form-input-label">
                          Username <span>*</span>
                        </p>
                      )}
                      <input
                        type="text"
                        className="form-input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      {/* ------- password -------- */}
                      {errors.password ? (
                        <p className="form-input-label-error">
                          Password -{" "}
                          <span className="form-input-label-error-span">
                            {errors.password}
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />{" "}

                      {errors.password ? (
                        <p className="form-input-label-error">
                          Confirm Password -{" "}
                          <span className="form-input-label-error-span">
                            {errors.password}
                          </span>
                        </p>
                      ) : (
                        <p className="form-input-label">
                          Confirm Password <span>*</span>
                        </p>
                      )}
                      <input
                        type="password"
                        className="form-input-field"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />{" "}
                    </div>

                    <div className="signup-button-container">
                      <button className="signup-button" type="submit">
                        Register
                      </button>
                    </div>

                    <p className="signup-term">
                      By registering, you agree to Sweet Petals Term of Agreement and
                      Services
                    </p>
                    <p 
                    className="signup-message"
                    onClick={e => setShowLoginPage(true)}
                    >
                      Already have an account?
                      <span className="register-link" >
                                Log In
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
      {showLoginPage && <LoginFormPage />}
    </>
  );
}

export default SignupFormPage;
