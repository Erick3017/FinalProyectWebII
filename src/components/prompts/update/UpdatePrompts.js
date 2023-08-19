import { Link, useNavigate, useParams} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useState,useEffect } from "react";
import axios from "axios";

const UpdatePrompts = () => {
    const navigate = useNavigate();
    const id = useParams().id;
    const { data, loading, error } = useFetch(
      `http://localhost:3300/api/prompts/?id=${id}`
    );
    const [prompt, setPrompt] = useState(data);
    useEffect(() => {
        setPrompt(data);
      }, [data]);    
      console.log(prompt);
    const updatePrompt = () => {
      const data = {
        name: prompt.name,
        credits: prompt.credits,
        teacher: prompt.teacher,
      };
      
      if (prompt.name !== "" && prompt.teacher !== "") {
        axios.put(`http://localhost:3300/api/prompts/${id}`, data);
      } else {
        alert("Not complete data");
      }
    };
  
    const handleInput = (e) => {
      e.persist();
      setPrompt({ ...prompt, [e.target.name]: e.target.value });
      console.log(prompt);
    };
    const handleCancel = () => {
        navigate("/");
  };
    return (
      <div className="App-header">
        {loading ? (
          "Loading teachers please wait"
        ) : (
          <div>
            <div>
              <h2>Edit Course</h2>
              <Link to="/">
                <button>Back</button>
              </Link>
            </div>
            <form onSubmit={updatePrompt}>
              <div>
                <label>Name of course</label>
                <input name="name" type="text" onChange={handleInput} />
              </div>
              <div>
                <label>Credits</label>
                <input name="credits" type="number" min="1" onChange={handleInput} />
              </div>
              <div>
                <label>List of tags</label>
                <select name="teacher" onChange={handleInput}>
                  {/* Aquí puedes renderizar las opciones para la lista de profesores si es necesario */}
                </select>
              </div>
              <div>
              <button type="button" onClick={handleCancel}></button>
                <button type="submit">Update Course</button>
                
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };
  

export default UpdatePrompts;