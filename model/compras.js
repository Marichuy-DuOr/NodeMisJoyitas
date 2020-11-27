module.exports = {

    createProveedor: (connection, body, callback) => {
        connection.query('insert into proveedor SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    updateProveedor: (connection, body, callback) => {
        connection.query('update proveedor set nombre = ?, correo = ?, telefono = ? WHERE id = ? ', [body.nombre, body.correo, body.telefono, body.id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    activarProveedor: (connection, body, callback) => {
        connection.query('update proveedor set is_active = ? WHERE id = ? ', [body.is_active, body.id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    getProveedor: (connection, busqueda, callback) => {
        connection.query(`select id, nombre, correo, telefono from proveedor where nombre LIKE '%${busqueda}%' and is_active=1 limit 10`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getNombreProveedor: (connection, busqueda, callback) => {
        connection.query(`select id, nombre from proveedor where nombre LIKE '%${busqueda}%' and is_active=1 limit 10`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProveedores: (connection, callback) => {
        connection.query(`select id, nombre, correo, telefono from proveedor where is_active = 1`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProveedoresInactivos: (connection, callback) => {
        connection.query(`select id, nombre from proveedor where is_active = 0 limit 10`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getNombreProducto: (connection, busqueda, callback) => {
        connection.query(`select id, nombre from producto where nombre LIKE '%${busqueda}%' and is_active=1 limit 10`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    createProveedorProducto: (connection, body, callback) => {
        connection.query('insert into proveedor_producto SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    getProductosPorProveedor: (connection, id_proveedor, callback) => {
        connection.query(`select b.id, a.nombre, b.id_producto, a.imagen, a.existencia, b.precio_compra from producto a, proveedor_producto b where b.id_proveedor = '${id_proveedor}' and b.id_producto=a.id and a.is_active=1`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProductosPorProveedorMinimo: (connection, id_proveedor, callback) => {
        connection.query(`select b.id, a.nombre, b.id_producto, a.imagen, a.existencia, b.precio_compra from producto a, proveedor_producto b where b.id_proveedor = '${id_proveedor}' and b.id_producto=a.id and a.is_active=1 and a.existencia < a.minimo`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    buscarProductosPorProveedor: (connection, params, callback) => {
        connection.query(`select b.id, b.id_producto, a.nombre, a.imagen, a.existencia, b.precio_compra from producto a, proveedor_producto b where b.id_proveedor = '${params.id}' and b.id_producto=a.id and a.is_active=1 and a.nombre like '%${params.busqueda}%'`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getPrecioCompra: (connection, params, callback) => {
        connection.query(`select id, precio_compra from proveedor_producto where id_proveedor = '${params.id_proveedor}' and id_producto='${params.id_producto}'`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    updatePrecioCompra: (connection, body, callback) => {
        connection.query('update proveedor_producto set precio_compra = ? WHERE id = ? ', [body.precio_compra, body.id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    deleteProveedorProducto: (connection, id, callback) => {
        // connection.query(`delete from proveedor_producto where id = '${id}'`, (err, results) => {
        connection.query(`call eliminarProvProd(${id})`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        })
    },

    createCompra: (connection, body, callback) => {
        connection.query('insert into compras (id_proveedor, fecha, total) values (?,now(),?)', [body.id_proveedor, body.total], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    createProductoCompra: (connection, body, callback) => {
        connection.query('insert into producto_compras SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    getCompras: (connection, callback) => {
        connection.query(`select c.id, p.nombre as proveedor, c.fecha, c.total from compras c, proveedor p where c.id_proveedor = p.id order by c.fecha desc limit 20`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getVentas: (connection, callback) => {
        connection.query(`select v.id, u.correo as cliente, v.fecha, v.total, v.num_tarjeta from ventas v, usuario u where v.id_usuario = u.id order by v.fecha desc limit 20`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getComprasPorFechas: (connection, params, callback) => {
        connection.query(`select c.id, p.nombre as proveedor, c.fecha, c.total from compras c, proveedor p where c.id_proveedor = p.id and c.fecha between '${params.f1}' and '${params.f2}' limit 20`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getVentasPorFechas: (connection, params, callback) => {
        connection.query(`select v.id, u.correo as cliente, v.fecha, v.total, v.num_tarjeta from ventas v, usuario u where v.id_usuario = u.id and v.fecha between '${params.f1}' and '${params.f2}' limit 20`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProductoCompras: (connection, id_compra, callback) => {
        connection.query(`select p.nombre, p.imagen, c.cantidad, c.precio, c.precio*c.cantidad as total from producto p, producto_compras c where c.id_producto=p.id and c.id_compra = ${id_compra}`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProductoVentas: (connection, id_compra, callback) => {
        connection.query(`select p.nombre, p.imagen, v.cantidad, v.precio, v.precio*v.cantidad as total from producto p, producto_ventas v where v.id_producto=p.id and v.id_ventas = ${id_compra}`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getComprasProveedorPorMes: (connection, params, callback) => {
        connection.query(`select p.nombre as proveedor, count(c.id_proveedor) as no_compras from proveedor p, compras c where p.id=c.id_proveedor and month(c.fecha) = ${params.mes} and year(c.fecha)=${params.anio} group by p.id`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getComprasPromedioTotalAnual: (connection, anio, callback) => {
        connection.query(`select month(fecha) as mes, avg(total) as promedio from compras where year(fecha)='${anio}' group by month(fecha)`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getComprasProductosPorTipoProveedor: (connection, id_proveedor, callback) => {
        connection.query(`select a.tipo, sum(b.cantidad) as cantidad from producto a, producto_compras b, compras c where a.id=b.id_producto and b.id_compra=c.id and id_proveedor='${id_proveedor}' group by a.tipo`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProductosGroupByTipo: (connection, callback) => {
        connection.query(`select count(nombre) as cantidad, tipo from producto group by tipo;`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProductosGroupByMaterial: (connection, callback) => {
        connection.query(`select count(nombre) as cantidad, material from producto group by material`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProductosMasComprados: (connection, params, callback) => {
        connection.query(`select a.nombre, sum(b.cantidad) as cantidad from producto a, producto_compras b, compras c where a.id=b.id_producto and b.id_compra=c.id and c.fecha between '${params.f1}' and '${params.f2}' group by a.nombre order by sum(b.cantidad) desc limit 10`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getComprasProveedorPorProducto: (connection, id_producto, callback) => {
        connection.query(`select sum(b.cantidad) as cantidad, b.precio, d.nombre as proveedor, sum(b.cantidad) * b.precio as total from producto a, producto_compras b, proveedor d, compras e where a.id=b.id_producto and b.id_compra=e.id and e.id_proveedor=d.id and a.id='${id_producto}' group by e.id_proveedor`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },
}