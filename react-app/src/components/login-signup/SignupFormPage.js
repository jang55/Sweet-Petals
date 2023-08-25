import { Link, Redirect } from "react-router-dom";
import { useState, useContext} from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/session";
import { ModalContext } from "../../context/modalContext";
import "./css/signup.css";
import LoginFormModal from "../modal-pages/LoginFormModal";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // const { loginModal } = useContext(ModalContext)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/app" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = await dispatch(signUp(username, email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="signup-container">
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
                  </div>

                  <div className="signup-button-container">
                    <button className="signup-button" type="submit">
                      Sign Up
                    </button>
                  </div>

                  <p className="signup-term">
                    By registering, you agree to Sweet Petals Term of Agreement and
                    Services
                  </p>
                  <p 
                  className="already-have-an-account" 
                  >
                    Already have an account?
                    <LoginFormModal />
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
