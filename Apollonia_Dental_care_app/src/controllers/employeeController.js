const Employee = require('../models/employeeSchema');
const Department = require('../models/departmentSchema');

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new employee
const addEmployee = async (req, res) => {
  try {
    const { name, surname, email, department } = req.body;

    // Validate if the department exists
    const dept = await Department.findById(department);
    if (!dept) {
      return res.status(400).json({ error: 'Invalid department selected' });
    }

    const newEmployee = await Employee.create({ name, surname, email, department });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, department } = req.body;

    // Validate if the department exists
    const dept = await Department.findById(department);
    if (!dept) {
      return res.status(400).json({ error: 'Invalid department selected' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, surname, email, department },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
