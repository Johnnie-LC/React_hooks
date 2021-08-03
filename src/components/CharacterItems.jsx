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

export default CharacterItems
