import { useContext } from 'react';
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import "./login.css";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", credentials);

      // Verificamos si la respuesta contiene el token y los detalles del usuario
      if (res.data && res.data.token) {
        const { token, ...otherDetails } = res.data; // Separar token y detalles del usuario

        // Guardamos el token en sesion Storage
        sessionStorage.setItem("access_token", token);
        
        // Enviamos los detalles del usuario al contexto de autenticación
        dispatch({ type: "LOGIN_SUCCESS", payload: otherDetails });

        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="login">
        <div className="lContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <span onClick={e => { navigate("/register")}}>Sign in</span>
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>

          {error && <span>{error.message}</span>}
        </div>
    
    </div>
  );
};

export default Login;