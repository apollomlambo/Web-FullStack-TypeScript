import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DepartmentsCreateEdit: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string | undefined };

  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    status: '',
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      axios.get(`/api/departments/${id}`)
        .then((response) => {
          const { name, manager, status } = response.data;
          setFormData({ name, manager, status });
        })
        .catch((error) => {
          console.error('Error fetching department data for edit:', error);
        });
    }
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEdit) {
      axios.put(`/api/departments/${id}`, formData)
        .then((response) => {
          console.log('Department updated:', response.data);
          router.push('/departments'); // Redirect to the departments list page
        })
        .catch((error) => {
          console.error('Error updating department:', error);
        });
    } else {
      axios.post('/api/departments', formData)
        .then((response) => {
          console.log('Department created:', response.data);
          router.push('/departments'); // Redirect to the departments list page
        })
        .catch((error) => {
          console.error('Error creating department:', error);
        });
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit Department' : 'Create Department'}</h2>
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
          <input
            type="text"
            id="manager"
            name="manager"
            value={formData.manager}
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
};

export default DepartmentsCreateEdit;
