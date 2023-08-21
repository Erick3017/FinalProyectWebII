import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [success, setSuccess] = useState(false);
  const { loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", credentials);
      
      if (res.data) {
        setSuccess(true);
      }
    } catch (err) {
      // Manejo de error si es necesario
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="register">
      {success ? (
        <Spinner message="Please wait to be verified" />
      ) : (
        <div className="rContainer">
          <h1>Register</h1>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="rInput"
          />
          <Link to="/login" className="loginLink">Log in</Link>
          <button
            disabled={loading}
            onClick={handleClick}
            className="rButton"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <span className="errorText">{error.message}</span>}
        </div>
      )}
    </div>
  );
};

export default Register;
