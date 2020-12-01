const express = require('express');
const connection = require("../conexion");
const user = require('../model/user');
var router = express.Router();

const middleware = require('./middleware')

const { body, param, validationResult } = require('express-validator');

router.use(middleware.checkToken);

router.get('/productos/:tipo', [
    param('tipo').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }

    let tipo = req.params.tipo;
    user.getTipoProducto(connection, tipo, (data => {
        res.json(data);
    }))
});

router.get('/producto/:id', [
    param('id').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id = req.params.id;
    user.getIdProducto(connection, id, (data => {
        res.json(data);
    }))
});

router.post('/carrito', [], (req, res) => {
    let body = req.body;
    body.id_usuario = req.idUsuario;
    user.createCarrito(connection, body, (data => {
        res.json(data);
    }))
});

router.get('/carrito', [], (req, res) => {
    let id = req.idUsuario;
    user.getAllCarrito(connection, id, (data => {
        res.json(data);
    }))
});

router.put('/carrito', [], (req, res) => {
    let body = req.body;
    user.updateCarrito(connection, body, (data => {
        res.json(data);
    }))
});

router.delete('/carrito/:id/:cantidad', [
    param('id').not().isEmpty().isNumeric(),
    param('cantidad').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    let params = req.params;
    params.id_usuario = req.idUsuario;
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    user.deleteProdCarrito(connection, params, (data => {
        res.json(data);
    }))
});

router.post('/tarjeta', [], (req, res) => {
    let body = req.body;
    body.id_usuario = req.idUsuario;
    user.createTarjeta(connection, body, (data => {
        res.json(data);
    }))
});

router.post('/venta', [], (req, res) => {
    let body = req.body;
    body.id_usuario = req.idUsuario;
    user.createVenta(connection, body, (data => {
        res.json(data);
    }))
});

router.get('/venta/:fecha', [
    param('fecha').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    let params = req.params;
    params.id_usuario = req.idUsuario;
    params.fecha = req.params.fecha;
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    user.getVenta(connection, params, (data => {
        res.json(data);
    }))
});

router.get('/ventas/:id', [
    param('id').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    let id = req.params.id;
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    user.getVentaId(connection, id, (data => {
        res.json(data);
    }))
});

router.post('/productoVenta', [], (req, res) => {
    let body = req.body;
    user.createProducto_Venta(connection, body, (data => {
        res.json(data);
    }))
});

router.get('/ventas', [], (req, res) => {
    let id = req.idUsuario;
    user.getAllVenta(connection, id, (data => {
        res.json(data);
    }))
});

router.get('/reporte-ventas1/:date1/:date2', [
    param('date1').not().isEmpty().isString(),
    param('date2').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let params = req.params;
    user.getProdMasVendidos(connection, params, (data => {
        res.json(data);
    }))
});

router.get('/reporte-ventas2/:anio', [
    param('anio').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let params = req.params;
    user.getGananciasAnual(connection, params, (data => {
        res.json(data);
    }))
});

router.get('/reporte-ventas3', [], (req, res) => {
    
    user.getGananciaDia(connection, (data => {
        res.json(data);
    }))
});

router.get('/reporte-ventas4', [], (req, res) => {
    
    user.getUserMasCompra(connection, (data => {
        res.json(data);
    }))
});

module.exports = router;