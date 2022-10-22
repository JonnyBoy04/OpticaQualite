/* global fetch, Swal */

let indexEmpleadoSeleccionado;
let empleados = [];


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

export function addEmpleado() {
    let numero_unico_empleado,
            nombre,
            apellido_paterno,
            apellido_materno,
            usuario,
            contrasenia,
            genero,
            rfc,
            telefono,
            telefono_movil,
            correo_electronico;

    numero_unico_empleado = document.getElementById("txtNumUnicoEmp").value;
    nombre = document.getElementById("txtNombreEmp").value;
    usuario = document.getElementById("txtUsuarioEmp").value;
    contrasenia = document.getElementById("txtContraseniaEmp").value;
    apellido_paterno = document.getElementById("txtApePaternoEmp").value;
    apellido_materno = document.getElementById("txtApeMaternoEmp").value;
    telefono = document.getElementById("txtTelefonoEmp").value;
    telefono_movil = document.getElementById("txtMovilEmp").value;
    correo_electronico = document.getElementById("txtCorreoEmp").value;
    rfc = document.getElementById("txtRfcEmp").value;
    genero = document.getElementById("txtGeneroEmp").value;

    let apePEm;
    let apeMEm;
    let apeMEm2;
    let timestampEm = Date.now();

    apePEm = apellido_paterno.toUpperCase();
    apeMEm = apellido_materno.toUpperCase();

    if (apeMEm === "") {
        apeMEm2 = "X";
    } else {
        apeMEm2 = apeMEm;
    }

    let claveUnicaEm = (apePEm.substring(0, 2) + apeMEm2.substring(0, 1) + timestampEm);


    let empleado = {};
    empleado.numero_unico_empleado = claveUnicaEm;
    empleado.nombre = nombre;
    empleado.usuario = usuario;
    empleado.contrasenia = contrasenia;
    empleado.apellido_paterno = apellido_paterno;
    empleado.apellido_materno = apellido_materno;
    empleado.telefono = telefono;
    empleado.telefono_movil = telefono_movil;
    empleado.correo_electronico = correo_electronico;
    empleado.rfc = rfc;
    empleado.genero = genero;
    empleado.estatus = "Activo";
    empleados.push(empleado);
    clean();
    loadTabla();

}

export function loadTabla() {
    let cuerpo = "";
    empleados.forEach(function (empleado) {
        let registro =
                '<tr onclick="moduloEmpleado.selectEmpleado(' + empleados.indexOf(empleado) + ');">' +
                '<td>' + empleado.nombre + '</td>' +
                '<td>' + empleado.apellido_paterno + ' ' + empleado.apellido_materno + '</td>' +
                '<td>' + empleado.usuario + '</td>' +
                '<td>' + empleado.contrasenia + '</td>' +
                '<td>' + empleado.genero + '</td>' +
                '<td>' + empleado.telefono_movil + '</td>' +
                '<td>' + empleado.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblEmpleados").innerHTML = cuerpo;

}

export function buscarEmpleado() {
    let filtro = document.getElementById("txtBusquedaEmpleado").value;

    let filtroMinuscula = filtro.toLowerCase();
    

    let resultados = empleados.filter(element => element.usuario === filtro || element.nombre.toLowerCase() === filtroMinuscula || element.nombre.toLowerCase().split(' ')[0] === filtroMinuscula || element.nombre.toLowerCase().split(' ')[1] === filtroMinuscula || element.apellido_paterno.toLowerCase() === filtroMinuscula || element.apellido_materno.toLowerCase() === filtroMinuscula);
    let cuerpo = "";
    resultados.forEach(function (empleado) {
        let registro =
                '<tr onclick="moduloEmpleado.selectEmpleado(' + empleados.indexOf(empleado) + ');">' +
                '<td>' + empleado.nombre + '</td>' +
                '<td>' + empleado.apellido_paterno + ' ' + empleado.apellido_materno + '</td>' +
                '<td>' + empleado.usuario + '</td>' +
                '<td>' + empleado.contrasenia + '</td>' +
                '<td>' + empleado.genero + '</td>' +
                '<td>' + empleado.telefono_movil + '</td>' +
                '<td>' + empleado.estatus + '</td><tr>';
        cuerpo += registro;
    });
    document.getElementById("tblEmpleados").innerHTML = cuerpo;
}

export function selectEmpleado(index) {
    if (empleados[index].estatus === "Inactivo") {
        Swal.fire('Empleado eliminado!', '', 'warning');
    } else {
        document.getElementById("txtNumUnicoEmp").value = empleados[index].numero_unico_empleado;
        document.getElementById("txtNombreEmp").value = empleados[index].nombre;
        document.getElementById("txtApePaternoEmp").value = empleados[index].apellido_paterno;
        document.getElementById("txtApeMaternoEmp").value = empleados[index].apellido_materno;
        document.getElementById("txtUsuarioEmp").value = empleados[index].usuario;
        document.getElementById("txtContraseniaEmp").value = empleados[index].contrasenia;
        document.getElementById("txtTelefonoEmp").value = empleados[index].telefono;
        document.getElementById("txtMovilEmp").value = empleados[index].telefono_movil;
        document.getElementById("txtCorreoEmp").value = empleados[index].correo_electronico;
        document.getElementById("txtRfcEmp").value = empleados[index].rfc;
        document.getElementById("txtGeneroEmp").value = empleados[index].genero;
        document.getElementById("btnUpdateEmp").classList.remove("disabled");
        document.getElementById("btnDeleteEmp").classList.remove("disabled");
        document.getElementById("btnAddEmp").classList.add("disabled");
        indexEmpleadoSeleccionado = index;
    }
}

export function clean() {
    document.getElementById("txtNumUnicoEmp").value = "";
    document.getElementById("txtNombreEmp").value = "";
    document.getElementById("txtApePaternoEmp").value = "";
    document.getElementById("txtApeMaternoEmp").value = "";
    document.getElementById("txtUsuarioEmp").value = "";
    document.getElementById("txtContraseniaEmp").value = "";
    document.getElementById("txtTelefonoEmp").value = "";
    document.getElementById("txtMovilEmp").value = "";
    document.getElementById("txtCorreoEmp").value = "";
    document.getElementById("txtRfcEmp").value = "";

    document.getElementById("btnUpdateEmp").classList.add("disabled");
    document.getElementById("btnDeleteEmp").classList.add("disabled");
    document.getElementById("btnAddEmp").classList.remove("disabled");
    indexEmpleadoSeleccionado = 0;
}

export function updateEmpleado() {
    let numero_unico_empleado,
            nombre,
            apellido_paterno,
            apellido_materno,
            usuario,
            contrasenia,
            genero,
            rfc,
            telefono,
            telefono_movil,
            correo_electronico;
    
    numero_unico_empleado = document.getElementById("txtNumUnicoEmp").value;
    nombre = document.getElementById("txtNombreEmp").value;
    apellido_paterno = document.getElementById("txtApePaternoEmp").value;
    apellido_materno = document.getElementById("txtApeMaternoEmp").value;
    usuario = document.getElementById("txtUsuarioEmp").value;
    contrasenia = document.getElementById("txtContraseniaEmp").value;
    telefono = document.getElementById("txtTelefonoEmp").value;
    telefono_movil = document.getElementById("txtMovilEmp").value;
    correo_electronico = document.getElementById("txtCorreoEmp").value;
    rfc = document.getElementById("txtRfcEmp").value;
    genero = document.getElementById("txtGeneroEmp").value;
    
    let apePEm;
    let apeMEm;
    let apeMEm2;
    let timestampEm = Date.now();

    apePEm = apellido_paterno.toUpperCase();
    apeMEm = apellido_materno.toUpperCase();

    if (apeMEm === "") {
        apeMEm2 = "X";
    } else {
        apeMEm2 = apeMEm;
    }

    let claveUnicaEm = (apePEm.substring(0, 2) + apeMEm2.substring(0, 1) + timestampEm);


    let empleado = {};
    empleado.numero_unico_empleado = claveUnicaEm;
    empleado.nombre = nombre;
    empleado.apellido_paterno = apellido_paterno;
    empleado.apellido_materno = apellido_materno;
    empleado.usuario = usuario;
    empleado.contrasenia = contrasenia,
            empleado.telefono = telefono;
    empleado.telefono_movil = telefono_movil;
    empleado.correo_electronico = correo_electronico;
    empleado.rfc = rfc;
    empleado.genero = genero;
    empleado.estatus = "Activo";
    empleados[indexEmpleadoSeleccionado] = empleado;
    clean();
    loadTabla();
}

export function modificarEmpleado() {
    Swal.fire({
        title: '¿Quieres modificar al empleado?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#6200EE',
        denyButtonText: `No guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            updateEmpleado();
            Swal.fire('Guardado!', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guargados!', '', 'warning');
        }
    });
}
export function deleteEmpleado() {
    Swal.fire({
        title: '¿Quieres eliminar el empleado seleccionado?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#6200EE',
        cancelButtonColor: '#d33',
        CancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            empleados[indexEmpleadoSeleccionado].estatus = "Inactivo";
            clean();
            loadTabla();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}

fetch("modulos/catalogoEmpleados/datos_empleados.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            empleados = jsondata;
            loadTabla();
        }
        );

//-----------------------------------------------------VALIDACION DE CAMPOS---------------------------------------------------------- 
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    password: /^.{4,20}$/, // 4 a 12 digitos.
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellidoP: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    rfc: /^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?$/,
    telefono: /^\d{7,10}$/, // 7 a 14 numeros.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

const campos = {
    usuario: false,
    password: false,
    nombre: false,
    apellidoP: false,
    rfc: false,
    telefono: false,
    telefonoM: false,
    correo: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellidoP":
            validarCampo(expresiones.apellidoP, e.target, 'apellidoP');
            break;
        case "rfc":
            validarCampo(expresiones.rfc, e.target, 'rfc');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
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

export function agregarEmpleado() {
    if (campos.usuario && campos.nombre && campos.apellidoP && campos.rfc && campos.password && campos.correo && campos.telefono && campos.telefonoM) {
        addEmpleado();
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