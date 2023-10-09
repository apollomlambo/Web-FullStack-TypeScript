// @use-client
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


type DepartmentFormData = {
  name: string;
  manager: string;
  status: string;
};

const DepartmentsCreateEditPage: React.FC = () => {
  const router = useRouter(); // Use the useRouter hook to get the router object
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: '',
    manager: '',
    status: '',
  });

  useEffect(() => {
    // This effect will only run when the formData state variable changes
    // ...
  }, [formData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Call the API endpoint to create/edit a department
      const response = await axios.post("/api/departments", formData);

      // Handle the response accordingly, e.g., show a success message
      console.log('Department created/edited:', response.data);

      // Redirect to the departments list or another page
      router.push('/departments'); // Use router.push for navigation
    } catch (error) {
      console.error('Error creating/editing department:', error);

      // Handle error, display a message, etc.
      alert('Failed to create/edit department. Please try again.');
    }
  };

  return (
    <div className="departments-create-edit-container">
      <h1>Create/Edit Department</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="manager">Manager:</label>
          <select
            id="manager"
            name="manager"
            value={formData.manager}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a manager</option>
            <option value="1">John Doe</option>
            <option value="2">Jane Doe</option>
          </select>
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <button type="submit">Save</button>
          <button type="reset">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentsCreateEditPage;