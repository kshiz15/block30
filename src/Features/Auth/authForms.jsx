import { useState } from "react";
import "./AuthForm.css";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Login" : "Register";
  const altMessage = isLogin
    ? "Need an account? Register "
    : "Already have an account? Login ";

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [error, setError] = useState();

  const attemptAuth = async (e) => {
    e.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = { firstname, lastname, email, password };

    try {
      setError();
      await authMethod(credentials).unwrap();
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className="login-register">
      <h1>{authAction}</h1>
      <form className="login-register-form" onSubmit={attemptAuth}>
        {!isLogin && (
          <label>
            First Name
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
        )}
        {!isLogin && (
          <label>
            Last Name
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
        )}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="login-register-error">{error}</p>}
        <button>{authAction}</button>
      </form>
      <p className="login-register-message">
        {altMessage}
        <a
          onClick={() => {
            setIsLogin(!isLogin);
            setError();
          }}
        >
          here
        </a>
      </p>
    </main>
  );
};
