import { useState, useEffect } from 'react'
import './style.css'

function Lista() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('beatles');

  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(busqueda)}&entity=song&limit=20`);
      const json = await res.json();
      setData(json.results);
    };

    if (busqueda.length >= 3) {
      obtenerDatos();
    }
  }, [busqueda]);

  return (
    <>
      <input
        type="text"
        placeholder="Buscar canción o artista"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <section className='c-lista'>
        {data.map((item, index) => (
          <div className='c-lista-pokemon' key={index}>
            <img
              src={item.artworkUrl100}
              alt={item.trackName}
              width='auto'
              height='60'
              loading='lazy'
            />
            <p><strong>{item.trackName}</strong><br />{item.artistName}</p>
            <audio controls src={item.previewUrl}></audio>
          </div>
        ))}
      </section>
    </>
  );
}

export default Lista;
