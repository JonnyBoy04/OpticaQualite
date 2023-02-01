/* global fetch, Swal */

let indexEmpleadoSeleccionado;
let empleados = [];
let currentUser = localStorage.getItem('currentUser');
let user = JSON.parse(currentUser);
let token = user.usuario.lastToken;

export function inicializar() {
    configureTableFilter(document.getElementById('txtBusquedaEmpleado'),
            document.getElementById('tablaEmp'));

    $('#desplegar').on('click', function () {
        $('#form').css('display', 'block');
        $('#listar').css('display', 'block');
        $('#desplegar').css('display', 'none');
        $('#tablaEmp').css('display', 'none');
        $('#buscar').css('display', 'none');
    });

    $('#listar').on('click', function () {
        $('#form').css('display', 'none');
        $('#listar').css('display', 'none');
        $('#desplegar').css('display', 'block');
        $('#tablaEmp').css('display', '');
        $('#buscar').css('display', 'block');
    });
    refrescarTabla();
}

function normalizar(texto)
{
    texto = texto.toUpperCase();
    for (var i = 0; i < texto.length; i++)
    {
        texto = texto.replace("Á", "A");
        texto = texto.replace("É", "E");
        texto = texto.replace("Í", "I");
        texto = texto.replace("Ó", "O");
        texto = texto.replace("Ú", "U");
// texto = texto.replace("1","UNO");
    }
    return texto;
}

function sanitizar(texto)
{
    for (var i = 0; i < texto.length; i++)
    {
        texto = texto.replace("(", "");
        texto = texto.replace(")", "");
        texto = texto.replace(";", "");
        texto = texto.replace("'", "");
        texto = texto.replace("\"", "");
        texto = texto.replace("-", "");
        texto = texto.replace("*", "");
        texto = texto.replace("%", "");
        texto = texto.replace("«", "");
        texto = texto.replace("»", "");
        texto = texto.replace('”', "");
        texto = texto.replace('“', "");
    }
    return texto;
}

export function guardarEmpleado() {
    let params = null;
    let empleado = new Object();

    empleado.usuario = new Object();
    empleado.persona = new Object();

    if (document.getElementById("txtCodigoEmpleado").value.trim().length < 1) {
        empleado.idEmpleado = 0;
        empleado.persona.idPersona = 0;
        empleado.usuario.idUsuario = 0;
    } else {
        empleado.idEmpleado = parseInt(document.getElementById("txtCodigoEmpleado").value);
        empleado.persona.idPersona = parseInt(document.getElementById("txtCodigoPersona").value);
        empleado.usuario.idUsuario = parseInt(document.getElementById("txtCodigoUsuario").value);
    }
    
    empleado.persona.nombre = document.getElementById("txtNombreEmp").value;
    empleado.persona.apellidoPaterno = document.getElementById("txtApePaternoEmp").value;
    empleado.persona.apellidoMaterno = document.getElementById("txtApeMaternoEmp").value;
    empleado.persona.genero = document.getElementById("txtGeneroEmp").value;
    empleado.persona.fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
    empleado.persona.calle = document.getElementById("txtCalle").value;
    empleado.persona.numero = document.getElementById("txtNumero").value;
    empleado.persona.colonia = document.getElementById("txtColonia").value;
    empleado.persona.cp = document.getElementById("txtCp").value;
    empleado.persona.ciudad = document.getElementById("txtCiudad").value;
    empleado.persona.estado = document.getElementById("txtEstado").value;
    empleado.persona.telCasa = document.getElementById("txtTelefonoEmp").value;
    empleado.persona.telMovil = document.getElementById("txtMovilEmp").value;
    empleado.persona.rfc = document.getElementById("txtRfcEmp").value;
    empleado.persona.email = document.getElementById("txtCorreoEmp").value;
    empleado.usuario.nombre = document.getElementById("txtUsuarioEmp").value;
    empleado.usuario.contrasenia = document.getElementById("txtContraseniaEmp").value;
    empleado.usuario.rol = document.getElementById("txtRol").value;
    empleado.numeroUnico = document.getElementById("txtNumUnicoEmp").value;

    params = new URLSearchParams({datosEmpleado: JSON.stringify(empleado), token: token});
    console.log(params);

    //header es la cabecera de la petición y en body se mandan los parametros
    fetch("api/empleado/save",
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
                    Swal.fire('', 'Error interno de servidar. Intente nuevamente más tarde.', 'error')
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
                    document.getElementById("txtCodigoEmpleado").value = data.idEmpleado;
                    document.getElementById("txtCodigoUsuario").value = data.usuario.idUsuario;
                    document.getElementById("txtCodigoPersona").value = data.persona.idPersona;
                    document.getElementById("txtNumUnicoEmp").value = data.numeroUnico;
                    Swal.fire('', 'Datos del empleado actualizados correctamente.', 'success');
                    refrescarTabla();
                    limpiar();
                }
            });
}

export function registrarEmpleado() {
    if (campos.usuario && campos.nombre && campos.apellidoP && campos.rfc && campos.password && campos.correo && campos.telefono && campos.telefonoM) {
        guardarEmpleado();
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

export function eliminarEmpleado() {
    let datos = null;
    let params = null;
    let empleado = new Object();

    empleado.usuario = new Object();
    empleado.persona = new Object();

    empleado.idEmpleado = parseInt(document.getElementById("txtCodigoEmpleado").value);
    empleado.persona.idPersona = parseInt(document.getElementById("txtCodigoPersona").value);
    empleado.usuario.idUsuario = parseInt(document.getElementById("txtCodigoUsuario").value);
    empleado.persona.nombre = document.getElementById("txtNombreEmp").value;
    empleado.persona.apellidoPaterno = document.getElementById("txtApePaternoEmp").value;
    empleado.persona.apellidoMaterno = document.getElementById("txtApeMaternoEmp").value;
    empleado.persona.genero = document.getElementById("txtGeneroEmp").value;
    empleado.persona.fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
    empleado.persona.calle = document.getElementById("txtCalle").value;
    empleado.persona.numero = document.getElementById("txtNumero").value;
    empleado.persona.colonia = document.getElementById("txtColonia").value;
    empleado.persona.cp = document.getElementById("txtCp").value;
    empleado.persona.ciudad = document.getElementById("txtCiudad").value;
    empleado.persona.estado = document.getElementById("txtEstado").value;
    empleado.persona.telCasa = document.getElementById("txtTelefonoEmp").value;
    empleado.persona.telMovil = document.getElementById("txtMovilEmp").value;
    empleado.persona.rfc = document.getElementById("txtRfcEmp").value;
    empleado.persona.email = document.getElementById("txtCorreoEmp").value;
    empleado.usuario.nombre = document.getElementById("txtUsuarioEmp").value;
    empleado.usuario.contrasenia = document.getElementById("txtContraseniaEmp").value;
    empleado.usuario.rol = document.getElementById("txtRol").value;
    empleado.numeroUnico = document.getElementById("txtNumUnicoEmp").value;

    params = new URLSearchParams({datosEmpleado: JSON.stringify(empleado), token: token});

    //header es la cabecera de la petición y en body se mandan los parametros
    fetch("api/empleado/delete",
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
                if (data.exception != null) {
                    Swal.fire('', 'Error interno de servidar. Intente nuevamente más tarde.', 'error')
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
                    limpiar();
                    refrescarTabla();
                }
            });
}

export function borrarEmpleado() {
    Swal.fire({
        title: '¿Quieres eliminar al empleado seleccionado?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#6200EE',
        cancelButtonColor: '#d33',
        CancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarEmpleado();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}

export function refrescarTabla() {
    let url = "api/empleado/getAll";
    fetch(url)
            .then(response => {
                return response.json();
            })
            .then(function (data)
            {
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
    empleados = data;
    empleados.forEach(function (empleado) {
        let registro =
                '<tr onclick="moduloEmpleado.seleccionarEmpleado(' + empleados.indexOf(empleado) + ');">' +
                '<td>' + empleado.persona.nombre + '</td>' +
                '<td>' + empleado.persona.apellidoPaterno + ' ' + empleado.persona.apellidoMaterno + '</td>' +
                '<td>' + empleado.usuario.nombre + '</td>' +
                '<td>' + empleado.persona.genero + '</td>' +
                '<td>' + empleado.persona.telMovil + '</td>' +
                '<td>' + empleado.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblEmpleados").innerHTML = cuerpo;
}

export function seleccionarEmpleado(index) {
    habilitarFormulario();

    document.getElementById("txtNumUnicoEmp").value = empleados[index].numeroUnico;
    document.getElementById("txtNombreEmp").value = empleados[index].persona.nombre;
    document.getElementById("txtApePaternoEmp").value = empleados[index].persona.apellidoPaterno;
    document.getElementById("txtApeMaternoEmp").value = empleados[index].persona.apellidoMaterno;
    document.getElementById("txtUsuarioEmp").value = empleados[index].usuario.nombre;
    document.getElementById("txtFechaNacimiento").value = empleados[index].persona.fechaNacimiento;
    document.getElementById("txtCalle").value = empleados[index].persona.calle;
    document.getElementById("txtNumero").value = empleados[index].persona.numero;
    document.getElementById("txtColonia").value = empleados[index].persona.colonia;
    document.getElementById("txtCp").value = empleados[index].persona.cp;
    document.getElementById("txtCiudad").value = empleados[index].persona.ciudad;
    document.getElementById("txtEstado").value = empleados[index].persona.estado;
    document.getElementById("txtRol").value = empleados[index].usuario.rol;
    document.getElementById("txtContraseniaEmp").value = empleados[index].usuario.contrasenia;
    document.getElementById("txtTelefonoEmp").value = empleados[index].persona.telCasa;
    document.getElementById("txtMovilEmp").value = empleados[index].persona.telMovil;
    document.getElementById("txtCorreoEmp").value = empleados[index].persona.email;
    document.getElementById("txtRfcEmp").value = empleados[index].persona.rfc;
    document.getElementById("txtGeneroEmp").value = empleados[index].persona.genero;
    document.getElementById("txtCodigoEmpleado").value = empleados[index].idEmpleado;
    document.getElementById("txtCodigoPersona").value = empleados[index].persona.idPersona;
    document.getElementById("txtCodigoUsuario").value = empleados[index].usuario.idUsuario;
    document.getElementById("btnDeleteEmp").classList.remove("disabled");
    indexEmpleadoSeleccionado = index;

    if (empleados[index].estatus === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Cliente eliminado',
            text: 'No podra modificar nada a menos que lo vuelva a activar'
        });
        deshabilitarFormulario();
        document.getElementById("btnAddEmp").classList.add("disabled");
        document.getElementById("btnDeleteEmp").classList.add("disabled");
    }
}

export function limpiar() {
    habilitarFormulario();
    document.getElementById("txtNumUnicoEmp").value = "";
    document.getElementById("txtNombreEmp").value = "";
    document.getElementById("txtApePaternoEmp").value = "";
    document.getElementById("txtApeMaternoEmp").value = "";
    document.getElementById("txtUsuarioEmp").value = "";
    document.getElementById("txtFechaNacimiento").value = "";
    document.getElementById("txtCalle").value = "";
    document.getElementById("txtNumero").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtCp").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtRol").value = "";
    document.getElementById("txtContraseniaEmp").value = "";
    document.getElementById("txtTelefonoEmp").value = "";
    document.getElementById("txtMovilEmp").value = "";
    document.getElementById("txtCorreoEmp").value = "";
    document.getElementById("txtRfcEmp").value = "";
    document.getElementById("txtGeneroEmp").value = "";
    document.getElementById("txtCodigoEmpleado").value = "";
    document.getElementById("txtCodigoPersona").value = "";
    document.getElementById("txtCodigoUsuario").value = "";
    document.getElementById("btnAddEmp").classList.remove("disabled");
    document.getElementById("btnDeleteEmp").classList.add("disabled");
    indexEmpleadoSeleccionado = 0;
}

export function habilitarFormulario() {
    document.getElementById("txtNumUnicoEmp").disabled = false;
    document.getElementById("txtNombreEmp").disabled = false;
    document.getElementById("txtApePaternoEmp").disabled = false;
    document.getElementById("txtApeMaternoEmp").disabled = false;
    document.getElementById("txtUsuarioEmp").disabled = false;
    document.getElementById("txtFechaNacimiento").disabled = false;
    document.getElementById("txtCalle").disabled = false;
    document.getElementById("txtNumero").disabled = false;
    document.getElementById("txtColonia").disabled = false;
    document.getElementById("txtCp").disabled = false;
    document.getElementById("txtCiudad").disabled = false;
    document.getElementById("txtEstado").disabled = false;
    document.getElementById("txtRol").disabled = false;
    document.getElementById("txtContraseniaEmp").disabled = false;
    document.getElementById("txtTelefonoEmp").disabled = false;
    document.getElementById("txtMovilEmp").disabled = false;
    document.getElementById("txtCorreoEmp").disabled = false;
    document.getElementById("txtRfcEmp").disabled = false;
    document.getElementById("txtGeneroEmp").disabled = false;
    document.getElementById("txtCodigoPersona").disabled = false;
    document.getElementById("txtCodigoUsuario").disabled = false;
}

export function deshabilitarFormulario() {
    document.getElementById("txtNumUnicoEmp").disabled = true;
    document.getElementById("txtNombreEmp").disabled = true;
    document.getElementById("txtApePaternoEmp").disabled = true;
    document.getElementById("txtApeMaternoEmp").disabled = true;
    document.getElementById("txtUsuarioEmp").disabled = true;
    document.getElementById("txtFechaNacimiento").disabled = true;
    document.getElementById("txtCalle").disabled = true;
    document.getElementById("txtNumero").disabled = true;
    document.getElementById("txtColonia").disabled = true;
    document.getElementById("txtCp").disabled = true;
    document.getElementById("txtCiudad").disabled = true;
    document.getElementById("txtEstado").disabled = true;
    document.getElementById("txtRol").disabled = true;
    document.getElementById("txtContraseniaEmp").disabled = true;
    document.getElementById("txtTelefonoEmp").disabled = true;
    document.getElementById("txtMovilEmp").disabled = true;
    document.getElementById("txtCorreoEmp").disabled = true;
    document.getElementById("txtRfcEmp").disabled = true;
    document.getElementById("txtGeneroEmp").disabled = true;
    document.getElementById("txtCodigoPersona").disabled = true;
    document.getElementById("txtCodigoUsuario").disabled = true;
}
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
