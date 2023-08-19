import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link } from 'react-router-dom';
import axios from "../../../axiosConfig";
import "./promptstable.css";
import { useNavigate } from 'react-router-dom';

const DataTablePrompts = () => {
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch("http://localhost:3300/api/prompts");

  useEffect(() => {
    setList(data);
  }, [data]);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:3300/api/prompts/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) { }
  };
  
  const handelInput = (e) => {
    e.persist();
    // Filtrar los datos según el término de búsqueda
    const searchTerm = e.target.value.toLowerCase();
    const filteredList = data.filter(item => (
      item.name.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm)
    ));
    setList(filteredList);
  }



  return (
    <div>
      {loading ? ("Loading please wait") : (
        <div className='table-container'>
          <h2>Lista de Prompts</h2>
          <Link to="/create"><button className="btn btn-primary">Add propts</button></Link>
          <div className="mt-3">
            <input type="text" className="form-control" placeholder="Search.." name="search" onChange={handelInput} />
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th >Nombre</th>
                <th >Tipo</th>
                <th >Etiquetas</th>
                <th >Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((prompt) => (

                <tr key={prompt.id}>
                  <td>{prompt.name}</td>
                  <td>{prompt.type}</td>
                  <td>{prompt.tags.join(', ')}</td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(prompt._id)}>
                      Eliminar
                    </button>
                    <button className="execute-button" onClick={() => navigate(`/execute/${prompt._id}`) }>
                      Execute
                    </button>
                    <button className="edit-button" onClick={() => navigate(`/update/${prompt._id}`)}>
                      Edit
                    </button>
                    {/* Agrega aquí la lógica para editar prompts si es necesario */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataTablePrompts;