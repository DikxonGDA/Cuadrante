import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useShiftContext } from '../context/ShiftContext';
import { motion } from 'framer-motion';

const BackupManager = () => {
  const { shifts, importShifts } = useShiftContext();

  const handleExport = () => {
    const dataStr = JSON.stringify(shifts);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `turnos-backup-${format(new Date(), 'yyyy-MM')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          importShifts(data);
          alert('Datos importados correctamente');
        } catch (error) {
          alert('Error al importar el archivo');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6"
    >
      <h2 className="text-2xl font-semibold mb-6">Gestión de Copias de Seguridad</h2>
      
      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Exportar Datos</h3>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Descargar Copia de Seguridad
          </button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Importar Datos</h3>
          <div className="flex flex-col gap-2">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            <p className="text-sm text-gray-500">
              Selecciona un archivo de copia de seguridad (.json)
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BackupManager;