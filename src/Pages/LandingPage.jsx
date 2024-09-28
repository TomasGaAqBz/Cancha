import React, { useState } from 'react'
import imagen from './../assets/CanchaA.jfif'
import Navbar from '../components/NavBar/NavBar'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Datos simulados de canchas
const canchas = [
  { id: 1, nombre: "Cancha El Goleador", precio: 50, horarios: ["10:00", "12:00", "14:00", "16:00"] },
  { id: 2, nombre: "Cancha B", precio: 60, horarios: ["11:00", "13:00", "15:00", "17:00"] },
  { id: 3, nombre: "Cancha C", precio: 55, horarios: ["09:00", "11:00", "13:00", "15:00"] },
  { id: 4, nombre: "Cancha D", precio: 70, horarios: ["12:00", "14:00", "16:00", "18:00"] },
]

// Datos simulados de ofertas
const ofertas = [
  { id: 1, titulo: "¡50% de descuento en horarios nocturnos!", imagen: "imagen" },
  { id: 2, titulo: "2x1 en reservas de fin de semana", imagen: "imagen" },
  { id: 3, titulo: "Reserva 5 horas y obtén 1 gratis", imagen: "imagen" },
]

export default function PaginaInicio() {
  const [busqueda, setBusqueda] = useState("")
  const [horarioFiltro, setHorarioFiltro] = useState("")
  const [precioMaximo, setPrecioMaximo] = useState(100)

  const canchasFiltradas = canchas.filter(cancha => 
    cancha.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (horarioFiltro === "" || cancha.horarios.includes(horarioFiltro)) &&
    cancha.precio <= precioMaximo
  )

  return (
    <div className="container mx-auto p-4">
      <Navbar/>
      <h1 className="text-3xl font-bold mb-6">Reserva tu Cancha</h1>

      {/* Banners de ofertas */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ofertas Especiales</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {ofertas.map(oferta => (
            <div key={oferta.id} className="flex-shrink-0 w-[300px] border rounded shadow">
              <img src={imagen} alt={oferta.titulo} className="w-full h-[150px] object-cover" />
              <div className="p-4">
                <p className="font-semibold">{oferta.titulo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buscador y filtros */}
      <div className="border rounded shadow mb-8 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Buscar cancha..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <select 
            onChange={(e) => setHorarioFiltro(e.target.value)} 
            className="w-[180px] border rounded p-2"
          >
            <option value="">Filtrar por horario</option>
            {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map(hora => (
              <option key={hora} value={hora}>{hora}</option>
            ))}
          </select>
          <div className="w-full md:w-auto flex items-center space-x-2">
            <span>Precio máximo: ${precioMaximo}</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="5" 
              value={precioMaximo} 
              onChange={(e) => setPrecioMaximo(e.target.value)} 
              className="w-[200px]"
            />
          </div>
        </div>
      </div>

      {/* Lista de canchas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {canchasFiltradas.map(cancha => (
          <div key={cancha.id} className="border rounded shadow p-4">
            <h3 className="text-xl font-semibold">{cancha.nombre}</h3>
            <p className="text-2xl font-bold mb-2">${cancha.precio}/hora</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {cancha.horarios.map(horario => (
                <span key={horario} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {horario}
                </span>
              ))}
            </div>
            <Link to='/info'>
            <button className="w-full bg-blue-500 text-white py-2 rounded">
              Reservar
            </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
