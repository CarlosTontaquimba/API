const { Router } = require('express');
const router = Router();

const { getEmployees, getEmployeesById, createEmployees, updateEmployees, deleteEmployees } = require('../controllers/index.controller');

router.get('/empleados', getEmployees);
router.get('/empleados/:id', getEmployeesById);
router.post('/empleados', createEmployees);
router.put('/empleados/:id', updateEmployees)
router.delete('/empleados/:id', deleteEmployees);

module.exports = router;