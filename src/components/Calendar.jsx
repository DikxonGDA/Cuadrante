import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isSameMonth,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { useShiftContext } from '../context/ShiftContext';
import ShiftModal from './ShiftModal';
import { motion } from 'framer-motion';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { shifts } = useShiftContext();

  const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const getShiftColor = (shiftType) => {
    const colors = {
      'mañana': 'bg-blue-100 text-blue-800',
      'tarde': 'bg-indigo-100 text-indigo-800',
      'noche': 'bg-purple-100 text-purple-800',
      'mañana-noche': 'bg-violet-100 text-violet-800',
      'saliente': 'bg-yellow-100 text-yellow-800',
      'libre': 'bg-green-100 text-green-800',
      'asuntos-particulares': 'bg-orange-100 text-orange-800',
      'permiso': 'bg-red-100 text-red-800',
      'vacaciones': 'bg-teal-100 text-teal-800'
    };
    return colors[shiftType] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy', { locale: es })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
        
        {days.map((date) => {
          const dateKey = format(date, 'yyyy-MM-dd');
          const shift = shifts[dateKey];
          const isCurrentMonth = isSameMonth(date, currentDate);
          
          return (
            <motion.div
              key={dateKey}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-3 border rounded cursor-pointer
                ${isCurrentMonth ? '' : 'opacity-40'}
                ${shift ? getShiftColor(shift.shiftType) : 'hover:bg-gray-50'}
              `}
              onClick={() => handleDateClick(date)}
            >
              <div className="text-sm mb-1">{format(date, 'd')}</div>
              {shift && (
                <div className="text-xs font-bold text-center">
                  {shift.display}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {isModalOpen && (
        <ShiftModal
          date={selectedDate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Calendar;