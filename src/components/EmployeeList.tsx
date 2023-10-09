import React, { useEffect, useState } from 'react';
import axios from 'axios';
import mongoose from 'mongoose';

interface Employee {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  telephoneNumber: string;
  emailAddress: string;
  employeeManager: mongoose.Types.ObjectId | null;
  status: string;
  // Add more fields as needed
}

function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await axios.get('/api/employees');
        const employeesWithConvertedManager = response.data.map((employee: Employee) => ({
          ...employee,
          employeeManager: employee.employeeManager ? employee.employeeManager.toString() : '',
        }));
        setEmployees(employeesWithConvertedManager);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Telephone Number</th>
            <th>Email Address</th>
            <th>Employee Manager</th>
            <th>Status</th>
            {/* Add more columns for additional fields */}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: Employee) => (
            <tr key={employee._id.toString()}> {/* Convert ObjectId to string for the key */}
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.telephoneNumber}</td>
              <td>{employee.emailAddress}</td>
              <td>
                {employee.employeeManager !== null ? (
                  employee.employeeManager.toString() // Convert to string
                ) : (
                  'N/A' // Display 'N/A' when employeeManager is null
                )}
              </td>
              <td>{employee.status}</td>
              {/* Render additional fields here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;