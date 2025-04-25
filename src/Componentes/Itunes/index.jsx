import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './style.css';

function Itunes() {
  const { id } = useParams(); 
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://itunes.apple.com/lookup?id=${id}`)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.results.length > 0) {
          setData(responseData.results[0]);
        }
      })
      .catch(error => console.error("Error:", error));
  }, [id]);

  if (!data) return <p>Cargando canción...</p>;

  return (
    <div className="itunes-song">
      <img 
        src={data.artworkUrl100} 
        alt={data.trackName} 
        width="200"
      />
      <h2>{data.trackName}</h2>
      <p>Artista: {data.artistName}</p>
      <p>Álbum: {data.collectionName}</p>
      <p>Género: {data.primaryGenreName}</p>
      <p>Duración: {(data.trackTimeMillis / 60000).toFixed(2)} min</p>
      <audio controls src={data.previewUrl}>Tu navegador no soporta audio.</audio>
    </div>
  );
}

export default Itunes;
