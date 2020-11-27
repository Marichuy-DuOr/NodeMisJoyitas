const express = require('express');
const connection = require("../conexion");
const user = require('../model/compras');
var router = express.Router();

const middlewareRol = require('./middleware_roles');

const { body, param, validationResult } = require('express-validator');

router.use(middlewareRol.checkRole);

router.post('/proveedor', (req, res) => {
    req.body.is_active = 1;
    let body = req.body;
    user.createProveedor(connection, body, (data => {
        res.json(data);
    }));
});

router.put('/proveedor', [], (req, res) => {
    let body = req.body;
    user.updateProveedor(connection, body, (data => {
        res.json(data);
    }))
});

router.put('/proveedor-activacion', [], (req, res) => {
    let body = req.body;
    user.activarProveedor(connection, body, (data => {
        res.json(data);
    }))
});

router.get('/proveedor/:busqueda', [
    param('busqueda').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let busqueda = req.params.busqueda;
    user.getProveedor(connection, busqueda, (data => {
        res.json(data);
    }))
});

router.get('/proveedor-nombre/:busqueda', [
    param('busqueda').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let busqueda = req.params.busqueda;
    user.getNombreProveedor(connection, busqueda, (data => {
        res.json(data);
    }))
});

router.get('/proveedores', (req, res) => {
    user.getProveedores(connection, (data => {
        res.json(data);
    }))
});

router.get('/proveedores-inactivos', (req, res) => {
    user.getProveedoresInactivos(connection, (data => {
        res.json(data);
    }))
});

router.get('/producto-nombre/:busqueda', [
    param('busqueda').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let busqueda = req.params.busqueda;
    user.getNombreProducto(connection, busqueda, (data => {
        res.json(data);
    }))
});

router.post('/proveedor-producto', (req, res) => {
    let body = req.body;
    user.createProveedorProducto(connection, body, (data => {
        res.json(data);
    }));
});

router.get('/proveedor-producto/:id', [
    param('id').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id_proveedor = req.params.id;
    user.getProductosPorProveedor(connection, id_proveedor, (data => {
        res.json(data);
    }))
});

router.get('/proveedor-producto-minimo/:id', [
    param('id').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id_proveedor = req.params.id;
    user.getProductosPorProveedorMinimo(connection, id_proveedor, (data => {
        res.json(data);
    }))
});

router.get('/proveedor-producto-busqueda/:id/:busqueda', [
    param('id').not().isEmpty().isString(),
    param('busqueda').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let params = req.params;
    user.buscarProductosPorProveedor(connection, params, (data => {
        res.json(data);
    }))
});

router.get('/precio-compra/:id_proveedor/:id_producto', [
    param('id_proveedor').not().isEmpty().isString(),
    param('id_producto').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let params = req.params;
    user.getPrecioCompra(connection, params, (data => {
        res.json(data);
    }))
});

router.put('/proveedor-producto', [], (req, res) => {
    let body = req.body;
    user.updatePrecioCompra(connection, body, (data => {
        res.json(data);
    }))
});

router.delete('/proveedor-producto/:id', [
    param('id').not().isEmpty().isNumeric()
], (req, res) => {
    const errors = validationResult(req);
    let id = req.params.id;
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    user.deleteProveedorProducto(connection, id, (data => {
        res.json(data);
    }))
});

router.post('/compra', (req, res) => {
    let body = req.body;
    user.createCompra(connection, body, (data => {
        res.json(data);
    }));
});

router.post('/producto-compra', (req, res) => {
    let body = req.body;
    user.createProductoCompra(connection, body, (data => {
        res.json(data);
    }));
});

router.get('/compras', (req, res) => {
    user.getCompras(connection, (data => {
        res.json(data);
    }))
});

router.get('/ventas', (req, res) => {
    user.getVentas(connection, (data => {
        res.json(data);
    }))
});

router.get('/compras-por-fecha/:f1/:f2', [
    param('f1').not().isEmpty().isString(),
    param('f2').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let params = req.params;
    user.getComprasPorFechas(connection, params, (data => {
        res.json(data);
    }))
});

router.get('/ventas-por-fecha/:f1/:f2', [
    param('f1').not().isEmpty().isString(),
    param('f2').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let params = req.params;
    user.getVentasPorFechas(connection, params, (data => {
        res.json(data);
    }))
});

router.get('/producto-compra/:id_compra', [
    param('id_compra').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id_compra = req.params.id_compra;
    user.getProductoCompras(connection, id_compra, (data => {
        res.json(data);
    }))
});

router.get('/producto-venta/:id_venta', [
    param('id_venta').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id_venta = req.params.id_venta;
    user.getProductoVentas(connection, id_venta, (data => {
        res.json(data);
    }))
});

router.get('/reporte-compras1/:mes/:anio', [
    param('mes').not().isEmpty().isString(),
    param('anio').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let params = req.params;
    user.getComprasProveedorPorMes(connection, params, (data => {
        res.json(data);
    }))
});

router.get('/reporte-compras2/:anio', [
    param('anio').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let anio = req.params.anio;
    user.getComprasPromedioTotalAnual(connection, anio, (data => {
        res.json(data);
    }))
});

router.get('/reporte-compras3/:id_proveedor', [
    param('id_proveedor').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id_proveedor = req.params.id_proveedor;
    user.getComprasProductosPorTipoProveedor(connection, id_proveedor, (data => {
        res.json(data);
    }))
});

router.get('/reporte-compras41', (req, res) => {
    user.getProductosGroupByMaterial(connection, (data => {
        res.json(data);
    }))
});

router.get('/reporte-compras42', (req, res) => {
    user.getProductosGroupByTipo(connection, (data => {
        res.json(data);
    }))
});

router.get('/reporte-compras5/:f1/:f2', [
    param('f1').not().isEmpty().isString(),
    param('f2').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let params = req.params;
    user.getProductosMasComprados(connection, params, (data => {
        res.json(data);
    }))
});

router.get('/reporte-compras6/:id_producto', [
    param('id_producto').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id_producto = req.params.id_producto;
    user.getComprasProveedorPorProducto(connection, id_producto, (data => {
        res.json(data);
    }))
});

module.exports = router;