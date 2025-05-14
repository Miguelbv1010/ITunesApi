import { useContext } from 'react';
import Filtro from '../Filtro';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexto/AppContext"; // Asegúrate de que la ruta esté bien

import './style.css';

function Lista() {
  const { data, busqueda, setBusqueda, setTipoSeleccionado } = useContext(AppContext);
  const navigate = useNavigate();

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
