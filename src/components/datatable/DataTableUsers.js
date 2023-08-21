import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import axios from "../../axiosConfig";
import useFetch from "../../hooks/useFetch";
import "./datatableusers.css";

const DataTableUsers = () => {
  // Estado para almacenar la lista de usuarios
  const [list, setList] = useState([]);
  // Obtener datos y estado de carga usando el hook useFetch
  const { data, loading } = useFetch("http://localhost:3000/api/users");

  // Actualizar la lista cuando los datos cambien
  useEffect(() => {
    setList(data);
  }, [data]);

  // Manejar el botón de eliminar
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      // Actualizar la lista eliminando el usuario con el id correspondiente
      setList(prevList => prevList.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Manejar la búsqueda de usuarios
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredList = data.filter(item =>
      item.username.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm)
    );
    setList(filteredList);
  };

  // Definir las columnas para la tabla
  const columns = [
    {
      name: 'Username',
      selector: 'username',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Is Verify',
      selector: 'isVerify',
      sortable: true,
      // Mostrar 'Verificado' o 'Sin verificar' en función del valor
      cell: row => (row.isVerify ? 'Verificado' : 'Sin verificar'),
    },
    {
      name: 'Is Admin',
      selector: 'isAdmin',
      sortable: true,
      // Mostrar 'Administrador' o 'Usuario' en función del valor
      cell: row => (row.isAdmin ? 'Administrador' : 'Usuario'),
    },
    {
      name: 'Edit',
      // Celda con enlace de edición a la página de actualización
      cell: row => <Link to={`/update/${row._id}`} className="edit-link">Editar</Link>,
      button: true,
    },
    {
      name: 'Delete',
      // Celda con botón de eliminar
      cell: row => (
        <button className="delete-button" onClick={() => handleDelete(row._id)}>
          Eliminar
        </button>
      ),
      button: true,
    },
  ];

  return (
    <div className="datatable-users-container">
      <div className="datatable-users-header">
        {/* Título y enlace para agregar usuarios */}
        <h2>Tabla de Usuarios</h2>
        <Link to="/create" className="btn btn-primary">Agregar Usuarios</Link>
        {/* Barra de búsqueda */}
        <div className="search-container">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            name="search"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="datatable-users-table">
        {/* Mostrar mensaje de carga o la tabla */}
        {loading ? (
          <p>Cargando, por favor espera...</p>
        ) : (
          <DataTable columns={columns} data={list} pagination highlightOnHover />
        )}
      </div>
    </div>
  );
}

export default DataTableUsers;
