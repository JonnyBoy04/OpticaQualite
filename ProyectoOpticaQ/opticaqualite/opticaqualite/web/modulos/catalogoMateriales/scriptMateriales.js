/* global fetch, Swal */

let indexMaterialSeleccionado;
let materiales = [];

export function inicializar() {
    configureTableFilter(document.getElementById('txtBusquedaMaterial'),
            document.getElementById('tablaMat'));
    $('#desplegar').on('click', function () {
        $('#form').css('display', 'block');
        $('#listar').css('display', 'block');
        $('#desplegar').css('display', 'none');
        $('#tablaMat').css('display', 'none');
        $('#buscar').css('display', 'none');
    });

    $('#listar').on('click', function () {
        $('#form').css('display', 'none');
        $('#listar').css('display', 'none');
        $('#desplegar').css('display', 'block');
        $('#tablaMat').css('display', '');
        $('#buscar').css('display', 'block');
    });
    refrescarTabla();
}

export function guardarMaterial() {
    let datos = null;
    let params = null;
    let material = new Object();

    if (document.getElementById("txtCodigoMaterial").value.trim().length < 1) {
        material.idMaterial = 0;
    } else {
        material.idMaterial = parseInt(document.getElementById("txtCodigoMaterial").value);
    }

    material.nombre = document.getElementById("txtNombreMaterial").value;
    material.precioCompra = parseFloat(document.getElementById("txtPrecioCompraMaterial").value);
    material.precioVenta = parseFloat(document.getElementById("txtPrecioVentaMaterial").value);

    datos = {
        datosMaterial: JSON.stringify(material)
    };

    params = new URLSearchParams(datos);

    fetch("api/material/save",
            {
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
                    document.getElementById("txtCodigoMaterial").value = data.idMaterial;
                    Swal.fire('', 'Datos del material actualizados correctamente.', 'success');
                    refrescarTabla();
                    limpiarFormulario();
                }
            });
}

export function eliminarMaterial() {
    let datos = null;
    let params = null;
    let material = new Object();

    material.idMaterial = parseInt(document.getElementById("txtCodigoMaterial").value);
    material.nombre = document.getElementById("txtNombreMaterial").value;
    material.precioCompra = parseFloat(document.getElementById("txtPrecioCompraMaterial").value);
    material.precioVenta = parseFloat(document.getElementById("txtPrecioVentaMaterial").value);

    datos = {
        datosMaterial: JSON.stringify(material)
    };

    params = new URLSearchParams(datos);

    fetch("api/material/delete",
            {
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

export function registrarMaterial() {
    if (campos.nombreMa && campos.precioVMa && campos.precioCMa) {
        guardarMaterial();
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
    let url = "api/material/getAll";
    fetch(url)
            .then(response => {
                return response.json()

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

export function cargarTabla(data) {
    let cuerpo = "";
    materiales = data;
    materiales.forEach(function (tratamiento) {
        let registro =
                '<tr onclick="moduloMaterial.seleccionarMaterial(' + materiales.indexOf(tratamiento) + ');">' +
                '<td>' + tratamiento.nombre + '</td>' +
                '<td>$' + tratamiento.precioCompra + '</td>' +
                '<td>$' + tratamiento.precioVenta + '</td>' +
                '<td>' + tratamiento.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblMaterial").innerHTML = cuerpo;

}


export function seleccionarMaterial(index) {
    if (materiales[index].estatus === "Inactivo") {
        Swal.fire('Material eliminado!', '', 'warning');
    } else {
        document.getElementById("txtCodigoMaterial").value = materiales[index].idMaterial;
        document.getElementById("txtNombreMaterial").value = materiales[index].nombre;
        document.getElementById("txtPrecioCompraMaterial").value = parseInt(materiales[index].precioCompra);
        document.getElementById("txtPrecioVentaMaterial").value = parseInt(materiales[index].precioVenta);
        document.getElementById("btnDeleteTra").classList.remove("disabled");
        indexMaterialSeleccionado = index;
    }
}

export function limpiarFormulario() {
    document.getElementById("txtCodigoMaterial").value = "";
    document.getElementById("txtNombreMaterial").value = "";
    document.getElementById("txtPrecioCompraMaterial").value = "";
    document.getElementById("txtPrecioVentaMaterial").value = "";
    document.getElementById("btnDeleteTra").classList.add("disabled");
    indexMaterialSeleccionado = 0;
}

export function borrarMaterial() {
    Swal.fire({
        title: '¿Quieres eliminar el material seleccionado?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#6200EE',
        cancelButtonColor: '#d33',
        CancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarMaterial();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}

//------------------ Validacion -------------------------//

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {

    nombreMa: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    precioCMa: /^\d{1,40}$/,
    precioVMa: /^\d{1,40}$/

};

const campos = {

    nombreMa: false,
    precioCMa: false,
    precioVMa: false

};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombreMa":
            validarCampo(expresiones.nombreMa, e.target, 'nombreMa');
            break;
        case "precioCMa":
            validarCampo(expresiones.precioCMa, e.target, 'precioCMa');
            break;
        case "precioVMa":
            validarCampo(expresiones.precioVMa, e.target, 'precioVMa');
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

export function agregarMaterial() {
    if (campos.nombreMa && campos.precioCMa && campos.precioVMa) {
        addMaterial();
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

