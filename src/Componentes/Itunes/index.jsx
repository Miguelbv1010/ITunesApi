import { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../contexto/contexto';
import './style.css';

function Itunes() {
  const { name } = useParams(); 
  const [cancion, setCancion] = useState(null);
   const { favoritos, setFavoritos } = useContext(AppContext);
  const esFavorito = favoritos.some(p => p.id === datapoke.id);

  useEffect(() => {
    const fetchCancion = async () => {
      try {
        const res = await fetch(`https://itunes.apple.com/lookup?id=${name}`);
        const json = await res.json();
        setCancion(json.results[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCancion();
  }, [name]);

  if (!cancion) return <p>Cargando canción...</p>;

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
