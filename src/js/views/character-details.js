import React, { useEffect}  from "react";

export const CharacterDetails = () => {

  const fetchApi = async (url) => {
    console.log("url", url)
    const params = new URLSearchParams(location.search)
    console.log("characterUid", params.get("characterUid"))

  }

  useEffect(() => {
    fetchApi("uno dos")
  }, [])
	return (
    <div className='container'>
      CharacterDetails
    </div>
  );
}; 

