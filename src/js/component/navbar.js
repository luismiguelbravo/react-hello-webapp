import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";


export const Navbar = () => {
	return (
    <nav className="nav-bar">
      <div className='container'>
        <Link className="no-decoration" to="/">
          <span className="navbar-brand mb-0">Home</span>
        </Link>
        <Link className="no-decoration" to="/characters">
          <span className="navbar-brand mb-1">Characters</span>
        </Link>
        <Link className="no-decoration" to="/vehicles">
          <span className="navbar-brand mb-1">Vehicles</span>
        </Link>
        <Link className="no-decoration" to="/planets">
          <span className="navbar-brand mb-1">Planets</span>
        </Link>
      </div>

    </nav>
	);
};
