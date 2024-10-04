import React from 'react';

interface Task {
  id: string;
  title: string;
  taskTime: string;
  employeeName: string;
  startDate: string;
  done: boolean;
}

const TaskDetailsWithCheckbox: React.FC<{
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
}> = ({ tasks, onTaskToggle }) => {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks assigned for this day.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-xl font-bold text-orange-500 mb-4">Assigned Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="border-b pb-4">
            <div className="flex justify-between items-center">
              <div>
                <span
                  className={`font-bold text-gray-800 ${
                    task.done ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.title}
                </span>
                <span className="block text-gray-500">{task.taskTime}</span>
                <span className="block text-sm text-gray-700">
                  {task.startDate}
                </span>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => onTaskToggle(task.id)}
                  className="ml-4 h-4 w-4"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDetailsWithCheckbox;
