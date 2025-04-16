const Department = require('../models/departmentSchema');

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new department
const addDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if department name already exists
    const existingDept = await Department.findOne({ name });
    if (existingDept) {
      return res.status(400).json({ error: 'Department already exists' });
    }

    const newDepartment = await Department.create({ name, description });
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDepartments,
  addDepartment,
};
