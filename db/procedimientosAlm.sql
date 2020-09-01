CREATE DEFINER=`root`@`localhost` PROCEDURE `empleadosAddOrEdit`(
  IN _id INT,
  IN _nombre VARCHAR(45),
  IN _salario INT
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO empleados (nombre, salario)
    VALUES (_nombre, _salario);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE empleados
    SET
    nombre = _nombre,
    salario = _salario
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END