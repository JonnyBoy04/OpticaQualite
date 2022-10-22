/* global fetch, Swal */

let indexSolucionSeleccionado;
let soluciones = [];

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

export function addSolucion() {
    let nombre,
            marca,
            descripcion,
            precioCompra,
            precioVenta,
            existencias;

    nombre = document.getElementById("txtNombreSol").value;
    marca = document.getElementById("txtMarcaSol").value;
    descripcion = document.getElementById("txtDescripcionSol").value;
    precioCompra = parseInt(document.getElementById("txtPrecioCompraSol").value);
    precioVenta = parseInt(document.getElementById("txtPrecioVentaSol").value);
    existencias = parseInt(document.getElementById("txtExistenciasSol").value);

    let solucion = {};
    solucion.nombre = nombre;
    solucion.marca = marca;
    solucion.descripcion = descripcion;
    solucion.precioCompra = precioCompra;
    solucion.precioVenta = precioVenta;
    solucion.existencias = existencias;
    solucion.estatus = "Activo";
    soluciones.push(solucion);
    clean();
    loadTabla();
}

export function loadTabla() {
    let cuerpo = "";
    soluciones.forEach(function (solucion) {
        let registro =
                '<tr onclick="moduloSoluciones.selectSolucion(' + soluciones.indexOf(solucion) + ');">' +
                '<td>' + solucion.nombre + '</td>' +
                '<td>' + solucion.marca + '</td>' +
                '<td>' + solucion.descripcion + '</td>' +
                '<td>$' + solucion.precioCompra + '</td>' +
                '<td>$' + solucion.precioVenta + '</td>' +
                '<td>' + solucion.existencias + ' Pzas</td>' +
                '<td>' + solucion.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblSoluciones").innerHTML = cuerpo;
}

export function buscarSolucion() {
    let filtro = document.getElementById("txtBusquedaSolucion").value;

    let resultados = soluciones.filter(element => element.nombre === filtro);
    let cuerpo = "";
    resultados.forEach(function (solucion) {
        let registro =
                '<tr onclick="moduloSoluciones.selectSolucion(' + soluciones.indexOf(solucion) + ');">' +
                '<td>' + solucion.nombre + '</td>' +
                '<td>' + solucion.marca + '</td>' +
                '<td>' + solucion.descripcion + '</td>' +
                '<td>$' + solucion.precioCompra + '</td>' +
                '<td>$' + solucion.precioVenta + '</td>' +
                '<td>' + solucion.existencias + ' Pzas.</td>' +
                '<td>' + solucion.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblSoluciones").innerHTML = cuerpo;
}
export function selectSolucion(index) {
    if (soluciones[index].estatus === "Inactivo") {
        Swal.fire('Solucion eliminada', '', 'warning');
    } else {
        document.getElementById("txtNombreSol").value = soluciones[index].nombre;
        document.getElementById("txtMarcaSol").value = soluciones[index].marca;
        document.getElementById("txtDescripcionSol").value = soluciones[index].descripcion;
        document.getElementById("txtPrecioCompraSol").value = soluciones[index].precioCompra;
        document.getElementById("txtPrecioVentaSol").value = soluciones[index].precioVenta;
        document.getElementById("txtExistenciasSol").value = soluciones[index].existencias;
        document.getElementById("btnUpdateSol").classList.remove("disabled");
        document.getElementById("btnDeleteSol").classList.remove("disabled");
        document.getElementById("btnAddSol").classList.add("disabled");
        indexSolucionSeleccionado = index;
    }
}

export function clean() {
    document.getElementById("txtNombreSol").value = "";
    document.getElementById("txtMarcaSol").value = "";
    document.getElementById("txtDescripcionSol").value = "";
    document.getElementById("txtPrecioCompraSol").value = "";
    document.getElementById("txtPrecioVentaSol").value = "";
    document.getElementById("txtExistenciasSol").value = "";

    document.getElementById("btnUpdateSol").classList.add("disabled");
    document.getElementById("btnDeleteSol").classList.add("disabled");
    document.getElementById("btnAddSol").classList.remove("disabled");
    indexSolucionSeleccionado = 0;
}

export function updateSolucion() {
    let nombre,
            marca,
            descripcion,
            precioCompra,
            precioVenta,
            existencias;

    nombre = document.getElementById("txtNombreSol").value;
    marca = document.getElementById("txtMarcaSol").value;
    descripcion = document.getElementById("txtDescripcionSol").value;
    precioCompra = parseInt(document.getElementById("txtPrecioCompraSol").value);
    precioVenta = parseInt(document.getElementById("txtPrecioVentaSol").value);
    existencias = parseInt(document.getElementById("txtExistenciasSol").value);

    let solucion = {};
    solucion.nombre = nombre;
    solucion.marca = marca;
    solucion.descripcion = descripcion;
    solucion.precioCompra = precioCompra;
    solucion.precioVenta = precioVenta;
    solucion.existencias = existencias;
    solucion.estatus = "Activo";
    soluciones[indexSolucionSeleccionado] = solucion;
    clean();
    loadTabla();
}

export function modificarSolucion() {
    Swal.fire({
        title: '¿Quieres modificar la solución?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#6200EE',
        denyButtonText: `No guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            updateSolucion();
            Swal.fire('Guardado!', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guargados!', '', 'warning');
        }
    });
}

export function deleteSolucion() {
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
            soluciones[indexSolucionSeleccionado].estatus = "Inactivo";
            clean();
            loadTabla();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}

fetch("modulos/catalogoSoluciones/datos_soluciones.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            soluciones = jsondata;
            loadTabla();
        }
        );

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
