import React, {useState, useEffect} from "react";
import "../../styles/characters.css";
import { Link } from "react-router-dom";

export const Characters = () => {
  const url = 'https://www.swapi.tech/api/people?page=1&limit=100'
  const [people, setPeople] = useState()
  const fetchApi = async (url) => {
    if ( localStorage.getItem('charactersList') == null ) {
      const response = await fetch(url);
      const responseJson = await response.json()
      setPeople(responseJson.results);
      localStorage.setItem('charactersList', JSON.stringify(responseJson.results));
    } else {
      const localStorageList = JSON.parse(localStorage.getItem('charactersList'));
      setPeople(localStorageList);
    }
  }
  const filterByWord = (event) => {
    const localStorageList = JSON.parse(localStorage.getItem('charactersList'));
    setPeople(
      localStorageList.filter(character => character.name.toUpperCase().includes(event.target.value.toUpperCase()))
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
        {!people ? 'Cargando...':
          people.map(character => {
            const imageUrl = "https://starwars-visualguide.com/assets/img/characters/" + character.uid + ".jpg"
            return (
              <div className="col-6 col-sm-4 col-md-3" key={character.uid}>
                <div className="character-thumbnails">
                  <Link className="no-decoration" to={"/characters-details?characterUid=" + character.uid}   key={"link-" +character.uid}>
                    <img className="character-img" src={imageUrl}></img>
                    <div className="name">{character.name}</div>
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

