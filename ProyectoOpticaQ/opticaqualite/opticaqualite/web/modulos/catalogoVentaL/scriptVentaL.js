let clientes;
let examenVistaL;
let indexVS = 0;
let armazones;
let materiales;
let tratamientos;
let tratamientosSel = [];
let tipoMicas;
let presupuestoLentes = [];
let ventaPresupuestoLentes = [];
let cantidadTotal = 0;
let currentUser = localStorage.getItem('currentUser');
let user = JSON.parse(currentUser);

export function inicializar() {
    $('#desplegar').on('click', function () {
        $('#form').css('display', 'block');
        $('#listar').css('display', 'block');
        $('#desplegar').css('display', 'none');
        $('#checkBoxTratamientos').css('display', 'none');
        $('#formularioDvpl').css('display', 'none');
        $('#buscar').css('display', 'none');
    });


    $('#listar').on('click', function () {
        $('#form').css('display', 'none');
        $('#listar').css('display', 'none');
        $('#desplegar').css('display', 'block');
        $('#checkBoxTratamientos').css('display', '');
        $('#formularioDvpl').css('display', '');
        $('#buscar').css('display', 'block');
    });

    obtenerArmazon();
    obtenerMaterial();
    obtenerTratamiento();
    obtenerTipoMica();

    const buscar = document.querySelector('#txtBusquedaCliente');
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
                    clientes = data;
                    console.log(clientes);
                    cargarFormulario();
                }
            });
}

export function buscarEV(idCliente) {
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
                    examenVistaL = data;
                    const select = document.querySelector('#examen');
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

export function obtenerArmazon() {
    let url = "api/armazon/getAll";
    fetch(url)
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
                    armazones = data;
                    const select = document.querySelector('#armazon');
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

export function obtenerMaterial() {
    let url = "api/material/getAll";
    fetch(url)
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
                    materiales = data;
                    const select = document.querySelector('#material');
                    select.options.length = 0;
                    // Recorrer los datos y crear opciones
                    data.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.nombre;
                        option.text = item.nombre;
                        select.appendChild(option);
                    });
                }
            });
}

export function obtenerTratamiento() {
    let url = "api/tratamiento/getAll";
    fetch(url)
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
                    tratamientos = data;
                    var container = document.createElement('div');

                    // Iterar sobre los datos y crear una casilla de verificación para cada uno
                    tratamientos.forEach(function (elemento) {
                        // Crear la casilla de verificación y asignar sus atributos
                        var checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.name = 'tratamientos';
                        checkbox.value = elemento.nombre;

                        // Crear una etiqueta para la casilla de verificación y asignar su texto
                        var label = document.createElement('label');
                        label.htmlFor = elemento.nombre;
                        label.appendChild(document.createTextNode(elemento.nombre));

                        // Crear un contenedor para la casilla de verificación y la etiqueta
                        var div = document.createElement('div');
                        div.className = 'form-check form-check-inline';
                        div.appendChild(checkbox);
                        div.appendChild(label);

                        // Agregar la casilla de verificación y la etiqueta al contenedor
                        container.appendChild(div);
                    });

                    // Agregar el contenedor al contenedor de tratamientos en la página
                    document.getElementById('contenedor-tratamientos').appendChild(container);
                }
            });
}

export function obtenerTipoMica() {
    let url = "api/tipomica/obtenertp";
    fetch(url)
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
                    tipoMicas = data;
                    const select = document.querySelector('#mica');
                    select.options.length = 0;
                    // Recorrer los datos y crear opciones
                    data.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.nombre;
                        option.text = item.nombre;
                        select.appendChild(option);
                    });
                }
            });
}

export function cargarFormulario() {

    document.querySelector("#nombre").value = "";

    const selectEV = document.querySelector('#examen');
    selectEV.options.length = 0;

    clientes.forEach(function (cliente) {
        document.querySelector("#nombre").value = cliente.persona.nombre + ' ' + cliente.persona.apellidoPaterno + ' ' + cliente.persona.apellidoMaterno;
        buscarEV(cliente.idCliente);
    });
}

function obtenerTSelecionados() {
    var checkboxes = document.getElementsByName("tratamientos");
    for (var j = 0; j < checkboxes.length; j++) {
        if (checkboxes[j].checked && tratamientos[j]) {
            tratamientosSel.push(tratamientos[j]);
        }
    }
    return tratamientosSel;
}

export function generarVentaLente() {

    const selectEvIndex = document.querySelector('#examen');
    const selectMiIndex = document.querySelector('#mica');
    const selectMaIndex = document.querySelector('#material');
    const selectArIndex = document.querySelector('#armazon');

    let indexEv = selectEvIndex.selectedIndex;
    let indexMi = selectMiIndex.selectedIndex;
    let indexMa = selectMaIndex.selectedIndex;
    let indexA = selectArIndex.selectedIndex;

    console.log(indexEv);
    console.log(examenVistaL[indexEv]);
    let presupuesto = {'examenDeVista': examenVistaL[indexEv], 'clave': Math.random() * 10000000};
    let alturaOblea = document.getElementById("altura").value;
    let descuento = document.getElementById("descuento").value;
    let cantidad = document.getElementById("cantidad").value;

    presupuestoLentes[indexVS] = {'alturaOblea': alturaOblea, 'presupuesto': presupuesto, 'tipoMica': tipoMicas[indexMi], 'material': materiales[indexMa], 'armazon': armazones[indexA], 'tratamientos': obtenerTSelecionados()};
    ventaPresupuestoLentes[indexVS] = {'presupuestoLentes': presupuestoLentes[indexVS], 'cantidad': cantidad, 'descuento': descuento, 'precioUnitario': cantidadTotal};
    indexVS++;

    let venta = {clave: Math.random() * 10000000, empleado: user};
    let dvp = {'ventaPresupuestoLentes': ventaPresupuestoLentes, 'venta': venta};
    let datos = {'datosVentaL': JSON.stringify(dvp)};
    calcularPrecioTotal();
    let params = new URLSearchParams(datos);

    console.log(params);

    fetch("api/vental/generarvl",
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
}

export function calcularPrecioTotal() {
    const selectMiIndex = document.querySelector('#mica');
    const selectMaIndex = document.querySelector('#material');
    const selectArIndex = document.querySelector('#armazon');

    let indexMi = selectMiIndex.selectedIndex;
    let indexMa = selectMaIndex.selectedIndex;
    let indexA = selectArIndex.selectedIndex;
    
    let precioTM = 0;
    let precioMa = 0;
    let precioAr = 0;
    let precioTr = 0;
    let precioT = 0;
    let descuento = (document.getElementById("descuento").value/100);
    let cantidad = document.getElementById("cantidad").value;
    
    tratamientosSel.forEach(preciot =>{
        precioTr += preciot.precioVenta;
    });
    precioTM = tipoMicas[indexMi].precioVenta;
    precioMa = materiales[indexMa].precioVenta;
    precioAr = armazones[indexA].producto.precioVenta;
    
    precioT = (precioTM + precioMa + precioAr + precioTr) * cantidad;
    cantidadTotal = precioT - (precioT * descuento);
    document.getElementById("txtCantidadTotalL").innerHTML = "Total: $" + cantidadTotal;
}
