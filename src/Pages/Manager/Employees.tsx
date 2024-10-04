import React, { useEffect, useState } from 'react';
import { assignManger, getEmployeesByManagerStatus } from '../../Api/apis';
import Navbar from '../../Components/Nav';
import { toast } from 'react-hot-toast'
const EmployeesPage: React.FC = () => {
    const [employeesWithManager, setEmployeesWithManager] = useState([]);
    const [employeesWithoutManager, setEmployeesWithoutManager] = useState([]);

    // Fetch employees with and without a manager
    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await getEmployeesByManagerStatus();
                if (response.success) {
                    setEmployeesWithManager(response.data.withManager);
                    setEmployeesWithoutManager(response.data.withoutManager);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }
        fetchEmployees();
    }, []);

    // Accept employee (assign a manager)
    const handleAcceptEmployee = async (employeeId: string) => {
        try {
            const response = await assignManger(employeeId);
            if (response) {
                toast.success('Accepted successfully');
                setEmployeesWithoutManager(prev => prev.filter((emp:any) => emp._id !== employeeId));
            }
        } catch (error) {
            console.error('Error accepting employee:', error);
        }
    };

    return (
        <>
        <Navbar />
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Employees</h1>
            <div className="flex space-x-8">
                <div className="w-1/2">
                    <h2 className="text-xl font-semibold">Employees Managed By You</h2>
                    {employeesWithManager.length > 0 ? (
                        <ul>
                            {employeesWithManager.map((employee: any) => (
                                <li key={employee._id} className="p-2 bg-gray-100 my-2">
                                    <div>Name: {employee.name}</div>
                                    <div>Manager: {employee.manager?.name}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No employees under  manager.</p>
                    )}
                </div>

                <div className="w-1/2">
                    <h2 className="text-xl font-semibold">New Employees</h2>
                    {employeesWithoutManager.length > 0 ? (
                        <ul>
                            {employeesWithoutManager.map((employee: any) => (
                                <li key={employee._id} className="p-2 bg-gray-100 my-2 flex justify-between">
                                    <div>Name: {employee.name}</div>
                                    <button
                                        className="bg-orange-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleAcceptEmployee(employee._id)}
                                    >
                                        Accept
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No employees without a manager.</p>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default EmployeesPage;
