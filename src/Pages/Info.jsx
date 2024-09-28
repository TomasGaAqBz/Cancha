import React, { useState } from 'react'
import Navbar from '../components/NavBar/NavBar'

// Datos simulados de la cancha
const canchaInfo = {
  id: 1,
  nombre: "Cancha El Goleador",
  descripcion: "Cancha de fútbol 5 con césped sintético de última generación. Iluminación LED y vestuarios equipados.",
  fotos: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  horarios: [
    { dia: "Lunes", horas: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
    { dia: "Martes", horas: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
    { dia: "Miércoles", horas: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
    { dia: "Jueves", horas: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
    { dia: "Viernes", horas: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"] },
    { dia: "Sábado", horas: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"] },
    { dia: "Domingo", horas: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"] },
  ],
  direccion: "Av. del Deporte 123, Ciudad Deportiva, CP 12345",
  googleMapsUrl: "https://maps.google.com/?q=Av.+del+Deporte+123,+Ciudad+Deportiva",
  precio: 50,
}

export default function InformacionReservaCancha() {
  const [diaSeleccionado, setDiaSeleccionado] = useState("")
  const [horaSeleccionada, setHoraSeleccionada] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleReserva = () => {
    if (diaSeleccionado && horaSeleccionada) {
      alert(`Reserva confirmada para el ${diaSeleccionado} a las ${horaSeleccionada}.`)
      setDialogOpen(false)
      setDiaSeleccionado("")
      setHoraSeleccionada("")
    }
  }

  return (
    <div className="container mx-auto p-4">
        <Navbar/>
      <h1 className="text-3xl font-bold mb-6">{canchaInfo.nombre}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sección de fotos */}
        <div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {canchaInfo.fotos.map((foto, index) => (
              <button key={index} className="border p-2 rounded-md">
                Foto {index + 1}
              </button>
            ))}
          </div>
          <img src={canchaInfo.fotos[0]} alt="Foto principal" className="w-full h-64 object-cover rounded-lg" />
        </div>

        {/* Información general */}
        <div className="border rounded-lg shadow p-4">
          <h3 className="text-xl font-semibold mb-2">Información General</h3>
          <p className="mb-4">{canchaInfo.descripcion}</p>
          <p className="flex items-center mb-2">
            <span className="mr-2">📍</span>
            {canchaInfo.direccion}
          </p>
          <button 
            className="w-full bg-blue-500 text-white py-2 rounded" 
            onClick={() => window.open(canchaInfo.googleMapsUrl, '_blank')}
          >
            Ver en Google Maps
          </button>
        </div>
      </div>

      {/* Horarios disponibles */}
      <div className="border rounded-lg shadow mb-8 p-4">
        <h3 className="text-xl font-semibold mb-4">Horarios Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {canchaInfo.horarios.map((horario) => (
            <div key={horario.dia} className="border p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{horario.dia}</h4>
              <div className="flex flex-wrap gap-2">
                {horario.horas.map((hora) => (
                  <span key={hora} className="border px-2 py-1 rounded text-sm">
                    {hora}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de reserva */}
      <div className="border rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Reserva</h3>
        <p className="text-2xl font-bold mb-4">${canchaInfo.precio}/hora</p>
        
        <button 
          className="w-full bg-blue-500 text-white py-2 rounded mb-4" 
          onClick={() => setDialogOpen(true)}
        >
          Reservar Ahora
        </button>

        {dialogOpen && (
          <div className="border rounded-lg shadow p-4">
            <h4 className="text-lg font-semibold mb-4">Reservar Cancha</h4>
            <div className='w-full flex flex-col' >
            <label>Nombre</label>
            <input type="text" className='h-10 my-4 rounderd-lg border px-2 ' />
            </div>
            
            <select 
              className="w-full border rounded mb-4 p-2"
              value={diaSeleccionado}
              onChange={(e) => setDiaSeleccionado(e.target.value)}
            >
              <option value="">Selecciona un día</option>
              {canchaInfo.horarios.map((horario) => (
                <option key={horario.dia} value={horario.dia}>{horario.dia}</option>
              ))}
            </select>
            {diaSeleccionado && (
              <select 
                className="w-full border rounded mb-4 p-2"
                value={horaSeleccionada}
                onChange={(e) => setHoraSeleccionada(e.target.value)}
              >
                <option value="">Selecciona una hora</option>
                {canchaInfo.horarios
                  .find((h) => h.dia === diaSeleccionado)
                  ?.horas.map((hora) => (
                    <option key={hora} value={hora}>{hora}</option>
                  ))}
              </select>
            )}
            <button 
              className="w-full bg-green-500 text-white py-2 rounded" 
              onClick={handleReserva}
              disabled={!diaSeleccionado || !horaSeleccionada}
            >
              Confirmar Reserva
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
