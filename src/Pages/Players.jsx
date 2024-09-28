import React, { useState } from 'react'
import Navbar from '../components/NavBar/NavBar'

// Datos simulados de jugadores
const jugadores = [
  { id: 1, nombre: "Juan Pérez", calificacion: 8, disponible: true, horarios: [] },
  { id: 2, nombre: "María García", calificacion: 9, disponible: false, horarios: ["18:00", "20:00"] },
  { id: 3, nombre: "Carlos López", calificacion: 7, disponible: true, horarios: [] },
  { id: 4, nombre: "Ana Martínez", calificacion: 10, disponible: false, horarios: ["10:00", "14:00", "16:00"] },
  { id: 5, nombre: "Luis Rodríguez", calificacion: 6, disponible: true, horarios: [] },
]

export default function BuscadorJugadores() {
  const [busqueda, setBusqueda] = useState("")
  const [calificacionMinima, setCalificacionMinima] = useState(1)
  const [disponibilidad, setDisponibilidad] = useState("todos")

  const jugadoresFiltrados = jugadores.filter(jugador => 
    jugador.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    jugador.calificacion >= calificacionMinima &&
    (disponibilidad === "todos" || 
     (disponibilidad === "disponibles" && jugador.disponible) ||
     (disponibilidad === "no disponibles" && !jugador.disponible))
  )

  return (
    <div className="container mx-auto p-4">
        <Navbar/>
      <h1 className="text-3xl font-bold mb-6">Buscador de Jugadores</h1>

      {/* Filtros de búsqueda */}
      <div className="border rounded shadow mb-8 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Buscar jugador..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <select 
            onChange={(e) => setDisponibilidad(e.target.value)} 
            className="w-[200px] border rounded p-2"
          >
            <option value="todos">Todos los jugadores</option>
            <option value="disponibles">Disponibles ahora</option>
            <option value="no disponibles">No disponibles ahora</option>
          </select>
          <div className="w-full md:w-auto flex items-center space-x-2">
            <span>Calificación mínima: {calificacionMinima}</span>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="1" 
              value={calificacionMinima} 
              onChange={(e) => setCalificacionMinima(e.target.value)} 
              className="w-[200px]"
            />
          </div>
        </div>
      </div>

      {/* Lista de jugadores filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jugadoresFiltrados.map(jugador => (
          <div key={jugador.id} className="border rounded shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{jugador.nombre}</h3>
              <span className={`px-2 py-1 text-sm rounded ${jugador.disponible ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                {jugador.disponible ? "Disponible" : "No disponible"}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-yellow-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
              <span className="text-lg font-semibold">{jugador.calificacion}/10</span>
            </div>
            {!jugador.disponible && jugador.horarios.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Horarios disponibles:</h4>
                <div className="flex flex-wrap gap-2">
                  {jugador.horarios.map(horario => (
                    <span key={horario} className="border border-gray-300 px-2 py-1 rounded text-sm flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4"></path><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle></svg>
                      {horario}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <button className="w-full bg-blue-500 text-white py-2 rounded mt-4">
              Contactar
            </button>
            <button className="w-full bg-white border border-blue-500 text-blue-500 py-2 rounded mt-4">
              Ver Pefil
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
