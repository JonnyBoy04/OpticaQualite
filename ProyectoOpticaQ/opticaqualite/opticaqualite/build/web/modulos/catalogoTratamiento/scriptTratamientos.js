/* global fetch, Swal */

let indexTratamientoSeleccionado;
let tratamientos = [];

$('#desplegar').on('click', function(){
    $('#form').css('display','block');
    $('#listar').css('display','block');
    $('#desplegar').css('display','none');
});

$('#listar').on('click', function(){
    $('#form').css('display','none');
    $('#listar').css('display','none');
    $('#desplegar').css('display','block');
});

export function addTratamiento() {
    let
            nombre,
            precioCompra,
            precioVenta;


    nombre = document.getElementById("txtNombreTratamiento").value;
    precioCompra = parseInt(document.getElementById("txtPrecioCompraTratamiento").value);
    precioVenta = parseInt(document.getElementById("txtPrecioVentaTratamiento").value);

    let tratamiento = {};

    tratamiento.nombre = nombre;
    tratamiento.precioCompra = precioCompra;
    tratamiento.precioVenta = precioVenta;

    tratamiento.estatus = "Activo";
    tratamientos.push(tratamiento);
    clean();
    loadTabla();
}

export function loadTabla() {
    let cuerpo = "";
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

export function buscarTratamiento() {
    let filtro = document.getElementById("txtBusquedaTratamiento").value;

    let filtroMinuscula = filtro.toLowerCase();

    let resultados = tratamientos.filter(element => element.nombre.toLowerCase().split(' ')[0] === filtroMinuscula || element.nombre.toLowerCase().split(' ')[1] === filtroMinuscula || element.nombre === filtro);

    let cuerpo = "";
    resultados.forEach(function (tratamiento) {
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
    if (tratamientos[index].estatus === "Inactivo") {
        Swal.fire('Tratamiento eliminado!', '', 'warning');
    } else {
        document.getElementById("txtNombreTratamiento").value = tratamientos[index].nombre;
        document.getElementById("txtPrecioCompraTratamiento").value = parseInt(tratamientos[index].precioCompra);
        document.getElementById("txtPrecioVentaTratamiento").value = parseInt(tratamientos[index].precioVenta);
        document.getElementById("btnUpdateTra").classList.remove("disabled");
        document.getElementById("btnDeleteTra").classList.remove("disabled");
        document.getElementById("btnAddTra").classList.add("disabled");
        indexTratamientoSeleccionado = index;
    }
}

export function clean() {
    document.getElementById("txtNombreTratamiento").value = "";
    document.getElementById("txtPrecioCompraTratamiento").value = "";
    document.getElementById("txtPrecioVentaTratamiento").value = "";


    document.getElementById("btnUpdateTra").classList.add("disabled");
    document.getElementById("btnDeleteTra").classList.add("disabled");
    document.getElementById("btnAddTra").classList.remove("disabled");
    indexTratamientoSeleccionado = 0;
}

export function updateTratamiento() {
    let
            nombre,
            precioCompra,
            precioVenta;

    nombre = document.getElementById("txtNombreTratamiento").value;
    precioCompra = parseInt(document.getElementById("txtPrecioCompraTratamiento").value);
    precioVenta = parseInt(document.getElementById("txtPrecioVentaTratamiento").value);


    let tratamiento = {};
    tratamiento.nombre = nombre;
    tratamiento.precioCompra = precioCompra;
    tratamiento.precioVenta = precioVenta;

    tratamiento.estatus = "Activo";
    tratamientos[indexTratamientoSeleccionado] = tratamiento;
    clean();
    loadTabla();
}

export function modificarTratamiento() {
    Swal.fire({
        title: '¿Quieres modificar el tratamiento?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#6200EE',
        denyButtonText: `No guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            updateTratamiento();
            Swal.fire('Guardado!', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guargados!', '', 'warning');
        }
    });
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

fetch("modulos/catalogoTratamiento/datos_tratamientos.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            tratamientos = jsondata;
            loadTabla();
        }
        );

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

