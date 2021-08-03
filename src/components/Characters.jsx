import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useMemo,
} from 'react'
import '../assets/styles/components/Characters.css'
import ThemeContext from '../context/ThemeContext'
import CharacterItems from './CharacterItems'
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

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const { theme } = useContext(ThemeContext)
  const [search, setSearch] = useState('')
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

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleClick = (favorite) => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
  }

  // // filtrar los usuario
  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase())
  // })

  // usando Memo se opttmiza la buscqueda porque recuerda las busquedas pasadas,
  // el 1 parametro es para la logica y el 2 paramatro queremos que escuche en
  // los valores characters y search
  const filteredUsers = useMemo(
    () =>
      characters.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      ),
    [characters, search]
  )
  return (
    <>
      <CharacterItems
        theme={theme}
        characters={favorites.favorite}
        handleClick={handleClick}
        isHidden={true}
        title="Favorites"
      />
      <div className="Search">
        <input type="text" value={search} onChange={handleSearch} />
      </div>

      <CharacterItems
        theme={theme}
        characters={filteredUsers}
        handleClick={handleClick}
        isHidden={false}
        title="Characters"
      />
    </>
  )
}

export default Characters
