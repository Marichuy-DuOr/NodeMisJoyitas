module.exports = {

    getAll: (connection, callback) => {
        connection.query('select * from usuario', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    create: (connection, body, callback) => {
        connection.query('insert into usuario SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    createDomicilio: (connection, body, callback) => {
        connection.query('insert into direccion SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    updateUser: (connection, body, callback) => {
        connection.query('update usuario set nombre = ?, ape_pat = ?, ape_mat = ?, telefono = ? WHERE id = ? ', [body.nombre, body.ape_pat, body.ape_mat, body.telefono, body.id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    updateDireccion: (connection, body, callback) => {
        connection.query('update direccion set id_municipio=?, colonia=?, calle=?, numero=?, interior=?, cp=? WHERE id_usuario = ? ', [body.id_municipio, body.colonia, body.calle, body.numero, body.interior, body.cp, body.id_usuario], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    getById: (connection, id, callback) => {
        connection.query('select * from usuario where id = ' + id, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: results || null, success: true });
        })
    },

    getByCorreo: (connection, correo, callback) => {
        connection.query(`select * from usuario where correo = '${correo}'`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: results || null, success: true });
        })
    },

    getAllProductos: (connection, callback) => {
        connection.query('select * from v_producto', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getAllProductosInactivos: (connection, callback) => {
        connection.query('select id, nombre, imagen from producto where is_active = 0', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getIdProducto: (connection, id, callback) => {
        connection.query('select * from producto where id = ' + id, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: results || null, success: true });
        })
    },

    getProductoPorNombre: (connection, busqueda, callback) => {
        connection.query(`select * from producto where nombre LIKE '%${busqueda}%' and is_active=1 limit 20`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProductoIdPorNombre: (connection, busqueda, callback) => {
        connection.query(`call buscarP('${busqueda}')`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getGlobal: (connection, varGlob, callback) => {
        connection.query(`select ${varGlob} as id`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getTipoProducto: (connection, tipo, callback) => {
        connection.query(`select * from producto where tipo = ${tipo} and is_active = 1`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: results || null, success: true });
        })
    },

    createProducto: (connection, body, callback) => {
        connection.query('insert into producto SET ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    deleteProducto: (connection, body, callback) => {
        connection.query(`delete from producto where id = '${body.id}'`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        })
    },

    updateProducto: (connection, body, callback) => {
        connection.query('update producto set nombre = ?, descripcion = ?, imagen = ?, tipo = ?, minimo = ?, material = ?, precio_venta = ? WHERE id = ? ', [body.nombre, body.descripcion, body.imagen, body.tipo, body.minimo, body.material, body.precio_venta, body.id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    activarProducto: (connection, body, callback) => {
        connection.query('update producto set is_active = ? WHERE id = ? ', [body.is_active, body.id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    updateRol: (connection, body, callback) => {
        connection.query('update v_usuario_rol set rol = lower(?) WHERE correo = ? ', [body.rol, body.correo], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    getRolesUsuarios: (connection, id, callback) => {
        connection.query('select correo, upper(rol) as rol from v_usuario_rol where id <> ' + id, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getDatosUsuario: (connection, id, callback) => {
        connection.query('select u.nombre, u.ape_pat, u.ape_mat, u.correo, u.telefono, e.nombre as estado, m.nombre as municipio, m.id as id_municipio, d.colonia, d.calle, d.numero, d.interior, d.cp from usuario u, direccion d, estado e, municipio m where u.id = ? and u.id=d.id_usuario and d.id_municipio=m.id and m.id_estado=e.id', [id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getMunicipio: (connection, busqueda, callback) => {
        connection.query(`select m.id, m.nombre as municipio, e.nombre as estado from estado e, municipio m where e.id=m.id_estado and m.nombre LIKE '%${busqueda}%' limit 10`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    createCarrito: (connection, body, callback) => {
        connection.query('insert into carrito SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    getAllCarrito: (connection, id, callback) => {
        connection.query('select * from carrito where id_usuario = ?', [id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    updateCarrito: (connection, body, callback) => {
        connection.query('update carrito set id_usuario = ?, id_producto = ?, cantidad = ? WHERE id = ? ', [body.id_usuario, body.id_producto, body.cantidad], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        });
    },

    deleteProdCarrito: (connection, body, callback) => {
        connection.query(`call eliminarProdCarrito(${body.id_usuario},${body.id},${body.cantidad})`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: null, success: true });
        })
    },

    createTarjeta: (connection, body, callback) => {
        connection.query('insert into tarjetas SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    createVenta: (connection, body, callback) => {
        connection.query('insert into ventas SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    getVenta: (connection, body, callback) => {
        connection.query(`select id from ventas where id_usuario = '${body.id_usuario}' and fecha = '${body.fecha}'`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: null, id: results, success: true });
        })
    },

    createProducto_Venta: (connection, body, callback) => {
        connection.query('insert into producto_ventas SET ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    getVentaId: (connection, id_ventas, callback) => {
        connection.query('select * from producto_ventas where id_ventas = ' + id_ventas, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null  || null, success: true });
        })
    },


    getAllVenta: (connection, id, callback) => {
        connection.query('select * from ventas where factura = 0 and id_usuario = ?', [id], (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getProdMasVendidos: (connection, body, callback) => {
        connection.query(`select a.nombre, sum(b.cantidad) as cantidad from producto a, producto_ventas b, ventas c where a.id=b.id_producto and b.id_ventas=c.id and c.fecha between '${body.date1}' and '${body.date2}' group by a.nombre order by sum(b.cantidad) desc limit 10`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getGananciasAnual: (connection, body, callback) => {
        connection.query(`select month(v.fecha) as mes, sum((pv.precio*pv.cantidad)/2) as suma from ventas v, producto p, producto_compras pc, producto_ventas pv where p.id = pc.id_producto and p.id = pv.id_producto and v.id = pv.id_ventas and year(v.fecha)='${body.anio}' group by month(v.fecha)`, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getGananciaDia: (connection, callback) => {
        connection.query('select day(a.fecha) as dia, sum(b.cantidad) as total, sum((b.precio*b.cantidad)/2) as ganancia from ventas a, producto_ventas b where a.id=b.id_ventas and day(a.fecha)=day(curdate()) group by day(a.fecha)', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getUserMasCompra: (connection, callback) => {
        connection.query('select u.id as id, concat(u.nombre," ",u.ape_pat," ",u.ape_mat) as nombre, sum(pv.cantidad) as suma from usuario u, ventas v, producto_ventas pv where u.id = v.id_usuario and v.id = pv.id_ventas group by u.id order by suma desc limit 10', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },

    getfacturas: (connection, callback) => {
        connection.query('call factura()', (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        })
    },
    
    

}