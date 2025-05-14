import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from "../../Contexto/AppContext";
import './style.css';

function Itunes() {
  const { trackId } = useParams(); // Asegúrate de que `trackId` es el parámetro en la URL
  const [cancion, setCancion] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);
  const navigate = useNavigate();
  
  // Comprobar si la canción es favorita
  const esFavorito = favoritos.some(p => p.trackId === cancion?.trackId);

  useEffect(() => {
    const fetchCancion = async () => {
      console.log("Track ID:", trackId); // Verifica el trackId
      try {
        const res = await fetch(`https://itunes.apple.com/lookup?id=${trackId}`);
        const json = await res.json();
        console.log("Respuesta de la API:", json); // Verifica la respuesta de la API
        if (json.results.length > 0) {
          setCancion(json.results[0]);
        } else {
          console.error("No se encontró la canción.");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCancion();
  }, [trackId]);

  if (!cancion) {
    return <p>Cargando canción...</p>;
  }

  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.trackId !== cancion.trackId));
    } else {
      setFavoritos([...favoritos, cancion]);
    }
  };

  return (
    <div className="c-detalle">
      <img
        src={cancion.artworkUrl100}
        alt={cancion.trackName}
        width="200"
        height="200"
      />
      <h2>{cancion.trackName || cancion.collectionName}</h2>
      <p>Artista: {cancion.artistName}</p>
      <p>Álbum: {cancion.collectionName}</p>
      <p>Género: {cancion.primaryGenreName}</p>
      <p>Precio: {cancion.trackPrice ? `$${cancion.trackPrice}` : 'No disponible'}</p>
      {cancion.previewUrl && (
        <audio controls src={cancion.previewUrl}>
          Tu navegador no soporta audio HTML5.
        </audio>
      )}

      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default Itunes;
