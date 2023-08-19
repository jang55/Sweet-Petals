import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import "./css/login.css"

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

  return (
    <div>login</div>
  );
}

export default LoginFormPage;
