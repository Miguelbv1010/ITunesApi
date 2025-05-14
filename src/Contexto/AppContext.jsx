import { createContext, useState, useEffect } from 'react';

// 1. Creamos el contexto
export const AppContext = createContext();

// 2. Creamos el proveedor del contexto
export function AppProvider({ children }) {
    const [busqueda, setBusqueda] = useState('');
    const [favoritos, setFavoritos] = useState(
        JSON.parse(localStorage.getItem("favoritos")) || []
    );
    const [data, setData] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('All');
    const [listaCapturados, setListaCapturados] = useState(
        JSON.parse(localStorage.getItem("capturados")) || []
    );

    useEffect(() => {
        const obtenerDatos = async () => {
            if (busqueda.length >= 1) {
                const tipo = tipoSeleccionado !== 'All' ? `&media=${tipoSeleccionado}` : '';
                const res = await fetch(
                    `https://itunes.apple.com/search?term=${encodeURIComponent(busqueda)}${tipo}&limit=30`
                );
                const json = await res.json();
                setData(json.results);
            }
        };
        obtenerDatos();
    }, [tipoSeleccionado, busqueda]);

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }, [favoritos]);

    useEffect(() => {
        localStorage.setItem("capturados", JSON.stringify(listaCapturados));
    }, [listaCapturados]);

    return (
        <AppContext.Provider
            value={{
                busqueda, setBusqueda,
                favoritos, setFavoritos,
                data, setData,
                tipoSeleccionado, setTipoSeleccionado,
                listaCapturados, setListaCapturados,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
