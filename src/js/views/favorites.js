import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Favorites = () => {

  const [favoriteList, setFavoriteList] = useState(false)

	const { store, actions } = useContext(Context);

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
        <div className="col-12 col-sm-6 col-md-6">
          <img className="character-detail-img" src={".jpg"}></img>
        </div>
        <div className="col-12 col-sm-6 col-md-6">

        </div>
      </div>


			<ul className="list-group">
				{!favoriteList ? <div>empty</div> : favoriteList.map((favorite, index) => {
					return (
						<li key={index} className="list-group-item d-flex justify-content-between">
              <Link to={favorite.url}>
                <span>{favorite.name}</span>
                <img className="character-detail-img" src={favorite.image}></img>
                <button className="btn btn-warning" onClick={() => actions.changeColor(index, "orange")}>
								remove 🗑️
							</button>
              </Link>
              
							
						</li>
					);
				})}
			</ul>

		</div>
	);
};
