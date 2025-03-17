import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaCalendarAlt, FaDatabase } from 'react-icons/fa';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cuadrante de Turnos</h1>
          <div className="flex gap-4">
            <Link to="/" className="flex items-center gap-2 hover:text-indigo-200">
              <FaCalendarAlt /> Calendario
            </Link>
            <Link to="/backup" className="flex items-center gap-2 hover:text-indigo-200">
              <FaDatabase /> Copias de Seguridad
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;