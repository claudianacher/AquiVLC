import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { HoyPage } from './pages/HoyPage';
import { AgendaPage } from './pages/AgendaPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hoy" element={<HoyPage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        {/* Rutas para siguientes pantallas del diseño */}
        <Route path="/mapa" element={<HomePage />} />
        <Route path="/guardados" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
