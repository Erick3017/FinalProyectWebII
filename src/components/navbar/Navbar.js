import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import "./navbar.css";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logo-link">
          <span className="logo">{user.username}</span>
        </Link>
        <div className="navItems">
          {user.isAdmin && (
            <Link to="/users" className="navLink">
              <button className="navButton">
                <span className="navButtonText">Usuarios</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
