const { con } = require('../db/config');

var controller = {
    //Crud
    createEmpleado: async function (req, res) {
        var { nombre, apellido, direccion, identidad, email } = req.body;

        const query = `INSERT INTO empleado(nombre, apellido, direccion, identidad, email) 
                       VALUES ('${nombre}','${apellido}','${direccion}','${identidad}','${email}')`;

        await con.query(query, function (err, result, fields) {
            if (err) {
                return res.status(500).json({ok: false, message: "Error al crear el usuario.", err});
            };
            res.status(200).json({ok: true, message: "Empleado registrado con exito.", result});
        });
    },
    //cRud
    getEmpleados: async function (req, res) {
        await con.query("SELECT * FROM EMPLEADO", function (err, result, fields) {
            if (err) {
                return res.status(500).json(err);
            };
            const response = result;
            res.status(200).json(response);
        });
    },
    getEmpleado: async function (req, res) {
        const query = `SELECT * FROM EMPLEADO WHERE idEmpleado = ${req.params.idEmpleado}`
        await con.query(query, function (err, result, fields) {
            if (err) {
                return res.status(500).json(err);
            };

            if(result.length == 0) return res.status(404).json({ok: false, message: "No se encontró el usuario."});
            const response = result[0];
            res.status(200).json(response);
        });
    },

    //crUd
    updateEmpleado: async function (req, res) {
        var { nombre, apellido, direccion, identidad, email } = req.body;
        var idEmpleado = req.params.idEmpleado;

        console.log(idEmpleado);
        const query = `UPDATE empleado SET 
                       nombre='${nombre}',
                       apellido='${apellido}',
                       direccion='${direccion}',
                       identidad='${identidad}',
                       email='${email}' 
                       WHERE idEmpleado = ${idEmpleado}`;

        await con.query(query, function (err, result, fields) {
            if (err) {
                return res.status(500).json({ok: false, message: "Error al actualizar el usuario.", err});
            };
            res.status(200).json({ok: true, message: "Empleado actualizado con exito.", result});
        });
    },
    //cruD
    deleteEmpleado: async function (req, res) {
        var idEmpleado = parseInt(req.params.idEmpleado);

        console.log(idEmpleado);
        const query = `DELETE FROM empleado WHERE idEmpleado = ${idEmpleado}`;

        await con.query(query, function (err, result, fields) {
            if (err) {
                return res.status(500).json({ok: false, message: "Error al eliminar el usuario.", err});
            };
            res.status(200).json({ok: true, message: "Empleado eliminado con exito.", result});
        });
    }
}

module.exports = controller;