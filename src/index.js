const express = require('express');
const app = express();

// Settings
//Configuraciòn del puerto
//process.env.PORT significa que si el Sist Oper da un puerto que lo tome caso contrario 3000 
app.set('port', process.env.PORT || 3000);

// Middlewares
//Se puee acceder a la informacion
app.use(express.json());

// Routes
//Hacemos uso de la ruta para el archivo empleados
app.use(require('./routes/empleados'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
