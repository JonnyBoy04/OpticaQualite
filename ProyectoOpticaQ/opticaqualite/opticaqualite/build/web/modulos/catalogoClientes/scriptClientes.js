    /* global fetch, Swal */

let indexClienteSeleccionado;
let clientes = [];
export function inicializar() {
    configureTableFilter(document.getElementById('txtBusquedaCliente'),
                         document.getElementById('tablaCli'));
                         
   $('#desplegar').on('click', function () {
        $('#form').css('display', 'block');
        $('#listar').css('display', 'block');
        $('#desplegar').css('display', 'none');
        $('#tablaCli').css('display','none');
        $('#buscar').css('display','none');
        
    });

    $('#listar').on('click', function () {
        $('#form').css('display', 'none');
        $('#listar').css('display', 'none');
        $('#desplegar').css('display', 'block');
        $('#tablaCli').css('display','');
        $('#buscar').css('display','flex');
    });
    refrescarTabla();
}

export function guardarCliente() {
    let datos = null;
    let params = null;
    let cliente = new Object();

    cliente.persona = new Object();

    if (document.getElementById("txtCodigoCliente").value.trim().length < 1) {
        cliente.idCliente = 0;
        cliente.persona.idPersona = 0;
    } else {
        cliente.idCliente = parseInt(document.getElementById("txtCodigoCliente").value);
        cliente.persona.idPersona = parseInt(document.getElementById("txtCodigoPersona").value);
    }

    cliente.persona.nombre = document.getElementById("txtNombre").value;
    cliente.persona.apellidoPaterno = document.getElementById("txtApePaterno").value;
    cliente.persona.apellidoMaterno = document.getElementById("txtApeMaterno").value;
    cliente.persona.genero = document.getElementById("txtGenero").value;
    cliente.persona.fechaNacimiento = document.getElementById("txtFechaNacimientoCli").value;
    cliente.persona.calle = document.getElementById("txtCalleCli").value;
    cliente.persona.numero = document.getElementById("txtNumeroCli").value;
    cliente.persona.colonia = document.getElementById("txtColoniaCli").value;
    cliente.persona.cp = document.getElementById("txtCpCli").value;
    cliente.persona.ciudad = document.getElementById("txtCiudadCli").value;
    cliente.persona.estado = document.getElementById("txtEstadoCli").value;
    cliente.persona.telCasa = document.getElementById("txtTelefono").value;
    cliente.persona.telMovil = document.getElementById("txtMovil").value;
    cliente.persona.email = document.getElementById("txtCorreo").value;
    cliente.persona.rfc = document.getElementById("txtRfc").value;
    cliente.numeroUnico = document.getElementById("txtNumUnico").value;
    //Comvierte un dato tipo Script a Cadena Json
    datos = {
        datosCliente: JSON.stringify(cliente)
    };


    params = new URLSearchParams(datos);

    //header es la cabecera de la petición y en body se mandan los parametros
    fetch("api/cliente/save",
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

                document.getElementById("txtCodigoCliente").value = data.idCliente;
                document.getElementById("txtCodigoPersona").value = data.persona.idPersona;
                document.getElementById("txtNumUnico").value = data.numeroUnico;
                Swal.fire('', 'Datos del cliente actualizados correctamente.', 'success');
                refrescarTabla();
                limpiarFormulario();
            });
}

export function registrarCliente() {
    if (campos.nombre && campos.apellidoP && campos.rfc && campos.telefonoM && campos.correo) {
        guardarCliente();
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
    let url = "api/cliente/getAll";
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

//Agregado beforeIndexRow para colorear seleccion
let beforeIndexRow = null;
export function cargarTabla(data) {
    let cuerpo = "";
    clientes = data;
    clientes.forEach(function (cliente) {
        let registro =
                '<tr id=' + clientes.indexOf(cliente) + ' onclick="moduloCliente.seleccionarCliente(' + clientes.indexOf(cliente) + ');">' +
                '<td>' + cliente.persona.nombre + '</td>' +
                '<td>' + cliente.persona.apellidoPaterno + ' ' + cliente.persona.apellidoMaterno + '</td>' +
                '<td>' + cliente.persona.genero + '</td>' +
                '<td>' + cliente.persona.telMovil + '</td>' +
                '<td>' + cliente.status + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblClientes").innerHTML = cuerpo;
}

export function seleccionarCliente(index) {
    document.getElementById("txtNumUnico").value = clientes[index].numeroUnico;
    document.getElementById("txtNombre").value = clientes[index].persona.nombre;
    document.getElementById("txtApePaterno").value = clientes[index].persona.apellidoPaterno;
    document.getElementById("txtApeMaterno").value = clientes[index].persona.apellidoMaterno;
    document.getElementById("txtFechaNacimientoCli").value = clientes[index].persona.fechaNacimiento;
    document.getElementById("txtGenero").value = clientes[index].persona.genero;
    document.getElementById("txtCalleCli").value = clientes[index].persona.calle;
    document.getElementById("txtNumeroCli").value = clientes[index].persona.numero;
    document.getElementById("txtColoniaCli").value = clientes[index].persona.colonia;
    document.getElementById("txtCpCli").value = clientes[index].persona.cp;
    document.getElementById("txtCiudadCli").value = clientes[index].persona.ciudad;
    document.getElementById("txtEstadoCli").value = clientes[index].persona.estado;
    document.getElementById("txtTelefono").value = clientes[index].persona.telCasa;
    document.getElementById("txtMovil").value = clientes[index].persona.telMovil;
    document.getElementById("txtCorreo").value = clientes[index].persona.email;
    document.getElementById("txtRfc").value = clientes[index].persona.rfc;
    document.getElementById("txtCodigoCliente").value = clientes[index].idCliente;
    document.getElementById("txtCodigoPersona").value = clientes[index].persona.idPersona;

    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnReactive").classList.add("disabled");
    indexClienteSeleccionado = index;
    document.getElementById("form").classList.add("activado");
    document.getElementById("listar").classList.add("activado");
    document.getElementById("desplegar").classList.add("desactivado");
    //Saque toda esta parte del else para optimizar la seleccion y la reactivacion


    if (clientes[index].status === 0) {
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

        document.getElementById("btnDelete").classList.add("disabled");
        document.getElementById("btnAdd").classList.add("disabled");
        document.getElementById("btnReactive").classList.remove("disabled");
    }
}
//Colorea la fila que selecciones
function colorRow(index) {
    document.getElementById(index).setAttribute("class", "colorRowTableSelect");
}

export function limpiarFormulario() {
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApePaterno").value = "";
    document.getElementById("txtApeMaterno").value = "";
    document.getElementById("txtFechaNacimientoCli").value = "";
    document.getElementById("txtGenero").value = "";
    document.getElementById("txtCalleCli").value = "";
    document.getElementById("txtNumeroCli").value = "";
    document.getElementById("txtColoniaCli").value = "";
    document.getElementById("txtCpCli").value = "";
    document.getElementById("txtCiudadCli").value = "";
    document.getElementById("txtEstadoCli").value = "";
    document.getElementById("txtTelefono").value ="";
    document.getElementById("txtMovil").value = "";
    document.getElementById("txtCorreo").value = "";
    document.getElementById("txtRfc").value = "";
    document.getElementById("txtCodigoCliente").value = "";
    document.getElementById("txtCodigoPersona").value = "";

    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexClienteSeleccionado = 0;
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
    cargarTabla();
    Swal.fire('Reactivado con exito.!', '', 'success');
}


export function eliminar() {
    let datos = null;
    let params = null;
    let cliente = new Object();

    cliente.persona = new Object();
    cliente.idCliente = parseInt(document.getElementById("txtCodigoCliente").value);
    cliente.persona.idPersona = parseInt(document.getElementById("txtCodigoPersona").value);
    cliente.persona.nombre = document.getElementById("txtNombre").value;
    cliente.persona.apellidoPaterno = document.getElementById("txtApePaterno").value;
    cliente.persona.apellidoMaterno = document.getElementById("txtApeMaterno").value;
    cliente.persona.genero = document.getElementById("txtGenero").value;
    cliente.persona.fechaNacimiento = document.getElementById("txtFechaNacimientoCli").value;
    cliente.persona.calle = document.getElementById("txtCalleCli").value;
    cliente.persona.numero = document.getElementById("txtNumeroCli").value;
    cliente.persona.colonia = document.getElementById("txtColoniaCli").value;
    cliente.persona.cp = document.getElementById("txtCpCli").value;
    cliente.persona.ciudad = document.getElementById("txtCiudadCli").value;
    cliente.persona.estado = document.getElementById("txtEstadoCli").value;
    cliente.persona.telCasa = document.getElementById("txtTelefono").value;
    cliente.persona.telMovil = document.getElementById("txtMovil").value;
    cliente.persona.email = document.getElementById("txtCorreo").value;
    cliente.numeroUnico = document.getElementById("txtNumUnico").value;
    datos = {
        datosCliente: JSON.stringify(cliente)
    };
    params = new URLSearchParams(datos);
    fetch("api/cliente/delete",
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
            });
}
export function borrarCliente() {
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
            eliminar();
            limpiarFormulario();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}

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


