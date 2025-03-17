import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Calendar from './components/Calendar';
import BackupManager from './components/BackupManager';
import { ShiftProvider } from './context/ShiftContext';
import './App.css';

function App() {
  return (
    <ShiftProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Calendar />} />
            <Route path="backup" element={<BackupManager />} />
          </Route>
        </Routes>
      </Router>
    </ShiftProvider>
  );
}

export default App;