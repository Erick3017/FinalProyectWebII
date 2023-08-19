import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from 'react-router-dom';
import axios from "../../axiosConfig";

const DataTableUsers = () => {
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch("http://localhost:3300/api/users");

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:3300/api/users/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) { }
  };

    const handelInput = (e) => {
    e.persist();
    // Filtrar los datos según el término de búsqueda
    const searchTerm = e.target.value.toLowerCase();
    const filteredList = data.filter(item => (
      item.username.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm)
    ));
    setList(filteredList);
  }

  const columns = [
    {
      name: 'Username',
      selector: 'username',
      sortable: true,
    },
    {
      name: 'Password',
      selector: 'password',
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
      cell: row => row.isVerify ? 'Verificado' : 'Sin verificar',
    },
    {
      name: 'Is Admin',
      selector: 'isAdmin',
      sortable: true,
      cell: row => row.isAdmin ? 'Administrador' : 'Usuario',
    },
    {
      name: 'Edit',
      cell: row => <Link to={`/update/${row._id}`}><button>Edit</button></Link>,
      button: true,
    },
    {
      name: 'Delete',
      cell: row => <button onClick={() => handleDelete(row._id)}>Delete</button>,
      button: true,
    },
  ];

  return (
    <div>
      {loading ? ("Loading please wait") : (
        <div>
          <div className="container">
            <h2>Table of users</h2>
            <Link to="/create"><button className="btn btn-primary">Add users</button></Link>
            <div className="mt-3">
              <input type="text" className="form-control" placeholder="Search.." name="search" onChange={handelInput} />
            </div>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={list}
              pagination
              highlightOnHover
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTableUsers;