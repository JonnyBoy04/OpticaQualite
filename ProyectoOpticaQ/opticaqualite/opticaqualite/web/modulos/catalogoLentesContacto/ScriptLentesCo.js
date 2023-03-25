/* global fetch, Swal */

let indexLenteSeleccionado;
let Lentes = [];

export function inicializar() {
    $('#desplegar').on('click', function () {
        $('#form').css('display', 'block');
        $('#listar').css('display', 'block');
        $('#desplegar').css('display', 'none');
    });

    $('#listar').on('click', function () {
        $('#form').css('display', 'none');
        $('#listar').css('display', 'none');
        $('#desplegar').css('display', 'block');
    });
}

export function loadTabla() {
    let cuerpo = "";
    Lentes.forEach(function (empleado) {
        let registro =
                '<tr onclick="moduloLDC.selectLente(' + Lentes.indexOf(empleado) + ');">' +
                '<td>' + empleado.nombreL + '</td>' +
                '<td>' + empleado.marcaL + '</td>' +
                '<td>' + empleado.colorL + '</td>' +
                '<td>' + empleado.queraL + '</td>' +
                '<td>' + empleado.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblLentesC").innerHTML = cuerpo;

}

export function buscarLente() {
    let filtro = document.getElementById("txtBusquedaLente").value;

    let resultados = Lentes.filter(element => element.nombreL === filtro);
    let cuerpo = "";
    resultados.forEach(function (empleado) {
        let registro =
                '<tr onclick="moduloLDC.selectLente(' + Lentes.indexOf(empleado) + ');">' +
                '<td>' + empleado.nombreL + '</td>' +
                '<td>' + empleado.marcaL + '</td>' +
                '<td>' + empleado.colorL + '</td>' +
                '<td>' + empleado.queraL + '</td>' +
                '<td>' + empleado.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblLentesC").innerHTML = cuerpo;
}
export function selectLente(index) {
    if (Lentes[index].estatus === "Inactivo") {
        Swal.fire('Tratamiento eliminado!', '', 'warning');
    } else {
        document.getElementById("txtnombreLDC").value = Lentes[index].nombreL;
        document.getElementById("txtmarcaL").value = Lentes[index].marcaL;
        document.getElementById("txtcolorL").value = Lentes[index].colorL;
        document.getElementById("txtqueraL").value = Lentes[index].queraL;
        document.getElementById("btnDeleteLente").classList.remove("disabled");
        document.getElementById("btnAddLente").classList.add("disabled");
        indexLenteSeleccionado = index;
    }
}

export function clean() {
    document.getElementById("txtnombreLDC").value = "";
    document.getElementById("txtmarcaL").value = "";
    document.getElementById("txtcolorL").value = "";
    document.getElementById("txtqueraL").value = "";

    document.getElementById("btnUpdateLente").classList.add("disabled");
    document.getElementById("btnDeleteLente").classList.add("disabled");
    document.getElementById("btnAddLente").classList.remove("disabled");
    indexLenteSeleccionado = 0;
}
export function deleteLente() {
    Swal.fire({
        title: '¿Quieres eliminar el Lente de contacto seleccionado?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#6200EE',
        cancelButtonColor: '#d33',
        CancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Lentes[indexLenteSeleccionado].estatus = "Inactivo";
            clean();
            loadTabla();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}

export function modificarLente() {
    Swal.fire({
        title: '¿Quieres modificar el lente de contacto?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#6200EE',
        denyButtonText: `No guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            updateLente();
            Swal.fire('Guardado!', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guargados!', '', 'warning');
        }
    });
}

//-----------------------------------------------------VALIDACION DE CAMPOS---------------------------------------------------------- 
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombreLDC: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    marcaL: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    colorL: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    queraL: /^\d{7,10}$/ // 7 a 14 numeros.
};

const campos = {
    nombreLDC: false,
    marcaL: false,
    colorL: false,
    queraL: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombreLDC":
            validarCampo(expresiones.nombreLDC, e.target, 'nombreLDC');
            break;
        case "marcaL":
            validarCampo(expresiones.marcaL, e.target, 'marcaL');
            break;
        case "colorL":
            validarCampo(expresiones.colorL, e.target, 'colorL');
            break;
        case "queraL":
            validarCampo(expresiones.queraL, e.target, 'queraL');
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

export function agregarLC() {
    if (campos.nombreLDC && campos.marcaL && campos.queraL) {
        addLente();
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

