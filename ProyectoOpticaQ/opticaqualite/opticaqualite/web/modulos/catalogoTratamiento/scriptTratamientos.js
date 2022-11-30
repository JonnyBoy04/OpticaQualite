/* global fetch, Swal */

let indexTratamientoSeleccionado;
let tratamientos = [];

export function inicializar() {
    configureTableFilter(document.getElementById('txtBusquedaTratamiento'),
                         document.getElementById('tablaTra'));
                         
    $('#desplegar').on('click', function () {
        $('#form').css('display', 'block');
        $('#listar').css('display', 'block');
        $('#desplegar').css('display', 'none');
        $('#tablaTra').css('display','none');
        $('#buscar').css('display','none');
    });

    $('#listar').on('click', function () {
        $('#form').css('display', 'none');
        $('#listar').css('display', 'none');
        $('#desplegar').css('display', 'block');
        $('#tablaTra').css('display','');
        $('#buscar').css('display','block');
    });
    refrescarTabla();
}

export function guardarTratamiento() {
    let datos = null;
    let params = null;
    let tratamiento = new Object();
    
    if (document.getElementById("txtCodigoTratamineto").value.trim().length < 1) {
        tratamiento.idTratamiento = 0;
    }else{
        tratamiento.idTratamiento = parseInt(document.getElementById("txtCodigoTratamineto").value);
    }
    
    tratamiento.nombre = document.getElementById("txtNombreTratamiento").value;
    tratamiento.precioCompra = parseFloat(document.getElementById("txtPrecioCompraTratamiento").value);
    tratamiento.precioVenta = parseFloat(document.getElementById("txtPrecioVentaTratamiento").value);
    
    datos = {
        datosTratamiento: JSON.stringify(tratamiento)
    };

    params = new URLSearchParams(datos);

    fetch("api/tratamiento/save",
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

                document.getElementById("txtCodigoTratamineto").value = data.idTratamiento;
                Swal.fire('', 'Datos del tratamiento actualizados correctamente.', 'success');
                refrescarTabla();
                limpiarFormulario();
            });
}

export function refrescarTabla() {
    let url = "api/tratamiento/getAll";
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
    tratamientos = data;
    tratamientos.forEach(function (tratamiento) {
        let registro =
                '<tr onclick="moduloTratamientos.selectTratamiento(' + tratamientos.indexOf(tratamiento) + ');">' +
                '<td>' + tratamiento.nombre + '</td>' +
                '<td>$' + tratamiento.precioCompra + '</td>' +
                '<td>$' + tratamiento.precioVenta + '</td>' +
                '<td>' + tratamiento.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblTratamiento").innerHTML = cuerpo;
}


export function selectTratamiento(index) {
    if (tratamientos[index].estatus === 0) {
        Swal.fire('Tratamiento eliminado!', '', 'warning');
    } else {
        document.getElementById("txtCodigoTratamineto").value = tratamientos[index].idTratamiento;
        document.getElementById("txtNombreTratamiento").value = tratamientos[index].nombre;
        document.getElementById("txtPrecioCompraTratamiento").value = parseInt(tratamientos[index].precioCompra);
        document.getElementById("txtPrecioVentaTratamiento").value = parseInt(tratamientos[index].precioVenta);
        document.getElementById("btnDeleteTra").classList.remove("disabled");
        indexTratamientoSeleccionado = index;
    }
}

export function limpiarFormulario() {
    document.getElementById("txtCodigoTratamineto").value = "";
    document.getElementById("txtNombreTratamiento").value = "";
    document.getElementById("txtPrecioCompraTratamiento").value = "";
    document.getElementById("txtPrecioVentaTratamiento").value = "";
    document.getElementById("btnDeleteTra").classList.add("disabled");
    indexTratamientoSeleccionado = 0;
}

export function deleteTratamiento() {
    Swal.fire({
        title: '¿Quieres eliminar el tratamiento seleccionado?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#6200EE',
        cancelButtonColor: '#d33',
        CancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            tratamientos[indexTratamientoSeleccionado].estatus = "Inactivo";
            clean();
            loadTabla();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}
//------------------ Validacion -------------------------//

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {

    nombreT: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    precioCT: /^\d{1,40}$/,
    precioVT: /^\d{1,40}$/

};

const campos = {

    nombreT: false,
    precioCT: false,
    precioVT: false

};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombreT":
            validarCampo(expresiones.nombreT, e.target, 'nombreT');
            break;
        case "precioCT":
            validarCampo(expresiones.precioCT, e.target, 'precioCT');
            break;
        case "precioVT":
            validarCampo(expresiones.precioVT, e.target, 'precioVT');
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

export function agregarTratamiento() {
    if (campos.nombreT && campos.precioCT && campos.precioVT) {
        addTratamiento();
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

