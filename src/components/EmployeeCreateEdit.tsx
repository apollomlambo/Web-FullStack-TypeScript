import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeCreateEdit() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    telephoneNumber: '',
    emailAddress: '',
    employeeManager: '', // Assuming you will input the manager's ID here
    status: '',
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Check if there's an employee ID in the URL (indicating edit mode)
    const url = window.location.href;
    const employeeIdMatch = url.match(/\/employees\/([^/]+)/);

    if (employeeIdMatch) {
      setIsEdit(true);
      const employeeId = employeeIdMatch[1];
      // Fetch employee data for editing
      axios.get(`/api/employees/${employeeId}`)
        .then((response) => {
          const { firstName, lastName, telephoneNumber, emailAddress, employeeManager, status } = response.data;
          setFormData({
            firstName,
            lastName,
            telephoneNumber,
            emailAddress,
            employeeManager,
            status,
          });
        })
        .catch((error) => {
          console.error('Error fetching employee data for edit:', error);
        });
    }
  }, []);

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (isEdit) {
      // Perform update/edit API request with formData
      const match = window.location.href.match(/\/employees\/([^/]+)/);
      const employeeId = match ? match[1] : null;
      axios.put(`/api/employees/${employeeId}`, formData)
        .then((response) => {
          // Handle successful update
          console.log('Employee updated:', response.data);
        })
        .catch((error) => {
          console.error('Error updating employee:', error);
        });
    } else {
      // Perform create/add API request with formData
      axios.post('/api/employees', formData)
        .then((response) => {
          // Handle successful creation
          console.log('Employee created:', response.data);
        })
        .catch((error) => {
          console.error('Error creating employee:', error);
        });
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit Employee' : 'Create Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="telephoneNumber">Telephone Number:</label>
          <input
            type="text"
            id="telephoneNumber"
            name="telephoneNumber"
            value={formData.telephoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="employeeManager">Employee Manager:</label>
          <input
            type="text"
            id="employeeManager"
            name="employeeManager"
            value={formData.employeeManager}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeCreateEdit;