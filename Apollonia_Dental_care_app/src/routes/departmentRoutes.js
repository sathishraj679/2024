const express = require('express');
const router = express.Router();
const {
  getAllDepartments,
  addDepartment,
} = require('../controllers/departmentController');

// Department Routes
router.get('/api/departments', getAllDepartments);
router.post('/api/departments', addDepartment);

module.exports = router;
