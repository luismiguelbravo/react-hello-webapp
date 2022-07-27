import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/favorites.css";

export const Favorites = () => {

  const [favoriteList, setFavoriteList] = useState(false)

  const loadFavoriteList = () => {
    setFavoriteList(JSON.parse(localStorage.getItem('favoriteList')));
  }

  useEffect(() => {
    loadFavoriteList()
  }, [])

	return (
		<div className="container">

      <h1>Favorites</h1>

			<div className="row">
				{!favoriteList ? <div>empty</div> : favoriteList.map((favorite, index) => {
					return (
            <div className="col-6 col-sm-6 col-md-4 col-lg-3	" key={index}>
              <div className="favorite-thumbnails">
              <Link className="favorite-no-text-decoration" to={favorite.url}>
                  <div className="image-container">
                    <img className="favorite-image" src={favorite.image}></img>
                  </div>
                  <div className="favorite-name">{favorite.name}</div>
                </Link>
                <button className="remove-button btn btn-warning" onClick={() => actions.changeColor(index, "orange")}>
                  remove 🗑️
                </button>
              </div>
            </div>
					);
				})}
			</div>

		</div>
	);
};
