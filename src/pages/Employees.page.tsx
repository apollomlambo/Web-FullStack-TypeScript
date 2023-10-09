import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

// Define a type for an employee object
interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  telephoneNumber: string;
  emailAddress: string;
  employeeManager: string; // Assuming it's a string (e.g., manager's name or ID)
  status: string;
  // Add more properties as needed
}

function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]); // Specify the type as Employee[]

  useEffect(() => {
    // Fetch employee data from the API when the component mounts
    async function fetchEmployees() {
      try {
        const response = await axios.get('/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <Link href="/employee-create-edit">
        <a>Create New Employee</a>
      </Link>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Telephone Number</th>
            <th>Email Address</th>
            <th>Employee Manager</th>
            <th>Status</th>
            {/* Add more columns for additional properties */}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.telephoneNumber}</td>
              <td>{employee.emailAddress}</td>
              <td>{employee.employeeManager}</td>
              <td>{employee.status}</td>
              {/* Add more cells for additional properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesPage;