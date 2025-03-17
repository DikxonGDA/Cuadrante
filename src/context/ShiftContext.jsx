import React, { createContext, useContext, useState, useEffect } from 'react';

const ShiftContext = createContext();

export const useShiftContext = () => useContext(ShiftContext);

export const ShiftProvider = ({ children }) => {
  const [shifts, setShifts] = useState(() => {
    const savedShifts = localStorage.getItem('shifts');
    return savedShifts ? JSON.parse(savedShifts) : {};
  });

  useEffect(() => {
    localStorage.setItem('shifts', JSON.stringify(shifts));
  }, [shifts]);

  const addShift = (date, shiftData) => {
    setShifts(prev => ({
      ...prev,
      [date]: shiftData
    }));
  };

  const removeShift = (date) => {
    setShifts(prev => {
      const newShifts = { ...prev };
      delete newShifts[date];
      return newShifts;
    });
  };

  const importShifts = (data) => {
    setShifts(data);
  };

  return (
    <ShiftContext.Provider value={{ shifts, addShift, removeShift, importShifts }}>
      {children}
    </ShiftContext.Provider>
  );
};