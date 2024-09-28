import React, { useState } from 'react'

// Simulación de datos de reservas
const initialReservas = [
  { id: 1, dia: 'Lunes', hora: '10:00', cliente: 'Juan Pérez' },
  { id: 2, dia: 'Martes', hora: '18:00', cliente: 'María García' },
  { id: 3, dia: 'Miércoles', hora: '20:00', cliente: 'Carlos López' },
]

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const horasDisponibles = Array.from({ length: 15 }, (_, i) => `${i + 9}:00`)

export default function AgendaAdmin() {
  const [reservas, setReservas] = useState(initialReservas)
  const [diaSeleccionado, setDiaSeleccionado] = useState('')
  const [horaSeleccionada, setHoraSeleccionada] = useState('')

  const agregarReserva = () => {
    if (diaSeleccionado && horaSeleccionada) {
      const nuevaReserva = {
        id: reservas.length + 1,
        dia: diaSeleccionado,
        hora: horaSeleccionada,
        cliente: 'Cliente Nuevo'
      }
      setReservas([...reservas, nuevaReserva])
      setDiaSeleccionado('')
      setHoraSeleccionada('')
    }
  }

  const eliminarReserva = (id) => {
    setReservas(reservas.filter(reserva => reserva.id !== id))
  }

  const estaOcupado = (dia, hora) => {
    return reservas.some(reserva => reserva.dia === dia && reserva.hora === hora)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Agenda de Cancha</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
        {diasSemana.map(dia => (
          <div key={dia} className="border rounded-lg shadow">
            <div className="bg-gray-200 text-center p-2">
              <h2 className="text-xl">{dia}</h2>
            </div>
            <div className="p-4">
              {horasDisponibles.map(hora => (
                <div 
                  key={`${dia}-${hora}`} 
                  className={`p-2 mb-2 rounded-md text-center cursor-pointer ${
                    estaOcupado(dia, hora) ? 'bg-red-200' : 'bg-green-200'
                  }`}
                >
                  {hora}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-lg shadow mb-8">
        <div className="bg-gray-200 p-4">
          <h2 className="text-xl">Agregar Nueva Reserva</h2>
        </div>
        <div className="p-4 flex space-x-4">
          <select 
            value={diaSeleccionado} 
            onChange={(e) => setDiaSeleccionado(e.target.value)} 
            className="border rounded p-2 w-48"
          >
            <option value="">Seleccionar día</option>
            {diasSemana.map(dia => (
              <option key={dia} value={dia}>{dia}</option>
            ))}
          </select>
          <select 
            value={horaSeleccionada} 
            onChange={(e) => setHoraSeleccionada(e.target.value)} 
            className="border rounded p-2 w-48"
          >
            <option value="">Seleccionar hora</option>
            {horasDisponibles.map(hora => (
              <option key={hora} value={hora}>{hora}</option>
            ))}
          </select>
          <button 
            onClick={agregarReserva} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar Reserva
          </button>
        </div>
      </div>

      <div className="border rounded-lg shadow">
        <div className="bg-gray-200 p-4">
          <h2 className="text-xl">Reservas Actuales</h2>
        </div>
        <div className="p-4">
          {reservas.map(reserva => (
            <div key={reserva.id} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-md">
              <span>{reserva.dia} - {reserva.hora} - {reserva.cliente}</span>
              <button 
                onClick={() => eliminarReserva(reserva.id)} 
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
