/* global Swal */

let clientes;
let listaVentaPre = [];
let presupuestoLentesContacto = [];
let indexVPre = 0;
let lentesContacto;
let examenVista;
let currentUser = localStorage.getItem('currentUser');
let user = JSON.parse(currentUser);

export function inicializar() {
    $('#desplegar').on('click', function () {
        $('#tablaVentaPre').css('display', '');
        $('#listar').css('display', 'block');
        $('#desplegar').css('display', 'none');
        $('#tablaBuscarCliente').css('display', 'none');
        $('#buscar').css('display', 'none');
    });

    $('#listar').on('click', function () {
        $('#tablaVentaPre').css('display', 'none');
        $('#listar').css('display', 'none');
        $('#desplegar').css('display', 'block');
        $('#tablaBuscarCliente').css('display', '');
        $('#buscar').css('display', 'block');
    });

    const buscar = document.querySelector('#txtBuscarClienteV');
    buscar.addEventListener('input', (event) => {
        let filtro;
        if (event.target.value === '' || event.target.value === null) {
            filtro = "-";
            buscarCliente(filtro);
        } else {
            filtro = event.target.value;
            buscarCliente(filtro);
        }
    });
}

export function obtenerLC(index) {
    let url = "api/lc/buscarlc";
    fetch(url, {method: "POST"})
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
                    lentesContacto = data;
                    const select = document.querySelector('#txtLC' + index);
                    select.options.length = 0;
                    // Recorrer los datos y crear opciones
                    data.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.producto.nombre;
                        option.text = item.producto.nombre;
                        select.appendChild(option);
                    });
                }
            });
}

export function buscarCliente(filtro) {

    let url = "api/cliente/buscar";
    let params = new URLSearchParams({filtro: filtro});
    fetch(url,
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
                    cargarTabla(data);
                }
            });
}

export function buscarEV(idCliente, index) {
    let params = new URLSearchParams({idCliente: idCliente});
    fetch("api/ventalc/buscarev",
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
                    examenVista = data;
                    console.log(data);
                    const select = document.querySelector('#txtEV' + index);
                    select.options.length = 0;
                    // Recorrer los datos y crear opciones
                    data.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.clave+'-'+item.empleado.persona.nombre;
                        option.text = item.clave+'-'+item.empleado.persona.nombre;
                        select.appendChild(option);
                    });
                }
            });
}

export function cargarTabla(data) {
    let cuerpo = "";
    clientes = data;
    clientes.forEach(function (cliente) {
        let registro =
                '<tr>' +
                '<td>' + cliente.persona.nombre + ' ' + cliente.persona.apellidoPaterno + ' ' + cliente.persona.apellidoMaterno + '</td>' +
                '<td>' + cliente.persona.telMovil + '</td>' +
                '<td><select id="txtEV' + clientes.indexOf(cliente) + '"></select></td>' +
                '<td><select id="txtLC' + clientes.indexOf(cliente) + '"></select></td>' +
                '<td><button class="btnA" onclick="moduloVLDC.seleccionarCliente(' + clientes.indexOf(cliente) + ');"><i class="fa-solid fa-magnifying-glass-plus"></i></button></td>' +
                '<td><button class="btnA" onclick="moduloVLDC.agregar(' + clientes.indexOf(cliente) + ');"><i class="fa-solid fa-cart-plus"></i></button></td>' +
                '</tr>';
        cuerpo += registro;
    });
    document.getElementById("tblBuscarClientesV").innerHTML = cuerpo;
}

export function seleccionarCliente(index) {
    obtenerLC(index);
    buscarEV(clientes[index].idCliente, index);
}

export function agregar(index) {
    const selectLcIndex = document.querySelector('#txtLC' + index);
    const selectEvIndex = document.querySelector('#txtEV' + index);
    let evIndex = selectEvIndex.selectedIndex;
    let lcIndex = selectLcIndex.selectedIndex;
    let presupuesto = {'examenDeVista': examenVista[evIndex], 'clave': (Math.random() * 1000000000000)};
    presupuestoLentesContacto[indexVPre] = {'lenteContacto': lentesContacto[lcIndex], 'clave': (Math.random() * 1000000000000),
        'presupuesto': presupuesto, 'examenDeVista': examenVista[evIndex]};

    listaVentaPre[indexVPre] = {'presupuestoLentesContacto': presupuestoLentesContacto[indexVPre], 'cantidad': 1,
        'precioUnitario': lentesContacto[lcIndex].producto.precioVenta, 'descuento': 0};

    let renglon =
            '<tr>' +
            '<td>' + clientes[index].persona.nombre + ' ' + clientes[index].persona.apellidoPaterno + ' ' + clientes[index].persona.apellidoMaterno + '</td>' +
            '<td>' + clientes[index].persona.telMovil + '</td>' +
            '<td>' + examenVista[evIndex].clave +'-'+examenVista[evIndex].empleado.persona.nombre+ '</td>' +
            '<td>' + lentesContacto[lcIndex].producto.nombre + '</td>' +
            '<td><input onchange="moduloVLDC.calcularPrecioTotal();" type="number" name="text" value="1" class="input" id="txtCantidad' + indexVPre + '"></td>' +
            '<td><input onchange="moduloVLDC.calcularPrecioTotal();" type="number" name="text" value="0" class="input" id="txtDescuento' + indexVPre + '"></td>' +
            '</tr>';

    document.getElementById("tblVPre").innerHTML += renglon;

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cliente Selecionado',
        showConfirmButton: false,
        timer: 850
    });
    
    calcularPrecioTotal();
    indexVPre++;
}

export function generarVenta() {

    listaVentaPre.forEach(venta => {
        venta.cantidad = document.getElementById("txtCantidad" + listaVentaPre.indexOf(venta)).value;
        venta.descuento = document.getElementById("txtDescuento" + listaVentaPre.indexOf(venta)).value;
    });

    let venta = {clave: Math.random() * 100000000, empleado: user};
    let dvpre = {'venta': venta, 'listaVentaPre': listaVentaPre};
    let datosVentaLC = {'datosVentaLC': JSON.stringify(dvpre)};
    let params = new URLSearchParams(datosVentaLC);
    console.log(params);

    fetch("api/ventalc/generarv",
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
                    Swal.fire('', data.response, 'success');
                }
            });
    limpiarTabla();
}

function limpiarTabla() {
    document.getElementById("tblVPre").innerHTML = "";
    document.getElementById("txtCantidadTotal").innerHTML = "Total: $" + 0;
    listaVentaPre = [];
    indexVPre = 0;
}

export function calcularPrecioTotal(){
    let descuento = 0;
    let precioUnitario = 0;
    let precioT = 0;
    let precioUT = 0;
    
    listaVentaPre.forEach(ventaPre => {
        ventaPre.cantidad = document.getElementById("txtCantidad" + listaVentaPre.indexOf(ventaPre)).value;
        ventaPre.descuento = document.getElementById("txtDescuento" + listaVentaPre.indexOf(ventaPre)).value;
        descuento = ventaPre.descuento / 100;
        precioUnitario = ventaPre.precioUnitario * ventaPre.cantidad;
        precioT = precioUnitario - (precioUnitario * descuento);
        precioUT += precioT;
    });
    console.log(precioUT);
    document.getElementById("txtCantidadTotal").innerHTML = "Total: $" + precioUT;
}