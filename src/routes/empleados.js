const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const mysqlConnection  = require('../database.js');

// Consultar todos los empleados (GET)
router.get('/empleados', (req, res) => {
  mysqlConnection.query('SELECT * FROM empleados', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// Consultar empleados por id (GET)
router.get('/empleados/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM empleados WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// Eliminar un empleado (DELETE)
router.delete('/empleados/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM empleados WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Empleado eliminado'});
    } else {
      console.log(err);
    }
  });
});

// Insertar (POST)
router.post('/empleados', (req, res) => {
  const sql = "INSERT INTO empleados SET ?";
  const empleadosObjeto = {
    nombre: req.body.nombre,
    salario: req.body.salario
  }
  mysqlConnection.query(sql,empleadosObjeto,error=>{
    if(error) throw error;
    res.json({status: 'Empleado ingresado'});
  });
});
//Actualizar (PUT)
router.put('/actualizar:id', (req, res) => {
  const { nombre, salario } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @salario = ?;
    CALL empleadosAddOrEdit(@id, @nombre, @salario);
  `;
  mysqlConnection.query(query, [id, nombre, salario], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Empleado actualizado'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
