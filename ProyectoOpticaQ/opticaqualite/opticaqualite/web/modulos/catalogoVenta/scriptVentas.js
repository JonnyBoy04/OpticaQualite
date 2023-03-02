/* global Swal */
let productos;
let indexVS = 0;
let ventas = [];
let ventaProducto = [];
let currentUser = localStorage.getItem('currentUser');
let user = JSON.parse(currentUser);

export function inicializar() {
    const buscar = document.querySelector('#txtBusquedaVenta');

    $('#desplegar').on('click', function () {
        $('#tablaProducto').css('display', '');
        $('#listar').css('display', 'block');
        $('#desplegar').css('display', 'none');
        $('#tablaVenta').css('display', 'none');
        $('#buscar').css('display', 'none');
    });

    $('#listar').on('click', function () {
        $('#tablaProducto').css('display', 'none');
        $('#listar').css('display', 'none');
        $('#desplegar').css('display', 'block');
        $('#tablaVenta').css('display', '');
        $('#buscar').css('display', 'block');
    });

    buscar.addEventListener('input', (event) => {
        let filtro;
        if (event.target.value === '' || event.target.value === null) {
            filtro = "-";
            refrescarTabla(filtro);
        } else {
            filtro = event.target.value;
            refrescarTabla(filtro);
        }
    });
}

export function refrescarTabla(filtro) {
    let params = new URLSearchParams({filtro: filtro});
    fetch("api/venta/obtener",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();

            })
            .then(function (data)
            {
                if (data.exception != null) {
                    Swal.fire('',
                            'Error interno del servidor. Intente nuevamente más tarde',
                            'error'
                            );
                    return;
                }
                if (data.error != null) {
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if (data.errorsec != null) {
                    Swal.fire('', data.errorsec, 'error');
                    window.location.replace('index.html');
                    return;
                } else {
                    productos = data;
                    cargarTabla(data);
                }
            });
}

export function cargarTabla(data) {
    let cuerpo = "";
    ventas = data;
    ventas.forEach(function (producto) {
        let registro =
                '<tr>' +
                '<td>' + producto.codigoBarras + '</td>' +
                '<td>' + producto.nombre + '</td>' +
                '<td>$' + producto.precioVenta + '</td>' +
                '<td><button class="btnA" onclick="moduloVenta.agregar(' + ventas.indexOf(producto) + ');">A</button></td>\n\
                </tr>';
        cuerpo += registro;
    });
    document.getElementById("tblVenta").innerHTML = cuerpo;
}

export function agregar(index) {
    let renglon =
            '<tr>' +
            '<td>' + productos[index].codigoBarras + '</td>' +
            '<td>' + productos[index].nombre + '</td>' +
            '<td>$' + productos[index].precioVenta + '</td>' +
            '<td><input onchange="moduloVenta.calcularPrecioTotal();" type="number" name="text" value="1" class="input" id="txtCantidad' + indexVS + '" placeholder="Cantidad"></td>' +
            '<td><input onchange="moduloVenta.calcularPrecioTotal();" type="number" name="text" value="0" class="input" id="txtDescuento' + indexVS + '" placeholder="Descuento"></td>' +
            '</tr>';

    document.getElementById("tblProducto").innerHTML += renglon;
    ventaProducto[indexVS] = {producto: productos[index], cantidad: 1,
        precioUnitario: productos[index].precioVenta, descuento: 0};
    indexVS++;
    calcularPrecioTotal();
}



export function calcularPrecioTotal() {
    let precio = 0;
    let precioT = 0;
    let cantidadTotal = 0;
    let descuento;
    ventaProducto.forEach(function (venta) {
        venta.cantidad = document.getElementById("txtCantidad" + ventaProducto.indexOf(venta)).value;
        venta.descuento = document.getElementById("txtDescuento" + ventaProducto.indexOf(venta)).value;
        descuento = venta.descuento / 100;
        precio = venta.precioUnitario * venta.cantidad;
        precioT = precio - (precio*descuento);
        cantidadTotal += precioT;
    });
    document.getElementById("txtCantidadTotal").innerHTML = "Total: $" + cantidadTotal;
}

function validarExistencias() {
    let cantidad;
    let existencias;
    for (var i = 0; i < ventaProducto.length; i++) {
        cantidad = document.getElementById("txtCantidad" + i).value;
        existencias = ventaProducto[i].producto.existencias;
        console.log(cantidad);
        console.log(existencias);
        if (cantidad > existencias) {
            return false;
        }
    }
    return true;
}

function limpiarTabla() {
    document.getElementById("tblProducto").innerHTML = "";
    document.getElementById("txtCantidadTotal").innerHTML = "Total: $" + 0;
    ventaProducto = [];
    indexVS = 0;
}

export function generarCompra() {
    if (validarExistencias()) {
        ventaProducto.forEach(function (venta) {
            venta.cantidad = document.getElementById("txtCantidad" + ventaProducto.indexOf(venta)).value;
            venta.descuento = document.getElementById("txtDescuento" + ventaProducto.indexOf(venta)).value;
        });

        let venta = {clave: Math.random() * 100000000, empleado: user};
        let dvp = {venta: venta, listaVP: ventaProducto};
        let datosVP = {datosVP: JSON.stringify(dvp)};
        let params = new URLSearchParams(datosVP);

        fetch("api/venta/guardar",
                {
                    method: "POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                    body: params
                })
                .then(response => {
                    return response.json();
                })
                .then(function (data)
                {
                    if (data.exception != null) {
                        Swal.fire('',
                                'Error interno del servidor. Intente nuevamente más tarde',
                                'error'
                                );
                        return;
                    }
                    if (data.error != null) {
                        Swal.fire('', data.error, 'warning');
                        return;
                    }
                    if (data.errorsec != null) {
                        Swal.fire('', data.errorsec, 'error');
                        window.location.replace('index.html');
                        return;
                    } else {
                        Swal.fire('', 'Venta realizada correctamente.', 'success');
                    }
                });
        limpiarTabla();
        refrescarTabla();
    } else {
        Swal.fire('', "Producto agotado", 'warning');
    }
}
