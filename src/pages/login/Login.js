import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [verificationCode, setVerificationCode] = useState(''); // Nuevo estado para el código de verificación

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    setVerificationCode(e.target.value);
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        ...credentials,
        verificationCode, // Enviar el código de verificación
      });

      if (res.data && res.data.token) {
        const { token, ...otherDetails } = res.data;
        sessionStorage.setItem("access_token", token);
        dispatch({ type: "LOGIN_SUCCESS", payload: otherDetails });
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleVerificationChange = (e) => {
    setVerificationCode(e.target.value);
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Usuario"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Constraseña"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Código de verificación"
          value={verificationCode}
          onChange={handleVerificationChange}
          className="lInput"
        />
        <Link to="/register" className="signInLink">Registrarse</Link>
        <button
          disabled={loading}
          onClick={handleClick}
          className="lButton"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <span className="errorText">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
