/* global fetch, Swal */

let indexClienteSeleccionado;
let clientes = [];

$('#desplegar').on('click', function (desplegar) {
    $('#form').css('display', 'block');
    $('#listar').css('display', 'block');
    $('#desplegar').css('display', 'none');
});

$('#listar').on('click', function () {
    $('#form').css('display', 'none');
    $('#listar').css('display', 'none');
    $('#desplegar').css('display', 'block');
});
export function formarClaveUnica(apP, apM) {
    let apeM2;
    let timestamp = Date.now();

    apP = apP.toUpperCase();
    apM = apM.toUpperCase();

    if (apM === "") {
        apeM2 = "X";
    } else {
        apeM2 = apM;
    }

    let claveUnica = (apP.substring(0, 2) + apeM2.substring(0, 1) + timestamp);

    return claveUnica;
}

export function addCliente() {
    let numero_unico_cliente,
            nombre,
            apellido_paterno,
            apellido_materno,
            genero,
            rfc,
            telefono,
            telefono_movil,
            correo_electronico;

    numero_unico_cliente = document.getElementById("txtNumUnico").value;
    nombre = document.getElementById("txtNombre").value;
    apellido_paterno = document.getElementById("txtApePaterno").value;
    apellido_materno = document.getElementById("txtApeMaterno").value;
    telefono = document.getElementById("txtTelefono").value;
    telefono_movil = document.getElementById("txtMovil").value;
    correo_electronico = document.getElementById("txtCorreo").value;
    rfc = document.getElementById("txtRfc").value;
    genero = document.getElementById("txtGenero").value;
    ;


    let cliente = {};
    cliente.numero_unico_cliente = formarClaveUnica(apellido_paterno, apellido_materno);
    cliente.nombre = nombre;
    cliente.apellido_paterno = apellido_paterno;
    cliente.apellido_materno = apellido_materno;
    cliente.telefono = telefono;
    cliente.telefono_movil = telefono_movil;
    cliente.correo_electronico = correo_electronico;
    cliente.rfc = rfc;
    cliente.genero = genero;
    cliente.estatus = "Activo";
    clientes.push(cliente);
    clean();
    loadTabla();
}

export function agregarCliente() {
    if (campos.nombre && campos.apellidoP && campos.correo && campos.telefonoM) {
        addCliente();
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

//Agregado beforeIndexRow para colorear seleccion
let beforeIndexRow = null;
export function loadTabla() {
    let cuerpo = "";
    //Se le agrego a tr un id con su index
    clientes.forEach(function (cliente) {
        let registro =
                '<tr id=' + clientes.indexOf(cliente) + ' onclick="moduloCliente.selectCliente(' + clientes.indexOf(cliente) + ');">' +
                '<td>' + cliente.nombre + '</td>' +
                '<td>' + cliente.apellido_paterno + ' ' + cliente.apellido_materno + '</td>' +
                '<td>' + cliente.genero + '</td>' +
                '<td>' + cliente.telefono_movil + '</td>' +
                '<td>' + cliente.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblClientes").innerHTML = cuerpo;
}

export function selectCliente(index) {
//    Se comento esta parte del codigo por redundante (Osea no es necesaria)
//    document.getElementById("txtNombre").disabled = false;
//    document.getElementById("txtApePaterno").disabled = false;
//    document.getElementById("txtApeMaterno").disabled = false;
//    document.getElementById("txtGenero").disabled = false;
//    document.getElementById("txtRfc").disabled = false;
//    document.getElementById("txtTelefono").disabled = false;
//    document.getElementById("txtMovil").disabled = false;
//    document.getElementById("txtCorreo").disabled = false;
    //Saque toda esta parte del else para optimizar la seleccion y la reactivacion
    document.getElementById("txtNumUnico").value = clientes[index].numero_unico_cliente;
    document.getElementById("txtNombre").value = clientes[index].nombre;
    document.getElementById("txtApePaterno").value = clientes[index].apellido_paterno;
    document.getElementById("txtApeMaterno").value = clientes[index].apellido_materno;
    document.getElementById("txtTelefono").value = clientes[index].telefono;
    document.getElementById("txtMovil").value = clientes[index].telefono_movil;
    document.getElementById("txtCorreo").value = clientes[index].correo_electronico;
    document.getElementById("txtRfc").value = clientes[index].rfc;
    document.getElementById("txtGenero").value = clientes[index].genero;
    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    document.getElementById("btnReactive").classList.add("disabled");
    indexClienteSeleccionado = index;
    document.getElementById("form").classList.add("activado");
    document.getElementById("listar").classList.add("activado");
    document.getElementById("desplegar").classList.add("desactivado");
    //Saque toda esta parte del else para optimizar la seleccion y la reactivacion

    //Agregado condicional para evitar que se duplique el color al seleccionar.
    if (beforeIndexRow === null) {
        colorRow(index);
        beforeIndexRow = index;
    } else {
        document.getElementById(beforeIndexRow).removeAttribute("class");
        beforeIndexRow = index;
        colorRow(index);
    }
    if (clientes[index].estatus === "Inactivo") {
        Swal.fire({
            icon: 'error',
            title: 'Cliente eliminado',
            text: 'No podra modificar nada a menos que lo vuelva a activar'
        });
        document.getElementById("txtNumUnico").disabled = true;
        document.getElementById("txtNombre").disabled = true;
        document.getElementById("txtApePaterno").disabled = true;
        document.getElementById("txtApeMaterno").disabled = true;
        document.getElementById("txtGenero").disabled = true;
        document.getElementById("txtRfc").disabled = true;
        document.getElementById("txtTelefono").disabled = true;
        document.getElementById("txtMovil").disabled = true;
        document.getElementById("txtCorreo").disabled = true;

        document.getElementById("btnUpdate").classList.add("disabled");
        document.getElementById("btnDelete").classList.add("disabled");
        document.getElementById("btnAdd").classList.add("disabled");
        document.getElementById("btnReactive").classList.remove("disabled");
    }
}
//Colorea la fila que selecciones
function colorRow(index) {
    document.getElementById(index).setAttribute("class", "colorRowTableSelect");
}

export function clean() {
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApePaterno").value = "";
    document.getElementById("txtApeMaterno").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtMovil").value = "";
    document.getElementById("txtCorreo").value = "";
    document.getElementById("txtRfc").value = "";

    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexClienteSeleccionado = 0;
}

export function updateCliente() {
    let numero_unico_cliente,
            nombre,
            apellido_paterno,
            apellido_materno,
            genero,
            rfc,
            telefono,
            telefono_movil,
            correo_electronico;

    numero_unico_cliente = document.getElementById("txtNumUnico").value;
    nombre = document.getElementById("txtNombre").value;
    apellido_paterno = document.getElementById("txtApePaterno").value;
    apellido_materno = document.getElementById("txtApeMaterno").value;
    telefono = document.getElementById("txtTelefono").value;
    telefono_movil = document.getElementById("txtMovil").value;
    correo_electronico = document.getElementById("txtCorreo").value;
    rfc = document.getElementById("txtRfc").value;
    genero = document.getElementById("txtGenero").value;

    let cliente = {};
    cliente.numero_unico_cliente = numero_unico_cliente;
    cliente.nombre = nombre;
    cliente.apellido_paterno = apellido_paterno;
    cliente.apellido_materno = apellido_materno;
    cliente.telefono = telefono;
    cliente.telefono_movil = telefono_movil;
    cliente.correo_electronico = correo_electronico;
    cliente.rfc = rfc;
    cliente.genero = genero;
    cliente.estatus = "Activo";
    clientes[indexClienteSeleccionado] = cliente;
    clean();
    loadTabla();
}
export function modificarCliente() {
    Swal.fire({
        title: '¿Quieres modificar al cliente?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#6200EE',
        denyButtonText: `No guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            updateCliente();
            Swal.fire('Guardado!', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guargados!', '', 'warning');
        }
    });
}
//Nueva funcion reactivar para deshacer a los inactivos
export function reactivateCliente() {
    clientes[indexClienteSeleccionado].estatus = "Activo";
    document.getElementById("txtNombre").disabled = false;
    document.getElementById("txtApePaterno").disabled = false;
    document.getElementById("txtApeMaterno").disabled = false;
    document.getElementById("txtGenero").disabled = false;
    document.getElementById("txtRfc").disabled = false;
    document.getElementById("txtTelefono").disabled = false;
    document.getElementById("txtMovil").disabled = false;
    document.getElementById("txtCorreo").disabled = false;
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnReactive").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    loadTabla();
    Swal.fire('Reactivado con exito.!', '', 'success');
}

export function buscarCliente() {
    let filtro = document.getElementById("txtBusquedaCliente").value;

    let filtroMinuscula = filtro.toLowerCase();


    let resultados = clientes.filter(element => element.nombre.toLowerCase() === filtroMinuscula || element.nombre.toLowerCase().split(' ')[0] === filtroMinuscula || element.nombre.toLowerCase().split(' ')[1] === filtroMinuscula || element.apellido_paterno.toLowerCase() === filtroMinuscula || element.apellido_materno.toLowerCase() === filtroMinuscula);
    let cuerpo = "";
    resultados.forEach(function (cliente) {
        let registro =
                '<tr onclick="moduloCliente.selectCliente(' + clientes.indexOf(cliente) + ');">' +
                '<td>' + cliente.nombre + '</td>' +
                '<td>' + cliente.apellido_paterno + ' ' + cliente.apellido_materno + '</td>' +
                '<td>' + cliente.genero + '</td>' +
                '<td>' + cliente.telefono_movil + '</td>' +
                '<td>' + cliente.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblClientes").innerHTML = cuerpo;
}


export function deleteCliente() {
    Swal.fire({
        title: '¿Quieres eliminar el cliente seleccionado?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#6200EE',
        cancelButtonColor: '#d33',
        CancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            clientes[indexClienteSeleccionado].estatus = "Inactivo";
            clean();
            loadTabla();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}

fetch("modulos/catalogoClientes/datos_clientes.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            clientes = jsondata;
            loadTabla();
        }
        );

//-----------------------------------------------------VALIDACION DE CAMPOS---------------------------------------------------------- 
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    apellidoP: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    rfc: /^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?$/,
    telefono: /^\d{7,10}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

const campos = {
    nombre: false,
    apellidoP: false,
    rfc: false,
    telefonoM: false,
    correo: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellidoP":
            validarCampo(expresiones.apellidoP, e.target, 'apellidoP');
            break;
        case "rfc":
            validarCampo(expresiones.rfc, e.target, 'rfc');
            break;
        case "telefonoM":
            validarCampo(expresiones.telefono, e.target, 'telefonoM');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
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


