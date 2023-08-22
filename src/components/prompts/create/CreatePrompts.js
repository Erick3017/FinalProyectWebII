import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import "./createprompts.css";

const CreatePrompts = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    type: "",
    input: "",
    instruction: "",
  });

  const [success, setSuccess] = useState(false);
  const { loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/prompts", credentials);

      if (res.data) {
        setSuccess(true);
      }
    } catch (err) {
      // Manejo de error si es necesario
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Formulario de Prompts</h2>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Tipo:</label>
        <select
          id="type"
          onChange={handleChange}
        >
          <option value="edit">Edit</option>
          <option value="image">Image</option>
          <option value="completion">Completion</option>
          <option value="input">Input</option>

        </select>
      </div>
      <div className="form-group">
        <label>Input:</label>
        <input
          type="text"
          id="input"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Instrucción:</label>
        <textarea
          id="instruction"
          onChange={handleChange}
        />
      </div>
      <div className="form-buttons">
        <button
          disabled={loading}
          onClick={handleClick}
          className="rButton"
        >
          {loading ? "Agregando..." : "Agregar"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CreatePrompts;
