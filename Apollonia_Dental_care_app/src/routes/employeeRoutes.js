const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// Employee Routes
router.get('/api/employees', getAllEmployees);
router.post('/api/employees', addEmployee);
router.put('/api/employees/:id', updateEmployee);
router.delete('/api/employees/:id', deleteEmployee);

module.exports = router;
