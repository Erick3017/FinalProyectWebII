
import { useState, useContext, CSSProperties } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import "./register.css";
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';


const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
  });

  const [susseces, setSusseces] = useState(false)
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", credentials);

      // Verificamos si la respuesta contiene el token y los detalles del usuario
      console.log(res.data);
      
      setSusseces(!susseces);

    } catch (err) {

    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="login">
      {susseces ? (
        <>
          <Spinner message={"Please....wait to be verified"}></Spinner>

        </>
      ) : (

        <div className="lContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
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
          <span onClick={e => { navigate("/login") }}>Log in</span>
          <button disabled={loading} onClick={handleClick} className="lButton">
            Register
          </button>

          {error && <span>{error.message}</span>}
        </div>
      )}

    </div>
  );
};

export default Register;