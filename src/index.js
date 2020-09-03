require('dotenv').config();
const express = require('express');
const app = express();

app.set('port',process.env.PORT || 3000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index'));

app.listen(app.get('port'),()=>{console.log('Server on port', 3000);});
