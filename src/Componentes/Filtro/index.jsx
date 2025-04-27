function Filtro({ onTipoChange }) {
  const tipos = [
    "All",
    "music",
    "movie",
    "podcast",
    "software",
    "ebook"
  ];

  return (
    <div className="c-filtro">
      {tipos.map((unTipo, index) => (
        <button className="c-filtro-boton" key={index} onClick={() => onTipoChange(unTipo)}>
          {unTipo.charAt(0).toUpperCase() + unTipo.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
