import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Employee, { IEmployee } from '../models/Employee.model';
import connectDB from '../database/connect';

connectDB();

const employeesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const {
          firstName,
          lastName,
          telephoneNumber,
          emailAddress,
          employeeManager,
          status,
        } = req.body;

        // Create a new employee
        const newEmployee: IEmployee = new Employee({
          firstName,
          lastName,
          telephoneNumber,
          emailAddress,
          employeeManager,
          status,
        });

        // Hash the default password before saving (you might want to improve this)
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash('Password123#', saltRounds);
        newEmployee.password = hashedPassword;

        const savedEmployee = await newEmployee.save();

        // Generate a JWT token for the new employee (if needed)
        const token = jwt.sign(
          { userId: savedEmployee._id },
          'your-secret-key',
          { expiresIn: '1h' } // Adjust expiration as needed
        );

        res.status(201).json(savedEmployee);
      } catch (error: any) {
        res.status(500).json({ message: 'Error creating employee', error: error.message });
      }
      break;

    case 'GET':
      try {
        const employees = await Employee.find();
        res.status(200).json(employees);
      } catch (error: any) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
};

export default employeesApi;