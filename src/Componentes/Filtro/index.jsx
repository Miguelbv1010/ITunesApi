function Filtro({ onTipoChange }) {
    const tipos = [
      "All",
      "music",
      "movie",
      "podcast",
      "audiobook",
      "shortFilm",
      "tvShow",
      "software",
      "ebook"
    ];
  
    return (
      <div className="c-filtro">
        {tipos.map((unTipo, index) => (
          <button className="" key={index} onClick={() => onTipoChange(unTipo)}>
            {unTipo}
          </button>
        ))}
      </div>
    );
  }
  
  export default Filtro;
  