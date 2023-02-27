/* global fetch, Swal */

let indexSolucionSeleccionado;
let soluciones = [];

export function inicializar() {
    configureTableFilter(document.getElementById('txtBusquedaSolucion'),
            document.getElementById('tablaSol'));

    $('#desplegar').on('click', function () {
        $('#form').css('display', 'block');
        $('#listar').css('display', 'block');
        $('#desplegar').css('display', 'none');
        $('#tablaSol').css('display', 'none');
        $('#buscar').css('display', 'none');
    });

    $('#listar').on('click', function () {
        $('#form').css('display', 'none');
        $('#listar').css('display', 'none');
        $('#desplegar').css('display', 'block');
        $('#tablaSol').css('display', '');
        $('#buscar').css('display', 'block');
    });
    refrescarTabla();
}

export function guardarSolucion() {
    let datos = null;
    let params = null;
    let solucion = new Object();

    solucion.producto = new Object();

    if (document.getElementById("txtIdSolucion").value.trim().length < 1) {
        solucion.idSolucion = 0;
        solucion.producto.idProducto = 0;
    } else {
        solucion.idSolucion = parseInt(document.getElementById("txtIdSolucion").value);
        solucion.producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
    }

    solucion.producto.codigoBarras = document.getElementById("txtCodigoBarrasSol").value;
    solucion.producto.nombre = document.getElementById("txtNombreSol").value;
    solucion.producto.marca = document.getElementById("txtMarcaSol").value;
    solucion.producto.precioCompra = document.getElementById("txtPrecioCompraSol").value;
    solucion.producto.precioVenta = document.getElementById("txtPrecioVentaSol").value;
    solucion.producto.existencias = document.getElementById("txtExistenciasSol").value;

    datos = {
        datosSolucion: JSON.stringify(solucion)
    };

    params = new URLSearchParams(datos);

    fetch("api/solucion/save", {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: params
    }).then(response => {
        return response.json();
    }).then(function (data) {
        if (data.exception != null) {
            Swal.fire('', 'Error interno del servidor. Intente nuevamente más tarde.', 'error');
            return;
        }
        if (data.error != null) {
            Swal.fire('', data.error, 'warning');
            return;
        }
        if (data.errorperm != null) {
            Swal.fire('', 'No tiene permiso para realizar esta operación', 'error');
            return;
        } else {
            document.getElementById("txtIdProducto").value = data.producto.idProducto;
            document.getElementById("txtIdSolucion").value = data.idSolucion;
            Swal.fire('', 'Datos de solucion actualizados correctamente.', 'success');
            refrescarTabla();
            limpiarFormulario();
        }
    });
}

export function registrarSolucion() {
    if (campos.nombreSol && campos.marcaSol && campos.DescripcionSol && campos.precioVentaSol && campos.precioCompraSol && campos.existenciasSol) {
        guardarSolucion();
        Swal.fire('Registro Guardado!', ' ', 'success');
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Datos incorrectos o vacios'
        });
    }
}

export function refrescarTabla() {
    let url = "api/solucion/getAll";
    fetch(url).then(response => {
        return response.json();
    }).then(function (data) {
        if (data.exception != null) {
            Swal.fire('', 'Error interno de servidar. Intente nuevamente más tarde.', 'error')
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
export function cargarTabla(data) {
    let cuerpo = "";
    soluciones = data;
    soluciones.forEach(function (solucion) {
        let registro =
                '<tr onclick="moduloSoluciones.seleccionarSolucion(' + soluciones.indexOf(solucion) + ');">' +
                '<td>' + solucion.producto.nombre + '</td>' +
                '<td>' + solucion.producto.marca + '</td>' +
                '<td>$' + solucion.producto.precioCompra + '</td>' +
                '<td>$' + solucion.producto.precioVenta + '</td>' +
                '<td>' + solucion.producto.existencias + ' Pzas</td>' +
                '<td>' + solucion.producto.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblSoluciones").innerHTML = cuerpo;
}

export function seleccionarSolucion(index) {
    if (soluciones[index].estatus === "Inactivo") {
        Swal.fire('Solucion eliminada', '', 'warning');
    } else {
        document.getElementById("txtIdSolucion").value = soluciones[index].idSolucion;
        document.getElementById("txtIdProducto").value = soluciones[index].producto.idProducto;
        document.getElementById("txtNombreSol").value = soluciones[index].producto.nombre;
        document.getElementById("txtMarcaSol").value = soluciones[index].producto.marca;
        document.getElementById("txtPrecioCompraSol").value = soluciones[index].producto.precioCompra;
        document.getElementById("txtPrecioVentaSol").value = soluciones[index].producto.precioVenta;
        document.getElementById("txtExistenciasSol").value = soluciones[index].producto.existencias;
        document.getElementById("txtCodigoBarrasSol").value = soluciones[index].producto.codigoBarras;
        JsBarcode("#codigoBarraSol", soluciones[index].producto.codigoBarras, {
            format: "CODE128A",
            lineColor: "#000",
            width: 1.5,
            height: 30,
            displayValue: true
        });
        document.getElementById("btnDeleteSol").classList.remove("disabled");
        indexSolucionSeleccionado = index;
    }
}

export function limpiarFormulario() {
    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtIdSolucion").value = "";
    document.getElementById("txtNombreSol").value = "";
    document.getElementById("txtMarcaSol").value = "";
    document.getElementById("txtPrecioCompraSol").value = "";
    document.getElementById("txtPrecioVentaSol").value = "";
    document.getElementById("txtExistenciasSol").value = "";
    JsBarcode("#codigoBarraSol", " ", {
        format: "CODE128A",
        lineColor: "#000",
        width: 1.5,
        height: 30,
        displayValue: true
    });
    document.getElementById("btnDeleteSol").classList.add("disabled");
    document.getElementById("btnAddSol").classList.remove("disabled");
    indexSolucionSeleccionado = 0;
}

export function borrarSolucion() {
    Swal.fire({
        title: '¿Quieres eliminar la solución seleccionada?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#6200EE',
        cancelButtonColor: '#d33',
        CancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarSolucion();
            limpiarFormulario();
            Swal.fire('Eliminada con exito!', '', 'success');
        }
    });
}

export function eliminarSolucion() {
    let datos = null;
    let params = null;
    let solucion = new Object();

    solucion.producto = new Object();

    solucion.idSolucion = parseInt(document.getElementById("txtIdSolucion").value);
    solucion.producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
    solucion.producto.codigoBarras = document.getElementById("txtCodigoBarrasSol").value;
    solucion.producto.nombre = document.getElementById("txtNombreSol").value;
    solucion.producto.marca = document.getElementById("txtMarcaSol").value;
    solucion.producto.precioCompra = document.getElementById("txtPrecioCompraSol").value;
    solucion.producto.precioVenta = document.getElementById("txtPrecioVentaSol").value;
    solucion.producto.existencias = document.getElementById("txtExistenciasSol").value;

    datos = {
        datosSolucion: JSON.stringify(solucion)
    };

    params = new URLSearchParams(datos);

    fetch("api/solucion/delete", {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: params
    })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null) {
                    Swal.fire('', 'Error interno del servidor. Intente nuevamente más tarde.', 'error');
                    return;
                }
                if (data.error != null) {
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if (data.errorperm != null) {
                    Swal.fire('', 'No tiene permiso para realizar esta operación', 'error');
                    return;
                } else {
                    refrescarTabla();
                    limpiarFormulario();
                }
            });
}

//-----------------------------------------------------VALIDACION DE CAMPOS---------------------------------------------------------- 
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombreSol: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    marcaSol: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    DescripcionSol: /^.{4,200}$/,
    precioCompraSol: /^\d{1,10000}$/,
    precioVentaSol: /^\d{1,10000}$/,
    existenciasSol: /^\d{1,10000}$/ // 7 a 14 numeros.
};

const campos = {
    nombreSol: false,
    marcaSol: false,
    DescripcionSol: false,
    precioCompraSol: false,
    precioVentaSol: false,
    existenciasSol: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombreSol":
            validarCampo(expresiones.nombreSol, e.target, 'nombreSol');
            break;
        case "marcaSol":
            validarCampo(expresiones.marcaSol, e.target, 'marcaSol');
            break;
        case "DescripcionSol":
            validarCampo(expresiones.DescripcionSol, e.target, 'DescripcionSol');
            break;
        case "precioCompraSol":
            validarCampo(expresiones.precioCompraSol, e.target, 'precioCompraSol');
            break;
        case "precioVentaSol":
            validarCampo(expresiones.precioVentaSol, e.target, 'precioVentaSol');
            break;
        case "existenciasSol":
            validarCampo(expresiones.existenciasSol, e.target, 'existenciasSol');
            break;
    }
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

export function agregarSoluciones() {
    if (campos.nombreSol && campos.marcaSol && campos.DescripcionSol && campos.precioCompraSol && campos.precioVentaSol && campos.existenciasSol) {
        addSolucion();
        Swal.fire('Registro Guardado!', '', 'success');
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Datos incorrectos o vacios'
        });
    }
}
