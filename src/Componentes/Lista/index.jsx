import { useState, useEffect } from 'react';
import Filtro from '../Filtro';
import { useNavigate } from "react-router-dom";
import './style.css';

function Lista() {
  const [data, setData] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('All');
  const [busqueda, setBusqueda] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      if (busqueda.length >= 1) {
        const tipo = tipoSeleccionado !== 'All' ? `&media=${tipoSeleccionado}` : '';
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(busqueda)}${tipo}&limit=30`);
        const json = await res.json();
        setData(json.results);
      }
    };

    obtenerDatos();
  }, [tipoSeleccionado, busqueda]);

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Buscar música, películas..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />
      <Filtro onTipoChange={handleTipoChange} />
      <section className='c-lista'>
        {data.map((item, index) => (
          <div
            className='c-lista-item'
            key={index}
            onClick={() => navigate(`/Itunes/${item.trackId}`)}
          >
            <img 
              src={item.artworkUrl100}
              alt={item.trackName}
              width='100'
              height='100'
              loading='lazy'
            />
            <p>{item.trackName || item.collectionName}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Lista;
