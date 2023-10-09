// @use-client
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


interface Employee {
  firstName: string;
  lastName: string;
  emailAddress: string;
  telephoneNumber: string;
  employeeManager: string;
  status: string;
  // Add more employee fields here
}

const EmployeeCreateEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<Employee>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    telephoneNumber: '',
    employeeManager: '',
    status: '',
    // Initialize other employee fields here
  });

  const [formErrors, setFormErrors] = useState<Partial<Employee>>({});

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      axios
        .get<Employee>(`/api/employees/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching employee data for edit:', error);
        });
    }
  }, [id]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const errors: Partial<Employee> = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.emailAddress.trim()) {
      errors.emailAddress = 'Email address is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.emailAddress)
    ) {
      errors.emailAddress = 'Invalid email address';
    }

    // Add validation rules for other fields (e.g., telephoneNumber, employeeManager, status)

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEdit) {
      axios
        .put(`/api/employees/${id}`, formData)
        .then(() => {
          router.push(`/employee/${id}`);
        })
        .catch((error) => {
          console.error('Error updating employee:', error);
        });
    } else {
      axios
        .post('/api/employees', formData)
        .then((response) => {
          router.push(`/employee/${response.data.id}`);
        })
        .catch((error) => {
          console.error('Error creating employee:', error);
        });
    }
  };

  return (
    <div className="employee-create-edit-container">
      <h2>{isEdit ? 'Edit Employee' : 'Create Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          {formErrors.firstName && (
            <p className="error">{formErrors.firstName}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          {formErrors.lastName && (
            <p className="error">{formErrors.lastName}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleInputChange}
            required
          />
          {formErrors.emailAddress && (
            <p className="error">{formErrors.emailAddress}</p>
          )}
        </div>
        {/* Add form fields for other employee properties */}
        <div className="form-field">
          <label htmlFor="telephoneNumber">Telephone Number:</label>
          <input
            type="text"
            id="telephoneNumber"
            name="telephoneNumber"
            value={formData.telephoneNumber}
            onChange={handleInputChange}
          />
          {formErrors.telephoneNumber && (
            <p className="error">{formErrors.telephoneNumber}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="employeeManager">Employee Manager:</label>
          <input
            type="text"
            id="employeeManager"
            name="employeeManager"
            value={formData.employeeManager}
            onChange={handleInputChange}
          />
          {formErrors.employeeManager && (
            <p className="error">{formErrors.employeeManager}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          />
          {formErrors.status && (
            <p className="error">{formErrors.status}</p>
          )}
        </div>
        {/* Add more form fields for other employee properties */}
        <div className="form-field">
          <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeCreateEditPage;