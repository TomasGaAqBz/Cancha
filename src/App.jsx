import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AgendaAdmin from './Pages/Agenda'; // Asegúrate de importar correctamente el componente
import LandingPage from './Pages/LandingPage'
import Players from './Pages/Players'
import Info from './Pages/Info'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<LandingPage/>} />

          <Route path='/jugadores' element={<Players/>}/>
          <Route path='/info' element={<Info/>}/>
          
          {/* Ruta de la Agenda */}
          <Route path="/agenda" element={<AgendaAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
