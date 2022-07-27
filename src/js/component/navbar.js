import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";


export const Navbar = () => {

  const calculeFavorites = () => {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    document.getElementById("favorite-count").textContent = favoriteList ? favoriteList.length : 0;
  }

  useEffect(() => {
    calculeFavorites()
  }, [])

	return (
    <nav className="navbar navbar-light bg-light mb-3">
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

        <div className="ml-auto">
          <Link to="/favorites">
            <button className="btn btn-primary">Favorites <span id="favorite-count"> 0 </span></button>
          </Link>
        </div>

      </div>

    </nav>
	);
};
