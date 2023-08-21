import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../../axiosConfig";
import useFetch from "../../../hooks/useFetch";
import "./promptstable.css";

const DataTablePrompts = () => {
  // Estado para almacenar la lista de promps
  const [list, setList] = useState([]);
  // Obtener datos y estado de carga usando el hook useFetch
  const { data, loading } = useFetch("http://localhost:3000/api/prompts");
  // Hook de navegación para redirigir a otras páginas
  const navigate = useNavigate();

  // Actualizar la lista cuando los datos cambien
  useEffect(() => {
    setList(data);
  }, [data]);

  // Manejar el botón de eliminar
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/prompts/${id}`);
      // Actualizar la lista eliminando el prompt con el id correspondiente
      setList(prevList => prevList.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error deleting prompt:", err);
    }
  };

  // Manejar la búsqueda de prompts
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredList = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm)
    );
    setList(filteredList);
  };

  // Definir las columnas para la tabla
  const columns = [
    {
      name: 'Nombre',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Tipo',
      selector: 'type',
      sortable: true,
    },
    {
      name: 'Etiquetas',
      selector: 'tags',
      cell: row => row.tags.join(', '),
      sortable: false,
    },
    {
      name: 'Acciones',
      // Celdas con botones para ejecutar acciones en cada fila
      cell: row => (
        <div className="action-buttons">
          <button className="delete-button" onClick={() => handleDelete(row._id)}>
            Eliminar
          </button>
          <button className="execute-button" onClick={() => navigate(`/execute/${row._id}`)}>
            Ejecutar
          </button>
          <button className="edit-button" onClick={() => navigate(`/update/${row._id}`)}>
            Editar
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div className='table-container'>
      <h2>Lista de Prompts</h2>
      <div className="table-actions">
        {/* Enlace para agregar nuevos prompts */}
        <Link to="/create" className="btn btn-primary">Agregar Prompts</Link>
        {/* Entrada de búsqueda */}
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          name="search"
          onChange={handleSearch}
        />
      </div>
      {/* Mostrar mensaje de carga o la tabla */}
      {loading ? (
        <p>Cargando, por favor espera...</p>
      ) : (
        <DataTable columns={columns} data={list} pagination highlightOnHover />
      )}
    </div>
  );
}

export default DataTablePrompts;
