import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CustomCalendarProps {
  onDateClick: (date: Date) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ onDateClick }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateClick(date); 
  };

  return (
    <div className="w-1/3 bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-xl font-bold text-orange-500 mb-4">Calendar</h2>
      <Calendar
        onChange={handleDateChange as any}
        value={selectedDate}
        className="w-full text-center bg-gray-100 p-4 rounded-md"
      />
    </div>
  );
};

export default CustomCalendar;
