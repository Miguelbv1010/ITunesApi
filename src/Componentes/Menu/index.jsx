import { useState } from 'react'
import { Link } from "react-router-dom";
import './style.css'

function Menu() {

  return (
    <nav className="c-menu">
    <Link to="/">Lista</Link>
    <Link to="/capturas">Capturas</Link>
    <Link to="/aleatorios">Aleatorios</Link>
    <Link to="/usuarios">Usuarios</Link>
    <Link to="/favoritos">Favoritos</Link>
  </nav>
    )
}

export default Menu