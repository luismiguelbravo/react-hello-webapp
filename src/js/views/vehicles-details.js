import React, {useState, useEffect}  from "react";
import "../../styles/character-details.css";

export const VehicleDetails = () => {

  const urlBase = "https://www.swapi.tech/api/vehicles/"
  const [vehicleDetails, setCharacterDetails] = useState()
  const [isFavorite, setIsFavorite] = useState(false)

  const fetchApi = async () => {

    const params = new URLSearchParams(location.search)
    const vehicleUid = params.get("vehicleUid");
    console.log("vehicleUid", params.get("vehicleUid"))

    if ( localStorage.getItem('vehicleUid' + vehicleUid) == null ) {
      const response = await fetch(urlBase + vehicleUid);
      const responseJson = await response.json()
      console.log("")
      console.log("vehicleDetails http", responseJson.result)
      console.log("")
      setCharacterDetails(responseJson.result);
      localStorage.setItem('vehicleUid' + vehicleUid, JSON.stringify(responseJson.result));
    } else {
      const localStorageCharacterDetails = JSON.parse(localStorage.getItem('vehicleUid' + vehicleUid));
      setCharacterDetails(localStorageCharacterDetails);
    }

    const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    if (favoriteList) {
      const favoritExist = favoriteList.filter( favorite => favorite.url === location.href.replace(location.origin, ""));
      setIsFavorite(favoritExist.length > 0)
    }
    else 
    {
      setIsFavorite(0)
    }

  }

  const removeFavorite = () => {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList.filter(favorite => favorite.url !== location.href.replace(location.origin, ""))))
    setIsFavorite(false)
    updateFavoriteCount();
  }

  const updateFavoriteCount = () => {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    document.getElementById("favorite-count").textContent = favoriteList.length;
  }

  const addFavorite = () => {
    console.log("addFavorite");
    if ( localStorage.getItem('favoriteList') == null ) {
      const favoriteList = [
        {
          name: vehicleDetails.properties.name,
          url: location.href.replace(location.origin, "").replace(location.origin, ""),
          image: imageUrl + vehicleDetails.uid + ".jpg"
        }
      ];
      localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
      setIsFavorite(true)
    } else {
      // verifico que el favorito ya este para no volver a agregarlo
      const favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
      console.log("entrando en el caso de que si existe la lista de favoritos")

      const favoritExist = favoriteList.filter( favorite => favorite.url === location.href.replace(location.origin, ""));
      if (favoritExist.length === 0 ) {
        favoriteList.push(
          {
            name: vehicleDetails.properties.name,
            url: location.href.replace(location.origin, "").replace(location.origin, ""),
            image: imageUrl + vehicleDetails.uid + ".jpg"
          }
        )
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
        setIsFavorite(true)
      }
    }
    updateFavoriteCount()
  }

  useEffect(() => {
    fetchApi()
  }, [])

  const imageUrl = "https://starwars-visualguide.com/assets/img/vehicles/";

	return (
    
    <div className='container mt-56'>
      {!vehicleDetails ? 'Cargando...':
     
     <div className="row">
        <div className="col-12 col-sm-6 col-md-6">
          <img className="character-detail-img" src={imageUrl + vehicleDetails.uid + ".jpg"}
            onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src="https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
            }}></img>
        </div>


        <div className="col-12 col-sm-6 col-md-6">
          <table className="table table-dark">
            <tbody>
            <tr>
                <th> name  </th>
                <td> {vehicleDetails.properties.name} </td>
              </tr>
              <tr>
                <th> model </th>
                <td> {vehicleDetails.properties.model} </td>
              </tr>
              <tr>
                <th> vehicle class </th>
                <td> {vehicleDetails.properties.vehicle_class} </td>
              </tr>
              <tr>
                <th> manufacturer </th>
                <td> {vehicleDetails.properties.manufacturer} </td>
              </tr>
              <tr>
                <th> cost in credits </th>
                <td> {vehicleDetails.properties.cost_in_credits} </td>
              </tr>
              <tr>
                <th> length  </th>
                <td> {vehicleDetails.properties.length} </td>
              </tr>
              <tr>
                <th> crew </th>
                <td> {vehicleDetails.properties.crew} </td>
              </tr>
              <tr>
                <th> passengers </th>
                <td> {vehicleDetails.properties.passengers} </td>
              </tr>
              <tr>
                <th> max atmosphering speedr </th>
                <td> {vehicleDetails.properties.max_atmosphering_speed} </td>
              </tr>
              <tr>
                <th> cargo capacity </th>
                <td> {vehicleDetails.properties.cargo_capacity} </td>
              </tr>
              <tr>
                <th> consumables </th>
                <td> {vehicleDetails.properties.consumables} </td>
              </tr>
              <tr>
                <th></th>
                <td>
                  {
                    !isFavorite ? 
                    <span className="add-favorite" onClick={addFavorite}>🤍</span> :
                    <span className="add-favorite" onClick={removeFavorite}>❤️</span>
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

