/* global fetch, Swal */

let indexMaterialSeleccionado;
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

export function addMaterial() {
    let
            nombre,
            precioCompra,
            precioVenta;


    nombre = document.getElementById("txtNombreMaterial").value;
    precioCompra = parseInt(document.getElementById("txtPrecioCompraMaterial").value);
    precioVenta = parseInt(document.getElementById("txtPrecioVentaMaterial").value);

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
                '<tr onclick="moduloMaterial.selectMaterial(' + tratamientos.indexOf(tratamiento) + ');">' +
                '<td>' + tratamiento.nombre + '</td>' +
                '<td>$' + tratamiento.precioCompra + '</td>' +
                '<td>$' + tratamiento.precioVenta + '</td>' +
                '<td>' + tratamiento.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblMaterial").innerHTML = cuerpo;

}

export function buscarMaterial() {
    let filtro = document.getElementById("txtBusquedaMaterial").value;

    let filtroMinuscula = filtro.toLowerCase();

    let resultados = tratamientos.filter(element => element.precioCompra === filtro || element.precioVenta === filtro || element.nombre.toLowerCase().split(' ')[0] === filtroMinuscula || element.nombre.toLowerCase().split(' ')[1] === filtroMinuscula || element.nombre === filtro);

    let cuerpo = "";
    resultados.forEach(function (tratamiento) {
        let registro =
                '<tr onclick="moduloMaterial.selectMaterial(' + tratamientos.indexOf(tratamiento) + ');">' +
                '<td>' + tratamiento.nombre + '</td>' +
                '<td>$' + tratamiento.precioCompra + '</td>' +
                '<td>$' + tratamiento.precioVenta + '</td>' +
                '<td>' + tratamiento.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblMaterial").innerHTML = cuerpo;


}

export function selectMaterial(index) {
    if (tratamientos[index].estatus === "Inactivo") {
        Swal.fire('Material eliminado!', '', 'warning');
    } else {
        document.getElementById("txtNombreMaterial").value = tratamientos[index].nombre;
        document.getElementById("txtPrecioCompraMaterial").value = parseInt(tratamientos[index].precioCompra);
        document.getElementById("txtPrecioVentaMaterial").value = parseInt(tratamientos[index].precioVenta);
        document.getElementById("btnUpdateTra").classList.remove("disabled");
        document.getElementById("btnDeleteTra").classList.remove("disabled");
        document.getElementById("btnAddTra").classList.add("disabled");
        indexMaterialSeleccionado = index;
    }
}

export function clean() {
    document.getElementById("txtNombreMaterial").value = "";
    document.getElementById("txtPrecioCompraMaterial").value = "";
    document.getElementById("txtPrecioVentaMaterial").value = "";


    document.getElementById("btnUpdateTra").classList.add("disabled");
    document.getElementById("btnDeleteTra").classList.add("disabled");
    document.getElementById("btnAddTra").classList.remove("disabled");
    indexMaterialSeleccionado = 0;
}

export function updateMaterial() {
    let
            nombre,
            precioCompra,
            precioVenta;

    nombre = document.getElementById("txtNombreMaterial").value;
    precioCompra = parseInt(document.getElementById("txtPrecioCompraMaterial").value);
    precioVenta = parseInt(document.getElementById("txtPrecioVentaMaterial").value);


    let tratamiento = {};
    tratamiento.nombre = nombre;
    tratamiento.precioCompra = precioCompra;
    tratamiento.precioVenta = precioVenta;

    tratamiento.estatus = "Activo";
    tratamientos[indexMaterialSeleccionado] = tratamiento;
    clean();
    loadTabla();
}

export function modificarMaterial() {
    Swal.fire({
        title: '¿Quieres modificar el material?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#6200EE',
        denyButtonText: `No guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            updateMaterial();
            Swal.fire('Guardado!', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guargados!', '', 'warning');
        }
    });
}

export function deleteMaterial() {
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
            tratamientos[indexMaterialSeleccionado].estatus = "Inactivo";
            clean();
            loadTabla();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}

fetch("modulos/catalogoMateriales/datos_materiales.json")
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

