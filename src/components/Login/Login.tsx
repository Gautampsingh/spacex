import React, { useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
    // Only navigate if login was successful
    if (!error && (username === "admin" || username === "guest")) {
      navigate("/dashboard");
    }
  }, [login, username, password, error, navigate]);

  const handleInputChange = useCallback((setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    clearError();
  }, [clearError]);

  return (
    <form className="login-form">
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={handleInputChange(setUsername)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handleInputChange(setPassword)}
        required
      />
      {error && <div style={{color: "red", marginBottom: "8px"}}>{error}</div>}
      <button type="button" onClick={handleSubmit}>Login</button>
    </form>
  );
};

export default Login;
