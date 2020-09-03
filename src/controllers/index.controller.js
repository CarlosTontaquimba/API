const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});
pool.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Conectado a la bdd');
    }
})
const getEmployees = async (req, res) => {
    const response = await pool.query('SELECT * FROM empleados ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getEmployeesById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM empleados WHERE id = $1', [id]);
    res.json(response.rows);
};

const createEmployees = async (req, res) => {
    const { nombre, salario } = req.body;
    const response = await pool.query('INSERT INTO empleados (nombre, salario) VALUES ($1, $2)', [nombre, salario]);
    res.json({
        message: 'Empleado añadido corrctamente',
        body: {
            empleados: { nombre, salario }
        }
    })
};

const updateEmployees = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, salario } = req.body;

    const response = await pool.query('UPDATE empleados SET nombre = $1, salario = $2 WHERE id = $3', [
        nombre,
        salario,
        id
    ]);
    res.json('Empleado actualizado correctamente');
};

const deleteEmployees = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM empleados where id = $1', [
        id
    ]);
    res.json(`Empleado ${id} eliminado correctamente`);
};

module.exports = {
    getEmployees,
    getEmployeesById,
    createEmployees,
    updateEmployees,
    deleteEmployees
};