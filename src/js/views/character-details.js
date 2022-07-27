import React, {useState, useEffect}  from "react";
import "../../styles/character-details.css";

export const CharacterDetails = () => {

  const urlBase = "https://www.swapi.tech/api/people/"
  const [characterDetails, setCharacterDetails] = useState()
  const [isFavorite, setIsFavorite] = useState(false)

  const fetchApi = async () => {

    const params = new URLSearchParams(location.search)
    const characterUid = params.get("characterUid");
    console.log("characterUid", params.get("characterUid"))

    if ( localStorage.getItem('characterUid' + characterUid) == null ) {
      const response = await fetch(urlBase + characterUid);
      const responseJson = await response.json()
      console.log("")
      console.log("CharacterDetails http", responseJson.result)
      console.log("")
      setCharacterDetails(responseJson.result);
      localStorage.setItem('characterUid' + characterUid, JSON.stringify(responseJson.result));
    } else {
      const localStorageCharacterDetails = JSON.parse(localStorage.getItem('characterUid' + characterUid));
      setCharacterDetails(localStorageCharacterDetails);
    }

    const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    const favoritExist = favoriteList.filter( favorite => favorite.url === location.href);
    setIsFavorite(favoritExist.length > 0)

  }

  const addFavorite = () => {
    console.log("addFavorite");
    if ( localStorage.getItem('favoriteList') == null ) {
      const favoriteList = [
        {
          name: characterDetails.properties.name,
          url: location.href
        }
      ];
      localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
      setIsFavorite(true)
    } else {
      // verifico que el favorito ya este para no volver a agregarlo
      const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
      console.log("entrando en el caso de que si existe la lista de favoritos")

      const favoritExist = favoriteList.filter( favorite => favorite.url === location.href);
      if (favoritExist.length === 0 ) {
        favoriteList.push(
          {
            name: characterDetails.properties.name,
            url: location.href
          }
        )
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
        setIsFavorite(true)
      }
    }
  }

  const removeFavorite = () => {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList.filter(favorite => favorite.url !== location.href)))
    setIsFavorite(false)
  }

  

  useEffect(() => {
    fetchApi()
  }, [])

  const imageUrl = "https://starwars-visualguide.com/assets/img/characters/";

	return (
    
    <div className='container mt-56'>
      {!characterDetails ? 'Cargando...':
     
     <div className="row">
        <div className="col-12 col-sm-6 col-md-6">
          <img className="character-detail-img" src={imageUrl + characterDetails.uid + ".jpg"}></img>
        </div>

        <div className="col-12 col-sm-6 col-md-6">
          <table className="table table-dark">
            <tbody>
            <tr>
                <th> name  </th>
                <td> {characterDetails.properties.name} </td>
              </tr>
              <tr>
                <th> description </th>
                <td> {characterDetails.description} </td>
              </tr>
              <tr>
                <th> height </th>
                <td> {characterDetails.properties.height} </td>
              </tr>
              <tr>
                <th> mass </th>
                <td> {characterDetails.properties.mass} </td>
              </tr>
              <tr>
                <th> hair color  </th>
                <td> {characterDetails.properties.hair_color} </td>
              </tr>
              <tr>
                <th> skin color </th>
                <td> {characterDetails.properties.skin_color} </td>
              </tr>
              <tr>
                <th> eye color </th>
                <td> {characterDetails.properties.eye_color} </td>
              </tr>
              <tr>
                <th> birth year </th>
                <td> {characterDetails.properties.birth_year} </td>
              </tr>
              <tr>
                <th> gender </th>
                <td> {characterDetails.properties.gender} </td>
              </tr>
              <tr>
                <th></th>
                <td>
                  {
                    !isFavorite ? 
                    <span className="add-favorite" onClick={addFavorite}>🤍</span> :
                    <span className="add-favorite" onClick={removeFavorite}>💝</span>
                  }
                </td>
              </tr>


            </tbody>
          </table>
        </div>
      </div>
      }
    </div>
    
  );
}; 

