import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useState, useEffect } from "react";
import "./updateprompts.css";
import axios from "axios";

const UpdatePrompts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/prompts/${id}`
  );
  const [prompt, setPrompt] = useState(data);

  useEffect(() => {
    setPrompt(data);
  }, [data]);

  const updatePrompt = async () => {
    try {
      await axios.put(`http://localhost:3000/api/prompts/${id}`, prompt);
      navigate("/");
    } catch (err) {
      console.error("Error updating prompt:", err);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPrompt((prevPrompt) => ({ ...prevPrompt, [name]: value }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="App-header">
      {loading ? (
        "Loading prompt details, please wait..."
      ) : (
        <div>
          <div>
            <h2>Edit Prompt</h2>
            <Link to="/">
              <button>Back</button>
            </Link>
          </div>
          <form onSubmit={updatePrompt}>
            <div>
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={prompt.name}
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Type</label>
              <select
                name="type"
                value={prompt.type}
                onChange={handleInput}
              >
                <option value="edit">Edit</option>
                <option value="image">Image</option>
                <option value="completions">Completions</option>
              </select>
            </div>
            <div>
              <label>Instruction</label>
              <input
                name="instruction"
                type="text"
                value={prompt.instruction}
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Context</label>
              <input
                name="context"
                type="text"
                value={prompt.context}
                onChange={handleInput}
              />
            </div>
            <div>
              <label>Size</label>
              <input
                name="size"
                type="text"
                value={prompt.size}
                onChange={handleInput}
              />
            </div>
            <div>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit">Update Prompt</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePrompts;
