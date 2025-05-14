import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Contexto/AppContext';


function Favoritos() {
    const { favoritos } = useContext(AppContext); // Solo necesitamos favoritos aquí
    const navigate = useNavigate();

    return (
        <div className="favoritos-container">
            {favoritos.length === 0 ? (
                <p>No tienes favoritos guardados.</p>
            ) : (
                <div className="lista-favoritos">
                    {favoritos.map((item) => (
                        <div
                            key={item.trackId}
                            className="item-favorito"
                            onClick={() => navigate(`/itunes/${item.trackId}`)}
                        >
                            <img
                                src={item.artworkUrl100}
                                alt={item.trackName}
                                width="60"
                                height="60"
                                loading="lazy"
                            />
                            <p>{item.trackName}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favoritos;