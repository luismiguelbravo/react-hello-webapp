import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

export const Vehicles = () => {
  const url = 'https://www.swapi.tech/api/vehicles?page=1&limit=100'
  const [vehicles, setVehicles] = useState()
  const fetchApi = async (url) => {
    if ( localStorage.getItem('vehiclesList') == null ) {
      const response = await fetch(url);
      const responseJson = await response.json()

      const orderList = responseJson.results.sort((a, b) => a.name.localeCompare(b.name))

      setVehicles(orderList);
      localStorage.setItem('vehiclesList', JSON.stringify(orderList));
    } else {
      const localStorageList = JSON.parse(localStorage.getItem('vehiclesList'));
      setVehicles(localStorageList);
    }
  }
  const filterByWord = (event) => {
    const localStorageList = JSON.parse(localStorage.getItem('vehiclesList'));
    setVehicles(
      localStorageList.filter(vehicle => vehicle.name.toUpperCase().includes(event.target.value.toUpperCase()))
    )
  }
  useEffect(() => {
    fetchApi(url)
  }, [])
	return (
    <div className='container'>
      <div className="row">
        <input className="search-box col-6" type="text" placeholder="search" onChange={filterByWord}></input>
      </div>
    
      <div className="row">
        {!vehicles ? 'Cargando...':
          vehicles.map(vehicle => {
            const imageUrl = "https://starwars-visualguide.com/assets/img/vehicles/" + vehicle.uid + ".jpg"
            return (
              <div className="col-6 col-sm-4 col-md-3" key={vehicle.uid}>
                <div className="character-thumbnails">
                  <Link className="no-decoration" to={"/vehicles-details?vehicleUid=" + vehicle.uid}   key={"link-" + vehicle.uid}>
                    <img className="character-img" src={imageUrl} onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src="https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
                    }}></img>
                    <div className="name">{vehicle.name}</div>
                  </Link>
                </div>
              </div>
            )
          })
        } 
      </div>
    </div>
  );
}; 

