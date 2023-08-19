import React, { useState } from "react";
import "./createprompts.css";
import { useNavigate } from "react-router-dom";

const CreatePrompts = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    input: "",
    instruction: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes hacer algo con los datos del formulario, por ejemplo, enviarlos al servidor
    console.log(formData);
  };

  const handleCancel = () => {
        navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Formulario de Prompts</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Tipo:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
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
              name="inputType"
              value={formData.input}
              onChange={handleInputChange}
            />
          </div>
        
        <div className="form-group">
          <label>Instrucción:</label>
          <textarea
            name="instruction"
            value={formData.instruction}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Agregar</button>
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePrompts;