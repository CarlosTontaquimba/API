CREATE DATABASE IF NOT EXISTS empresa;

USE empresa;

CREATE TABLE empleados (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  salario INT(11) DEFAULT NULL, 
  PRIMARY KEY(id)
);

DESCRIBE empleados;

INSERT INTO empleados values 
  (1, 'Maria Peñafiel', 20000),
  (2, 'Jose Bose', 40000),
  (3, 'John Lemma', 50000);

SELECT * FROM empleados;
