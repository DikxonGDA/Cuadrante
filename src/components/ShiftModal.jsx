import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useShiftContext } from '../context/ShiftContext';
import { motion } from 'framer-motion';

const SHIFT_TYPES = [
  { value: 'mañana', label: 'MAÑANA', display: 'M' },
  { value: 'tarde', label: 'TARDE', display: 'T' },
  { value: 'noche', label: 'NOCHE', display: 'N' },
  { value: 'mañana-noche', label: 'MAÑANA/NOCHE', display: 'M/N' },
  { value: 'saliente', label: 'SALIENTE', display: 'S' },
  { value: 'libre', label: 'LIBRE', display: 'L' },
  { value: 'asuntos-particulares', label: 'ASUNTOS PARTICULARES', display: 'AP' },
  { value: 'permiso', label: 'PERMISO', display: 'P' },
  { value: 'vacaciones', label: 'VACACIONES', display: 'V' },
];

const ShiftModal = ({ date, onClose }) => {
  const { shifts, addShift, removeShift } = useShiftContext();
  const dateKey = format(date, 'yyyy-MM-dd');
  const currentShift = shifts[dateKey];

  const [formData, setFormData] = useState({
    shiftType: currentShift?.shiftType || 'mañana',
    notes: currentShift?.notes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const shiftType = SHIFT_TYPES.find(type => type.value === formData.shiftType);
    addShift(dateKey, {
      ...formData,
      display: shiftType.display
    });
    onClose();
  };

  const handleDelete = () => {
    removeShift(dateKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      >
        <h2 className="text-xl font-semibold mb-4">
          Turno para {format(date, "d 'de' MMMM, yyyy", { locale: es })}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Turno</label>
            <select
              value={formData.shiftType}
              onChange={(e) => setFormData({...formData, shiftType: e.target.value})}
              className="w-full p-2 border rounded"
            >
              {SHIFT_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notas</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Notas adicionales (opcional)"
            />
          </div>

          <div className="flex justify-end gap-2">
            {currentShift && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ShiftModal;