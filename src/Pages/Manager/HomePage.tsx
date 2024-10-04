import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Nav';
import CustomCalendar from '../../Components/Calender';
import TaskDetails from '../../Components/TaskDetails';
import { getTasks } from '../../Api/apis';

const HomePage: React.FC = () => {
  const [, setSelectedDate] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [allTasks, setAllTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await getTasks(); 
        console.log(response)
        setAllTasks(response || []); 
      } catch (error) {
        console.error("Error fetching tasks: ", error);
        setAllTasks([]); 
      }
    };

    fetchAllTasks();
  }, []);

  const handleDateClick = (date: Date) => {
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() + 1);
  
    const formattedDate = previousDate.toISOString().split('T')[0]; 
    setSelectedDate(formattedDate);
    const filteredTasks = allTasks.filter((task) => task.startDate === formattedDate);
    setTasks(filteredTasks);
  };
  

  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      <div className="flex p-6 space-x-6">
        <CustomCalendar onDateClick={handleDateClick} />
        <TaskDetails tasks={tasks} />
      </div>
    </div>
  );
};

export default HomePage;
