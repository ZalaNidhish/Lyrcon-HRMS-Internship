const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { verifyToken, checkPermission } = require('../middlewares/auth');

router.get('/', verifyToken, checkPermission('employee.view'), employeeController.getAllEmployees);
router.get('/:id', verifyToken, checkPermission('employee.view'), employeeController.getEmployeeById);
router.post('/', verifyToken, checkPermission('employee.create'), employeeController.createEmployee);
router.put('/:id', verifyToken, checkPermission('employee.edit'), employeeController.updateEmployee);
router.delete('/:id', verifyToken, checkPermission('employee.delete'), employeeController.deleteEmployee);

module.exports = router;