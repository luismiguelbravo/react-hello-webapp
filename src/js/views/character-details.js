import React, {useState, useEffect}  from "react";
import "../../styles/character-details.css";

export const CharacterDetails = () => {

  const urlBase = "https://www.swapi.tech/api/people/"
  const [characterDetails, setCharacterDetails] = useState()


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

            </tbody>
          </table>
        </div>
      </div>
      }
    </div>
    
  );
}; 

