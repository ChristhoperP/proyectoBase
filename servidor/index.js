const express = require('express');
const cors = require('cors');
const path = require('path');

//Llamar al archivo de conexion de bbdd
const { con } = require('./db/config');

//Llamar al .env
require('dotenv').config();

//Crear el servidor de express
const app = express();

//Base de datos
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to BBDD!");
});

//Directorio publico
app.use(express.static('public'));

//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rutas
app.use('/api', require('./routes/routes'));

//Manejar demas rutas
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html'));
});

//Arrancar el servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
