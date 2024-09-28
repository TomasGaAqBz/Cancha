import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Estado para controlar si el menú de usuario está abierto o cerrado
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    console.log('Cerrando sesión...')
    
  }

  // Función para alternar el menú de usuario
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  // Función para cerrar el menú de usuario si se hace clic fuera del área
  const closeUserMenu = () => {
    setIsUserMenuOpen(false)
  }

  // Función para alternar el menú móvil
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-gray-100 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg
                className="h-8 w-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l5 9h-10l5-9zM2 13h20l-10 9-10-9z" />
              </svg>
              <span className="ml-2 text-xl font-bold">Canchas Si!</span>
            </Link>
          </div>

          {/* Enlaces de navegación (desktop) */}
          <div className="hidden sm:flex sm:space-x-8">
            <Link to="/">
              <span className={`inline-flex items-center px-1 pt-1 border-b-2 text-xl font-medium ${
                location.pathname === '/canchas' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}>
                Ver Canchas
              </span>
            </Link>
            <Link to="/jugadores">
              <span className={`inline-flex items-center px-1 pt-1 border-b-2 text-xl font-medium ${
                location.pathname === '/jugadores' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}>
                Buscar Jugadores
              </span>
            </Link>
          </div>

          {/* Menú de usuario (desktop) */}
          <div className="hidden sm:flex sm:items-center relative">
            <button
              onClick={toggleUserMenu}
              className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"
            >
              <img
                className="h-8 w-8 rounded-full"
                src="https://github.com/shadcn.png"
                alt="Usuario"
              />
            </button>
            
            {/* Menú desplegable de usuario */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { navigate('/perfil'); closeUserMenu(); }}>
                  Editar Perfil
                </span>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { handleLogout(); closeUserMenu(); }}>
                  Cerrar Sesión
                </span>
              </div>
            )}
          </div>

          {/* Menú hamburguesa (móvil) */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/canchas" onClick={toggleMobileMenu}>
              <span className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/canchas' ? 'text-blue-500' : 'text-gray-700 hover:bg-gray-100'
              }`}>
                Ver Canchas
              </span>
            </Link>
            <Link to="/jugadores" onClick={toggleMobileMenu}>
              <span className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/jugadores' ? 'text-blue-500' : 'text-gray-700 hover:bg-gray-100'
              }`}>
                Buscar Jugadores
              </span>
            </Link>
            <Link to="/perfil" onClick={toggleMobileMenu}>
              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                Editar Perfil
              </span>
            </Link>
            <span
              onClick={() => { handleLogout(); toggleMobileMenu(); }}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Cerrar Sesión
            </span>
          </div>
        </div>
      )}
    </nav>
  )
}
