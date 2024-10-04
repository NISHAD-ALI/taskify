import React, { useState, useEffect } from 'react';
import { createTask, getEmployeesUnderManager } from '../../Api/apis';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


const TaskCreationForm = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const [assignee, setAssignee] = useState('');
    const [employees, setEmployees] = useState<string[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                let res = await getEmployeesUnderManager()
                console.log(res)
                setEmployees(res?.employeeNames);
            } catch (error: any) {
                console.log(error.message)
            }
        };

        fetchEmployees();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const taskData = {
                taskName,
                taskDate,
                taskTime,
                assignee
            };

            console.log(taskData);
            const res = await createTask(taskData)
            if (res?.data.success) {
                toast.success('Task Created successfully');
                setTimeout(() => {
                    navigate('/manager/home')
                }, 1000)
            }
        } catch (error: any) {
            console.log(error.message + '1')
        }

    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Create a New Task</h2>
            <form onSubmit={handleSubmit}>
    
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Task Name:</label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        placeholder="Enter task name"
                        required
                    />
                </div>

           
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
                    <input
                        type="date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>

           
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
                    <input
                        type="time"
                        value={taskTime}
                        onChange={(e) => setTaskTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>


                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Assign to:</label>
                    <select
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        required
                    >
                        <option value="">-- Select Employee --</option>
                        {employees.map((employee, index) => (
                            <option key={index} value={employee}>
                                {employee}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default TaskCreationForm;
