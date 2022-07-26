import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import planetNotFound from "../../img/planet-not-found.png"


export const Planets = () => {
  const url = 'https://www.swapi.tech/api/planets?page=1&limit=100'
  const [planets, setPlanets] = useState()
  const fetchApi = async (url) => {
    if ( localStorage.getItem('planetsList') == null ) {
      const response = await fetch(url);
      const responseJson = await response.json()

      const orderList = responseJson.results.sort((a, b) => a.name.localeCompare(b.name))

      setPlanets(orderList);
      localStorage.setItem('planetsList', JSON.stringify(orderList));
    } else {
      const localStorageList = JSON.parse(localStorage.getItem('planetsList'));
      setPlanets(localStorageList);
    }
  }
  const filterByWord = (event) => {
    const localStorageList = JSON.parse(localStorage.getItem('planetsList'));
    setPlanets(
      localStorageList.filter(planet => planet.name.toUpperCase().includes(event.target.value.toUpperCase()))
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
        {!planets ? 'Cargando...':
          planets.map(planet => {
            const imageUrl = "https://starwars-visualguide.com/assets/img/planets/" + planet.uid + ".jpg"
            return (
              <div className="col-6 col-sm-4 col-md-3" key={planet.uid}>
                <div className="character-thumbnails">
                  <Link className="no-decoration" to={"/planet-details?planetUid=" + planet.uid}   key={"link-" + planet.uid}>
                    <img className="character-img" src={imageUrl} onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = planetNotFound;
                    }}></img>
                    <div className="name">{planet.name}</div>
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

