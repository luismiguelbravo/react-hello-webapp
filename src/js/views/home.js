import React, {useState, useEffect} from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {

  const url = 'https://www.swapi.tech/api/people/'
  const [people, setPeople] = useState()
  const [totalPages, setTotalPages] = useState(0)
  const [paginator, setPaginator] = useState()


  const fetchApi = async (url) => {
    setPeople(null)
    const response = await fetch(url);
    const responseJson = await response.json()
    console.log('responseJson', responseJson)
    setPeople(responseJson.results);
    setTotalPages(responseJson.total_pages);

    console.log("");
    console.log("response.total_pages", responseJson.total_pages)
    console.log("");

    const pages = []
    for (let index = 0; index < responseJson.total_pages; index++) {
      pages.push(
        <span
          onClick={event => fetchApi("https://www.swapi.tech/api/people?page=" + (index+1) +"&limit=10")}
          key={index+1}
          className="page-index">
          {index+1}
        </span>
      )
    }
    setPaginator(pages);
  }

  useEffect(() => {
    fetchApi(url)
  }, [])


	return (
    <div className='container'>
    <h1>BROWSE DATABANK</h1>
      <ul>
        {!people ? 'Cargando...':
          people.map(character => {
            return <li key={character.uid}>{character.name}</li>
          })
        } 
      </ul>
      
      <div>
        {paginator}
      </div>

    </div>
  );
}; 

