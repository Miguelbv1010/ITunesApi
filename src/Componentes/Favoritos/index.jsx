import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";
import Itunes from '../Itunes';

function Favoritos() {

  const { favoritos, setFavoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {favoritos.length === 0 ? (
        <p>No hay Pokémon favoritos aún.</p>
      ) : (
        <div className='c-lista'>
          {favoritos.map((pokemon, index) => (
          <div className='c-lista-itunes'
          onClick={() => navigate(`/Itunes/${Itunes.id}`)}
          key={index}>
            <img src={`https://itunes.apple.com/search?term=${encodeURIComponent(busqueda)}${tipo}&limit=30`} 
                  alt={`Itunes ${Itunes.nombre}`} width='auto' height='60' loading='lazy'
                />
            <p>{pokemon.nombre}</p>
          </div>
        ))}
        </div>
      )}
    </>
    )
  }
  
  export default Favoritos