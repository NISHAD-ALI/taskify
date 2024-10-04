import React, { useEffect, useState } from 'react';
import CustomCalendar from '../../Components/Calender';
import TaskDetailsWithCheckbox from '../../Components/Employee/TaskWithDetails';
import { getTasksAssignedToEmployee } from '../../Api/apis';
import Nav from '../../Components/Employee/Nav';

interface Task {
  _id: string; 
  title: string;
  time: string;
  employeeName: string;
  details: string;
  done: boolean;
  startDate: string; 
}

const EmployeeHomePage: React.FC = () => {
  const [, setSelectedDate] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<{ [key: string]: Task[] }>({}); 

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await getTasksAssignedToEmployee();
        if (response && response.success) {
          const formattedTasks: { [key: string]: Task[] } = {};
   
          response.tasks.forEach((task: Task) => {
            const taskDate = new Date(task.startDate).toISOString().split('T')[0]; 
            if (!formattedTasks[taskDate]) {
              formattedTasks[taskDate] = [];
            }
            formattedTasks[taskDate].push(task); 
          });
          setAllTasks(formattedTasks); 
        } else {
          setAllTasks({}); 
        }
      } catch (error) {
        console.error("Error fetching tasks: ", error);
        setAllTasks({});
      }
    };

    fetchAllTasks();
  }, []);

  const handleDateClick = (date: Date) => {
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() + 1);

   
    const formattedDate = previousDate.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    
  
    const filteredTasks = allTasks[formattedDate] || []; 
    setTasks(filteredTasks);
  };

  const handleTaskToggle = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="h-screen bg-gray-100">
      <Nav/>
      <div className="flex p-6 space-x-6">
       
        <CustomCalendar onDateClick={handleDateClick} />

        <div className="w-2/3">
          <TaskDetailsWithCheckbox tasks={tasks as any} onTaskToggle={handleTaskToggle} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomePage;
