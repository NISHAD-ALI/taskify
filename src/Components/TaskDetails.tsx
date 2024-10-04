import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  taskTime: string;
  taskAssigneddTo: string;
  details: string;
}

const TaskDetails: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const handleTaskClick = (id: string) => {
    setExpandedTask(id === expandedTask ? null : id); 
  };
 const navigate = useNavigate()
  return (
    <div className="relative w-2/3 bg-white p-4 rounded-md shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-orange-500">Tasks</h2>
        <div
          className="text-white bg-orange-500 w-10 h-8 rounded-lg flex justify-center items-center cursor-pointer hover:bg-orange-700 transition duration-200"
          onClick={() => navigate('/manager/createTask')} 
        >
         <span className='text-lg font-bold'> +</span>
        </div>
      </div>

    
      {tasks.length === 0 ? (
        <p className="text-gray-700">No tasks assigned for this day.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="border-b pb-4">
              <div
                className="cursor-pointer p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white transition duration-300"
                onClick={() => handleTaskClick(task.id)}
              >
                {task.title} - {task.taskTime }
              </div>
              {expandedTask === task.id && (
                <div className="mt-2 text-sm text-gray-600 bg-gray-200 p-2 rounded-md">
                  <p>
                    <strong>Assigned to:</strong> {task.taskAssigneddTo}
                  </p>
                  <p>
                    <strong>Time:</strong> {task.taskTime}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskDetails;
