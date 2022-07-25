import React, {useState, useEffect} from "react";
import "../../styles/characters.css";

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
    <h1>BROWSE DATABANK</h1>
    <input type="text" placeholder="search" onChange={filterByWord}></input>
      <div className="row">
        {!people ? 'Cargando...':
          people.map(character => {
            const imageUrl = "https://starwars-visualguide.com/assets/img/characters/" + character.uid + ".jpg"
            return <div className="col-3" key={character.uid}>
              <img className="character-img" src={imageUrl}></img>
              <div className="name">{character.name}</div>
            </div>
          })
        } 
      </div>
    </div>
  );
}; 

