/* global fetch, Swal */
let indexArmazónSeleccionado;
let armazones = [];
let i = 4;
let codigob = "OQ" + i;


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

export function agregarArmazon() {
     i++;
    let
            nombre,
            marca,
            modelo,
            color,
            descripcion,
            codigo,
            precio_venta,
            precio_compra,
            existencia;

    nombre = document.getElementById("txtNombreArm").value;
    marca = document.getElementById("txtMarca").value;
    modelo = document.getElementById("txtModelo").value;
    color = document.getElementById("txtColor").value;
    descripcion = document.getElementById("txtDesc").value;
    precio_venta = document.getElementById("txtPrecioVenta").value;
    precio_compra = document.getElementById("txtPrecioCompra").value;
    existencia = document.getElementById("txtExis").value;

    let armazon = {};
    armazon.codigo = codigob;
    armazon.nombre = nombre;
    armazon.marca = marca;
    armazon.modelo = modelo;
    armazon.color = color;
    armazon.descripcion = descripcion;
    armazon.precio_venta = precio_venta;
    armazon.precio_compra = precio_compra;
    armazon.existencia = existencia;
    armazon.estatus = "Activo";
    armazones.push(armazon);
    limpiarFormulario();
    cargarTabla();
   
}

export function registrarArmazones() {
    if (campos.nombreAr && campos.marca && campos.modelo && campos.color && campos.precioven && campos.preciocom && campos.existencias) {
        agregarArmazon();
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

export function cargarTabla() {
    let cuerpo = "";
    armazones.forEach(function (armazon) {
        let registro =
                '<tr onclick="moduloArmazones.seleccionarArmazon(' + armazones.indexOf(armazon) + ');">' +
                '<td>' + armazon.codigo + '</td>' +
                '<td>' + armazon.nombre + '</td>' +
                '<td>' + armazon.marca + '</td>' +
                '<td>' + armazon.color + '</td>' +
                '<td>' + armazon.descripcion + '</td>' +
                '<td>$' + armazon.precio_venta + '</td>' +
                '<td>$' + armazon.precio_compra + '</td>' +
                '<td>' + armazon.existencia + ' Pzas</td>' +
                '<td>' + armazon.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblArmazones").innerHTML = cuerpo;
}

export function buscarArmazon() {
    let filtro = document.getElementById("txtBusquedaArmazon").value;
    let filtroMinuscula = filtro.toLowerCase();


    let resultados = armazones.filter(element => element.nombre.toLowerCase() === filtroMinuscula || element.nombre.toLowerCase().split(' ')[0] === filtroMinuscula || element.nombre.toLowerCase().split(' ')[2] === filtroMinuscula || element.nombre.toLowerCase().split(' ')[1] === filtroMinuscula || element.codigo === filtro);
    let cuerpo = "";
    resultados.forEach(function (armazon) {
        let registro =
                '<tr onclick="moduloArmazones.seleccionarArmazon(' + armazones.indexOf(armazon) + ');">' +
                '<td>' + armazon.codigo + '</td>' +
                '<td>' + armazon.nombre + '</td>' +
                '<td>' + armazon.marca + '</td>' +
                '<td>' + armazon.color + '</td>' +
                '<td>' + armazon.descripcion + '</td>' +
                '<td>$' + armazon.precio_venta + '</td>' +
                '<td>$' + armazon.precio_compra + '</td>' +
                '<td>' + armazon.existencia + ' Pzas</td>' +
                '<td>' + armazon.estatus + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblArmazones").innerHTML = cuerpo;
}
export function seleccionarArmazon(index) {
    if (armazones[index].estatus === "Inactivo") {
        Swal.fire('Armazón eliminado!', '', 'warning');
    } else {
        document.getElementById("txtNombreArm").value = armazones[index].nombre;
        document.getElementById("txtMarca").value = armazones[index].marca;
        document.getElementById("txtModelo").value = armazones[index].modelo;
        document.getElementById("txtColor").value = armazones[index].color;
        document.getElementById("txtDesc").value = armazones[index].descripcion;
        document.getElementById("txtPrecioVenta").value = armazones[index].precio_venta;
        document.getElementById("txtPrecioCompra").value = armazones[index].precio_compra;
        document.getElementById("txtExis").value = armazones[index].existencia;
        document.getElementById("btnUpdateArm").classList.remove("disabled");
        document.getElementById("btnDeleteArm").classList.remove("disabled");
        document.getElementById("btnAddArm").classList.add("disabled");
        indexArmazónSeleccionado = index;

        JsBarcode("#codigoBarra", armazones[index].codigo, {
            format: "CODE128A",
            lineColor: "#000",
            width: 2,
            height: 40,
            displayValue: true
        });
    }
}

export function limpiarFormulario() {
    document.getElementById("txtNombreArm").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtModelo").value = "";
    document.getElementById("txtColor").value = "";
    document.getElementById("txtDesc").value = "";
    document.getElementById("txtPrecioVenta").value = "";
    document.getElementById("txtPrecioCompra").value = "";
    document.getElementById("txtExis").value = "";

    JsBarcode("#codigoBarra", " ", {
        format: "CODE128A",
        lineColor: "#000",
        width: 2,
        height: 40,
        displayValue: true
    });
    document.getElementById("btnUpdateArm").classList.add("disabled");
    document.getElementById("btnDeleteArm").classList.add("disabled");
    document.getElementById("btnAddArm").classList.remove("disabled");
    indexArmazónSeleccionado = 0;

}
JsBarcode("#codigoBarra", " ", {
    format: "CODE128A",
    lineColor: "#000",
    width: 2,
    height: 40,
    displayValue: true
});
export function modificarArmazon() {
    let
            nombre,
            marca,
            modelo,
            color,
            descripcion,
            codigo,
            precio_venta,
            precio_compra,
            existencia;

    nombre = document.getElementById("txtNombreArm").value;
    marca = document.getElementById("txtMarca").value;
    modelo = document.getElementById("txtModelo").value;
    color = document.getElementById("txtColor").value;
    descripcion = document.getElementById("txtDesc").value;
    precio_venta = document.getElementById("txtPrecioVenta").value;
    precio_compra = document.getElementById("txtPrecioCompra").value;
    existencia = document.getElementById("txtExis").value;

    let armazon = {};
    armazon.nombre = nombre;
    armazon.marca = marca;
    armazon.modelo = modelo;
    armazon.color = color;
    armazon.descripcion = descripcion;
    armazon.codigo = codigo;
    armazon.precio_venta = precio_venta;
    armazon.precio_compra = precio_compra;
    armazon.existencia = existencia;
    armazon.estatus = "Activo";
    armazones[indexArmazónSeleccionado] = armazon;
    limpiarFormulario();
    cargarTabla();
}

export function ActualizarArmazon() {
    Swal.fire({
        title: '¿Quieres modificar el armazón?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#6200EE',
        denyButtonText: `No guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            modificarArmazon();
            Swal.fire('Guardado!', '', 'success');
        } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guargados!', '', 'warning');
        }
    });
}

export function borrarArmazon() {
    Swal.fire({
        title: '¿Quieres eliminar el armazón seleccionado?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#6200EE',
        cancelButtonColor: '#d33',
        CancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            armazones[indexArmazónSeleccionado].estatus = "Inactivo";
            limpiarFormulario();
            cargarTabla();
            Swal.fire('Eliminado con exito!', '', 'success');
        }
    });
}

fetch("modulos/catalogoArmazones/datos_armazones.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            armazones = jsondata;
            cargarTabla();
        }
        );
//-----------------------------------------------------VALIDACION DE CAMPOS---------------------------------------------------------- 
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const expresiones = {
    nombreAr: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    marca: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    modelo: /^.{4,200}$/,
    color: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // 7 a 14 numeros.
    descripcion: /^.{4,200}$/,
    precioven: /^\d{1,1000}$/,
    preciocom: /^\d{1,1000}$/,
    existencias: /^\d{1,1000}$/
};
const campos = {
    nombreAr: false,
    marca: false,
    modelo: false,
    color: false,
    descripcion: false,
    precioven: false,
    preciocom: false,
    existencias: false
};
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombreAr":
            validarCampo(expresiones.nombreAr, e.target, 'nombreAr');
            break;
        case "marca":
            validarCampo(expresiones.marca, e.target, 'marca');
            break;
        case "modelo":
            validarCampo(expresiones.modelo, e.target, 'modelo');
            break;
        case "color":
            validarCampo(expresiones.color, e.target, 'color');
            break;
        case "descripcion":
            validarCampo(expresiones.descripcion, e.target, 'descripcion');
            break;
        case "precioven":
            validarCampo(expresiones.precioven, e.target, 'precioven');
            break;
        case "preciocom":
            validarCampo(expresiones.precioven, e.target, 'preciocom');
            break;
        case "existencias":
            validarCampo(expresiones.existencias, e.target, 'existencias');
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

