import { NextApiRequest, NextApiResponse } from 'next';
import Department, { IDepartment } from '../models/Department.model';
import connectDB from '../database/connect';

connectDB();

const departmentsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { name, status } = req.body;

        // Create a new department
        const newDepartment: IDepartment = new Department({ name, status });

        const savedDepartment = await newDepartment.save();

        res.status(201).json(savedDepartment);
      } catch (error: any) {
        res.status(500).json({ message: 'Error creating department', error: error.message });
      }
      break;

    case 'GET':
      try {
        const departments = await Department.find();
        res.status(200).json(departments);
      } catch (error: any) {
        res.status(500).json({ message: 'Error fetching departments', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
};

export default departmentsApi;