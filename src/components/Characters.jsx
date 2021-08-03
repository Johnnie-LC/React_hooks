import React, { useState, useEffect, useContext, useReducer } from 'react'
import '../assets/styles/components/Characters.css'
import ThemeContext from '../context/ThemeContext'

// para usar useReducer vamos a tener un estado inicial
const initialState = {
  favorite: [],
}

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      }
    default:
      return state
  }
}

const CharacterItems = ({ theme, characters, handleClick, hidden, title }) =>
  characters.length > 0 && (
    <>
      <h2
        style={{ color: `${theme ? 'black' : 'white'}` }}
        className={`${theme ? 'lightmode' : 'darkmode'}`}
      >
        {title}
      </h2>
      <div className={`Characters ${theme ? 'lightmode' : 'darkmode'}`}>
        {characters.map((character) => (
          <article className="Card-container" key={character.id}>
            <img
              className="Card-image"
              src={character.image}
              alt={character.name}
            />
            <h3 className="Card-name">{character.name}</h3>
            <button
              type="button"
              hidden={hidden}
              onClick={() => handleClick(character)}
            >
              add to Favorite
            </button>
          </article>
        ))}
      </div>
    </>
  )

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const { theme } = useContext(ThemeContext)
  // al useReducer se pasa el reducer y el initialState
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState)

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

  const handleClick = (favorite) => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
  }

  console.log('Favoritos: ', favorites.favorite)

  return (
    <>
      <CharacterItems
        theme={theme}
        characters={favorites.favorite}
        handleClick={handleClick}
        hidden={true}
        title="Favorites"
      />
      <CharacterItems
        theme={theme}
        characters={characters}
        handleClick={handleClick}
        hidden={false}
        title="Characters"
      />
    </>
  )
}

export default Characters
