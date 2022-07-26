import React, {useState, useEffect}  from "react";
import "../../styles/character-details.css";
import planetNotFound from "../../img/planet-not-found.png"

export const PlanetDetails = () => {

  const urlBase = "https://www.swapi.tech/api/planets/"
  const [planetDetails, setPlanetDetails] = useState()


  const fetchApi = async () => {

    const params = new URLSearchParams(location.search)
    const planetUid = params.get("planetUid");
    console.log("planetUid", params.get("planetUid"))

    if ( localStorage.getItem('planetUid' + planetUid) == null ) {
      const response = await fetch(urlBase + planetUid);
      const responseJson = await response.json()
      console.log("")
      console.log("planetDetails http", responseJson.result)
      console.log("")
      setPlanetDetails(responseJson.result);
      localStorage.setItem('planetUid' + planetUid, JSON.stringify(responseJson.result));
    } else {
      const localStorageCharacterDetails = JSON.parse(localStorage.getItem('planetUid' + planetUid));
      setPlanetDetails(localStorageCharacterDetails);
    }

  }

  useEffect(() => {
    fetchApi()
  }, [])

  const imageUrl = "https://starwars-visualguide.com/assets/img/planets/";

	return (
    
    <div className='container mt-56'>
      {!planetDetails ? 'Cargando...':
     
     <div className="row">
        <div className="col-12 col-sm-6 col-md-6">
          <img className="character-detail-img" src={imageUrl + planetDetails.uid + ".jpg"}
            onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = planetNotFound;
            }}></img>
        </div>


        <div className="col-12 col-sm-6 col-md-6">
          <table className="table table-dark">
            <tbody>
            <tr>
                <th> name  </th>
                <td> {planetDetails.properties.name} </td>
              </tr>
              <tr>
                <th> diameter </th>
                <td> {planetDetails.properties.diameter} </td>
              </tr>
              <tr>
                <th> rotation period </th>
                <td> {planetDetails.properties.rotation_period} </td>
              </tr>
              <tr>
                <th> orbital period </th>
                <td> {planetDetails.properties.orbital_period} </td>
              </tr>
              <tr>
                <th> gravity </th>
                <td> {planetDetails.properties.gravity} </td>
              </tr>
              <tr>
                <th> population  </th>
                <td> {planetDetails.properties.population} </td>
              </tr>
              <tr>
                <th> climate </th>
                <td> {planetDetails.properties.climate} </td>
              </tr>
              <tr>
                <th> terrain </th>
                <td> {planetDetails.properties.terrain} </td>
              </tr>
              <tr>
                <th> surface water </th>
                <td> {planetDetails.properties.surface_water} </td>
              </tr>
              <tr>
                <th> description </th>
                <td> {planetDetails.description} </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      }
    </div>
    
  );
}; 

