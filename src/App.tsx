import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Rutas preparadas para las siguientes pantallas del diseño */}
        <Route path="/hoy" element={<HomePage />} />
        <Route path="/agenda" element={<HomePage />} />
        <Route path="/mapa" element={<HomePage />} />
        <Route path="/guardados" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
