const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

//Prueba ruta
router.get('/home', (req, res) => {
    return res.status(200).json({
        message: "Hola mundo"
    });
});

module.exports = router;