/* global fetch, Swal, CryptoJS */
let indexAccesorioSeleccionado;
let accesorios = [];
export function inicializar() {
    $('#desplegar').on('click', function () {
        $('#form').css('display', 'block');
        $('#listar').css('display', 'block');
        $('#desplegar').css('display', 'none');
        $('#tabla').css('display','none');
        $('#buscar').css('display','none');
    });

    $('#listar').on('click', function () {
        $('#form').css('display', 'none');
        $('#listar').css('display', 'none');
        $('#desplegar').css('display', 'block');
        $('#tabla').css('display','');
        $('#buscar').css('display','block');
    });
    refrescarTabla();
}

export function guardarAccesorio() {
    let datos = null;
    let params = null;
    let accesorio = new Object();

    accesorio.producto = new Object();

    if (document.getElementById("txtCodigoAccesorio").value.trim().length < 1) {
        accesorio.idAccesorio = 0;
        accesorio.producto.idProducto = 0;
    } else {
        accesorio.idAccesorio = parseInt(document.getElementById("txtCodigoAccesorio").value);
        accesorio.producto.idProducto = parseInt(document.getElementById("txtCodigoProducto").value);
    }

    accesorio.producto.codigoBarras = document.getElementById("txtCodigoBarras").value;
    accesorio.producto.nombre = document.getElementById("txtNombreAccesorio").value;
    accesorio.producto.marca = document.getElementById("txtMarcaA").value;
    accesorio.producto.precioCompra = parseFloat(document.getElementById("txtPrecioCompraA").value);
    accesorio.producto.precioVenta = parseFloat(document.getElementById("txtPrecioVentaA").value);
    accesorio.producto.existencias = parseInt(document.getElementById("txtExistenciaA").value);

    datos = {
        datosAccesorio: JSON.stringify(accesorio)
    };

    params = new URLSearchParams(datos);

    fetch("api/accesorio/save",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
//                console.log(data);
//                if (data.exception !== null) {
//                    Swal.fire('', 'Error interno del servidor. Intente nuevamente más tarde.', 'error');
//                    return;
//                }
//                if (data.error !== null) {
//                    Swal.fire('', data.error, 'warning');
//                    return;
//                }
//                if (data.errorperm !== null) {
//                    Swal.fire('', 'No tiene permiso para realizar esta operación', 'error');
//                    return;
//                }

                document.getElementById("txtCodigoAccesorio").value = data.idAccesorio;
                document.getElementById("txtCodigoProducto").value = data.producto.idProducto;
                Swal.fire('', 'Datos del accesorio actualizados correctamente.', 'success');
                refrescarTabla();
                limpiarFormulario();
            });
}

export function eliminarAccesorio() {
    let datos = null;
    let params = null;
    let accesorio = new Object();

    accesorio.producto = new Object();

    accesorio.idAccesorio = parseInt(document.getElementById("txtCodigoAccesorio").value);
    accesorio.producto.idProducto = parseInt(document.getElementById("txtCodigoProducto").value);
    accesorio.producto.codigoBarras = document.getElementById("txtCodigoBarras").value;
    accesorio.producto.nombre = document.getElementById("txtNombreAccesorio").value;
    accesorio.producto.marca = document.getElementById("txtMarcaA").value;
    accesorio.producto.precioCompra = parseFloat(document.getElementById("txtPrecioCompraA").value);
    accesorio.producto.precioVenta = parseFloat(document.getElementById("txtPrecioVentaA").value);
    accesorio.producto.existencias = parseInt(document.getElementById("txtExistenciaA").value);

    datos = {
        datosAccesorio: JSON.stringify(accesorio)
    };

    params = new URLSearchParams(datos);

    fetch("api/accesorio/delete",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
//                console.log(data);
//                if (data.exception !== null) {
//                    Swal.fire('', 'Error interno del servidor. Intente nuevamente más tarde.', 'error');
//                    return;
//                }
//                if (data.error !== null) {
//                    Swal.fire('', data.error, 'warning');
//                    return;
//                }
//                if (data.errorperm !== null) {
//                    Swal.fire('', 'No tiene permiso para realizar esta operación', 'error');
//                    return;
//                }
                refrescarTabla();
                limpiarFormulario();
            });

}

export function refrescarTabla() {
    let url = "api/accesorio/getAll";
    fetch(url)
            .then(response => {
                return response.json()
        
            })
            .then(function (data)
            {
                console.log(data);
//                if (data.exception !== null) {
//                    Swal.fire('',
//                            'Error interno del servidor. Intente nuevamente más tarde',
//                            'error'
//                            );
//                    return;
//                }
//                if (data.error !== null) {
//                    Swal.fire('', data.error, 'warning');
//                    return;
//                }
//                if (data.errorsec !== null) {
//                    Swal.fire('', data.errorsec, 'error');
//                    window.location.replace('index.html');
//                    return;
//                }
                cargarTabla(data);
            });
}

export function cargarTabla(data) {
    let cuerpo = "";
    accesorios = data;
    accesorios.forEach(function (accesorio) {
        let registro =
                '<tr onclick="moduloAccesorio.seleccionarAccesorio(' + accesorios.indexOf(accesorio) + ');">' +
                '<td>' + accesorio.producto.nombre + '</td>' +
                '<td>$' + accesorio.producto.precioCompra + '</td>' +
                '<td>$' + accesorio.producto.precioVenta + '</td>' +
                '<td>' + accesorio.producto.existencias + ' Pzas</td>' +
                '<td>' + accesorio.producto.estatus + '</td></tr>';
        cuerpo += registro;
    });

    document.getElementById("tblAccesorio").innerHTML = cuerpo;

}

export function buscarAccesorio() {
    let filtro = document.getElementById("txtBusquedaAccesorio").value;

    let resultados = accesorios.filter(element => element.nombre === filtro);

    let cuerpo = "";
    resultados.forEach(function (accesorio) {
        let registro =
                '<tr onclick="moduloAccesorio.seleccionarAccesorio(' + accesorios.indexOf(accesorio) + ');">' +
                '<td>' + accesorio.nombre + '</td>' +
                '<td>$' + accesorio.precioCompra + '</td>' +
                '<td>$' + accesorio.precioVenta + '</td>' +
                '<td>' + accesorio.existencias + ' Pzas</td>' +
                '<td>' + accesorio.producto.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblAccesorio").innerHTML = cuerpo;


}

export function seleccionarAccesorio(index) {
    
    habilitarFormulario();
    document.getElementById("txtNombreAccesorio").value = accesorios[index].producto.nombre;
    document.getElementById("txtPrecioCompraA").value = accesorios[index].producto.precioCompra;
    document.getElementById("txtPrecioVentaA").value = accesorios[index].producto.precioVenta;
    document.getElementById("txtExistenciaA").value = accesorios[index].producto.existencias;
    document.getElementById("txtMarcaA").value = accesorios[index].producto.marca;
    document.getElementById("txtCodigoBarras").value = accesorios[index].producto.codigoBarras;
    document.getElementById("txtCodigoProducto").value = accesorios[index].producto.idProducto;
    document.getElementById("txtCodigoAccesorio").value = accesorios[index].idAccesorio;
    JsBarcode("#codigoBarra", accesorios[index].producto.codigoBarras, {
            format: "CODE128A",
            lineColor: "#000",
            width: 1.5,
            height: 30,
            displayValue: true
        });
    document.getElementById("btnDeleteAcc").classList.remove("disabled");
    indexAccesorioSeleccionado = index;
    
    if (accesorios[index].producto.estatus === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Accesorio eliminado',
            text: 'No podra modificar nada a menos que lo vuelva a activar'
        });
        deshabilitarFormulario();
        document.getElementById("btnAddAcc").classList.add("disabled");
        document.getElementById("btnDeleteAcc").classList.add("disabled");
    }
}

export function limpiarFormulario() {

    document.getElementById("txtNombreAccesorio").value = "";
    document.getElementById("txtPrecioCompraA").value = "";
    document.getElementById("txtPrecioVentaA").value = "";
    document.getElementById("txtExistenciaA").value = "";
    document.getElementById("txtMarcaA").value = "";
    document.getElementById("txtCodigoBarras").value = "";
    document.getElementById("txtCodigoProducto").value = "";
    document.getElementById("txtCodigoAccesorio").value = "";
    JsBarcode("#codigoBarra", " ", {
            format: "CODE128A",
            lineColor: "#000",
            width: 1.5,
            height: 30,
            displayValue: true
        });
    document.getElementById("btnAddAcc").classList.remove("disabled");
    document.getElementById("btnDeleteAcc").classList.add("disabled");
    indexAccesorioSeleccionado = 0;
}

export function borrarAccesorio() {
    Swal.fire({
        title: '¿Quieres eliminar el accesorio seleccionado?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#6200EE',
        cancelButtonColor: '#d33',
        CancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarAccesorio();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}

export function habilitarFormulario() {
    document.getElementById("txtNombreAccesorio").disabled = false;
    document.getElementById("txtPrecioCompraA").disabled = false;
    document.getElementById("txtPrecioVentaA").disabled = false;
    document.getElementById("txtExistenciaA").disabled = false;
    document.getElementById("txtMarcaA").disabled = false;
    document.getElementById("txtCodigoBarras").disabled = false;
    document.getElementById("txtCodigoProducto").disabled = false;
    document.getElementById("txtCodigoAccesorio").disabled = false;
}

export function deshabilitarFormulario() {
    document.getElementById("txtNombreAccesorio").disabled = true;
    document.getElementById("txtPrecioCompraA").disabled = true;
    document.getElementById("txtPrecioVentaA").disabled = true;
    document.getElementById("txtExistenciaA").disabled = true;
    document.getElementById("txtMarcaA").disabled = true;
    document.getElementById("txtCodigoBarras").disabled = true;
    document.getElementById("txtCodigoProducto").disabled = true;
    document.getElementById("txtCodigoAccesorio").disabled = true;
}

//------------------ Validacion -------------------------//

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {

    nombreA: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    precioC: /^\d{1,40}$/,
    precioV: /^\d{1,40}$/,
    marcaA: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    existenciaA: /^\d{1,40}$/
};

const campos = {

    nombreA: false,
    precioC: false,
    precioV: false,
    marcaA: false,
    existenciaA: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombreA":
            validarCampo(expresiones.nombreA, e.target, 'nombreA');
            break;
        case "precioC":
            validarCampo(expresiones.precioC, e.target, 'precioC');
            break;
        case "precioV":
            validarCampo(expresiones.precioV, e.target, 'precioV');
            break;
        case "marcaA":
            validarCampo(expresiones.marcaA, e.target, 'marcaA');
            break;
        case "existenciaA":
            validarCampo(expresiones.existenciaA, e.target, 'existenciaA');
            break;

    }
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});
