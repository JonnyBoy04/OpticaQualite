/* global fetch, Swal, CryptoJS */
let indexAccesorioSeleccionado;
let accesorios = [];

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
export function agregarAccesorio() {
    let
            nombre,
            precioCompra,
            existencias,
            marca,
            precioVenta;

    nombre = document.getElementById("txtNombreAccesorio").value;
    precioCompra = document.getElementById("txtPrecioCompraA").value;
    precioVenta = document.getElementById("txtPrecioVentaA").value;
    existencias = document.getElementById("txtExistenciaA").value;
    marca = document.getElementById("txtMarcaA").value;

    let accesorio = {};
    accesorio.nombre = nombre;
    accesorio.precioCompra = precioCompra;
    accesorio.precioVenta = precioVenta;
    accesorio.existencias = existencias;
    accesorio.marca = marca;
    accesorio.estatus = "Activo";

    accesorios.push(accesorio);
    limpiarFormulario();
    cargarTabla();
}

export function registrarAccesorio() {
    if (campos.marcaA && campos.marcaA && campos.precioC && campos.precioV && campos.existenciaA) {
        agregarAccesorio();
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

export function cargarTabla() {
    let cuerpo = "";
    accesorios.forEach(function (accesorio) {
        let registro =
                '<tr onclick="moduloAccesorio.seleccionarAccesorio(' + accesorios.indexOf(accesorio) + ');">' +
                '<td>' + accesorio.nombre + '</td>' +
                '<td>$' + accesorio.precioCompra + '</td>' +
                '<td>$' + accesorio.precioVenta + '</td>' +
                '<td>' + accesorio.existencias + ' Pzas</td>' +
                '<td>' + accesorio.estatus + '</td></tr>';
        cuerpo += registro;
    });

    document.getElementById("tblAccesorio").innerHTML = cuerpo;

}

export function buscarAccesorio() {
    let filtro = document.getElementById("txtBusquedaAccesorio").value;

    let resultados = accesorios.filter(element => element.nombre === filtro);

    let cuerpo = "";
    resultados.forEach(function (accesorio) {
        let registro =
                '<tr onclick="moduloAccesorio.seleccionarAccesorio(' + accesorios.indexOf(accesorio) + ');">' +
                '<td>' + accesorio.nombre + '</td>' +
                '<td>$' + accesorio.precioCompra + '</td>' +
                '<td>$' + accesorio.precioVenta + '</td>' +
                '<td>' + accesorio.existencias + ' Pzas</td>' +
                '<td>' + accesorio.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblAccesorio").innerHTML = cuerpo;


}

export function seleccionarAccesorio(index) {
    if (accesorios[index].estatus === "Inactivo") {
        Swal.fire('Accesorio eliminado!', '', 'warning');
    } else {
        document.getElementById("txtNombreAccesorio").value = accesorios[index].nombre;
        document.getElementById("txtPrecioCompraA").value = accesorios[index].precioCompra;
        document.getElementById("txtPrecioVentaA").value = accesorios[index].precioVenta;
        document.getElementById("txtExistenciaA").value = accesorios[index].existencias;
        document.getElementById("txtMarcaA").value = accesorios[index].marca;

        document.getElementById("btnUpdateAcc").classList.remove("disabled");
        document.getElementById("btnDeleteAcc").classList.remove("disabled");
        document.getElementById("btnAddAcc").classList.add("disabled");
        indexAccesorioSeleccionado = index;
    }
}

export function limpiarFormulario() {

    document.getElementById("txtNombreAccesorio").value = "";
    document.getElementById("txtPrecioCompraA").value = "";
    document.getElementById("txtPrecioVentaA").value = "";
    document.getElementById("txtExistenciaA").value = "";
    document.getElementById("txtMarcaA").value = "";

    document.getElementById("btnUpdateAcc").classList.add("disabled");
    document.getElementById("btnDeleteAcc").classList.add("disabled");
    document.getElementById("btnAddAcc").classList.remove("disabled");
    indexAccesorioSeleccionado = 0;
}

export function modificarAccesorio() {
    let nombre,
            precioCompra,
            existencias,
            marca,
            precioVenta;

    nombre = document.getElementById("txtNombreAccesorio").value;
    precioCompra = document.getElementById("txtPrecioCompraA").value;
    precioVenta = document.getElementById("txtPrecioVentaA").value;
    existencias = document.getElementById("txtExistenciaA").value;
    marca = document.getElementById("txtMarcaA").value;

    let accesorio = {};
    accesorio.nombre = nombre;
    accesorio.precioCompra = precioCompra;
    accesorio.precioVenta = precioVenta;
    accesorio.existencias = existencias;
    accesorio.marca = marca;

    accesorio.estatus = "Activo";
    accesorios[indexAccesorioSeleccionado] = accesorio;
    limpiarFormulario();
    cargarTabla();
}
export function ActualizarAccesorio() {
    Swal.fire({
        title: '¿Quieres modificar el accesorio?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#6200EE',
        denyButtonText: `No guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            modificarAccesorio();
            Swal.fire('Guardado!', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guargados!', '', 'warning');
        }
    });
}


export function borrarAccesorio() {
    Swal.fire({
        title: '¿Quieres eliminar el accesorio seleccionado?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#6200EE',
        cancelButtonColor: '#d33',
        CancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            accesorios[indexAccesorioSeleccionado].estatus = "Inactivo";
            limpiarFormulario();
            cargarTabla();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}

fetch("modulos/catalogoAccesorios/datos_accesorios.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            accesorios = jsondata;
            cargarTabla();
        }
        );


//------------------ Validacion -------------------------//

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {

    nombreA: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    precioC: /^\d{1,40}$/,
    precioV: /^\d{1,40}$/,
    marcaA: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    existenciaA: /^\d{1,40}$/
};

const campos = {

    nombreA: false,
    precioC: false,
    precioV: false,
    marcaA: false,
    existenciaA: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombreA":
            validarCampo(expresiones.nombreA, e.target, 'nombreA');
            break;
        case "precioC":
            validarCampo(expresiones.precioC, e.target, 'precioC');
            break;
        case "precioV":
            validarCampo(expresiones.precioV, e.target, 'precioV');
            break;
        case "marcaA":
            validarCampo(expresiones.marcaA, e.target, 'marcaA');
            break;
        case "existenciaA":
            validarCampo(expresiones.existenciaA, e.target, 'existenciaA');
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
