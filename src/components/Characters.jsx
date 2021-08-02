import React, { useState, useEffect } from 'react'
import '../assets/styles/components/Characters.css'

const Characters = () => {
  const [characters, setCharacters] = useState([])
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))

    //   // Usando async Await
    // async function fetchData() {
    //   const response = await fetch('https://rickandmortyapi.com/api/character')
    //   const data = await response.json()
    //   const results = await data.results

    //   setCharacters(results)
    // }
    // fetchData()
  }, [])

  return (
    <div className="Characters">
      {characters.map((character) => (
        <article className="Card-container" key={character.id}>
          <img
            className="Card-image"
            src={character.image}
            alt={character.name}
          />
          <h2 className="Card-name">{character.name}</h2>
        </article>
      ))}
    </div>
  )
}

export default Characters
