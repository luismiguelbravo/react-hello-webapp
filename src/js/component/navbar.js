import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";


export const Navbar = () => {
	return (
		<nav className="nav-bar">
			<Link className="no-decoration " to="/">
				<span className="navbar-brand mb-0">Home</span>
			</Link>
      <Link to="/characters">
				<span className="navbar-brand mb-1">characters</span>
			</Link>
		</nav>
	);
};
