import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useState, useEffect } from "react";
import "./executeprompts.css"

const ExecutePrompts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:3300/api/prompts/${id}`
  );
  const [prompt, setPrompt] = useState(data);
  const [response, setResponse] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);

  useEffect(() => {
    setPrompt(data);
  }, [data]);

  const handleRun = () => {
    setLoadingResponse(true);

    const apiKey = "TU_CLAVE_DE_API_DE_OPENAI"; // Reemplaza esto con tu clave de API de OpenAI
    const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt.context,
        max_tokens: 200, // Ajusta este valor para controlar la longitud de la respuesta
        temperature: 0.7, // Ajusta este valor para controlar la creatividad de la respuesta (0.0 a 1.0)
        n: 1, // Cantidad de respuestas a generar
        stop: ["\n"], // Define una condición de parada para la respuesta
      }),
    };

   
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{prompt.name}</h1>
      <h2>{prompt.type}</h2>
      <h2>Input</h2>
      <h2>{prompt.instruction}</h2>
      <h2>Instructions</h2>
      <h2>{prompt.context}</h2>
      <button onClick={handleRun} disabled={loadingResponse}>
        {loadingResponse ? "Running..." : "Run"}
      </button>
      <h2>Response</h2>
      <input
        name="response"
        type="text"
        value={response}
        onChange={(e) => setResponse(e.target.value)}
      />
      <button type="button" onClick={handleCancel}>
        Back
      </button>
    </div>
  );
};

export default ExecutePrompts;