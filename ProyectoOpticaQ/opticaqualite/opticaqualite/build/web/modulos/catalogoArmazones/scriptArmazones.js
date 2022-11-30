/* global fetch, Swal */
let indexArmazónSeleccionado;
let armazones = [];
let inputImagenArm = null;
export function inicializar() {
    configureTableFilter(document.getElementById('txtBusquedaArmazon'),
            document.getElementById('tablaArm'));

    inputImagenArm = document.getElementById("txtFotografia");
    inputImagenArm.onchange = function (e) {
        cargarFotografia(inputImagenArm);
    };
    $('#desplegar').on('click', function () {
        $('#form').css('display', 'block');
        $('#listar').css('display', 'block');
        $('#desplegar').css('display', 'none');
        $('#tablaArm').css('display', 'none');
        $('#buscar').css('display', 'none');
    });

    $('#listar').on('click', function () {
        $('#form').css('display', 'none');
        $('#listar').css('display', 'none');
        $('#desplegar').css('display', 'block');
        $('#tablaArm').css('display', '');
        $('#buscar').css('display', 'block');
    });
    refrescarTabla();
}

function cargarFotografia(objetoInputFile) {
    //Revisamos que el usuario haya seleccionado un archivo
    if (objetoInputFile.files && objetoInputFile.files[0]) {
        let reader = new FileReader();

        //Agregamos un oyente al lector del archivo para que,
        //en cuanto el usuario carue una imagen, esta se lea
        //y se convierta de forma automatica en una cadena de Base64:
        reader.onload = function (e) {
            let fotoB64 = e.target.result;
            document.getElementById("imgArm").src = fotoB64;
            document.getElementById("txtACodigoImageArm").value =
                    fotoB64.substring(fotoB64.indexOf(",") + 1, fotoB64.length);
        };
        //leemos el archivo que selecciono el usuario y lo
        //convertimos en una cadena con la Base64
        reader.readAsDataURL(objetoInputFile.files[0]);
    }
}

export function guardarArmazon() {

    let datos = null;
    let params = null;
    let armazon = new Object();// creamos un objeto de tipo armazon

    armazon.producto = new Object();

    if (document.getElementById("txtIdArmazon").value.trim().length < 1) {
        armazon.idArmazon = 0;
        armazon.producto.idProducto = 0;
    } else {
        armazon.idArmazon = parseInt(document.getElementById("txtIdArmazon").value);
        armazon.producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
    }

    armazon.producto.nombre = document.getElementById("txtNombreArm").value;
    armazon.producto.marca = document.getElementById("txtMarcaArm").value;
    armazon.producto.codigoBarras = document.getElementById("codigoBarraArm").value;
    armazon.producto.precioCompra = document.getElementById("txtPrecioCompra").value;
    armazon.producto.precioVenta = document.getElementById("txtPrecioVenta").value;
    armazon.producto.existencias = document.getElementById("txtExis").value;
    armazon.fotografia = document.getElementById("txtACodigoImageArm").value;
    armazon.modelo = document.getElementById("txtModelo").value;
    armazon.color = document.getElementById("txtColor").value;
    armazon.dimensiones = document.getElementById("txtDimen").value;
    armazon.descripcion = document.getElementById("txtDesc").value;

    //Comvierte un dato tipo Script a Cadena Json
    datos = {
        datosArmazon: JSON.stringify(armazon)
    };
    params = new URLSearchParams(datos);

    fetch("api/armazon/save",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
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

                document.getElementById("txtIdArmazon").value = data.idArmazon;
                document.getElementById("txtIdProducto").value = data.producto.idProducto;
                Swal.fire('', 'Datos del Armazon actualizados correctamente.', 'success');
                refrescarTabla();
            });
}

export function refrescarTabla() {
    let url = "api/armazon/getAll";
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

export function eliminar() {
    let datos = null;
    let params = null;
    let armazon = new Object();

    armazon.producto = new Object();

    armazon.producto.nombre = document.getElementById("txtNombreArm").value;
    armazon.producto.marca = document.getElementById("txtMarcaArm").values;
    armazon.producto.codigoBarras = document.getElementById("codigoBarraArm").value;
    armazon.producto.precioCompra = document.getElementById("txtPrecioCompra").value;
    armazon.producto.precioVenta = document.getElementById("txtPrecioVenta").value;
    armazon.producto.existencias = document.getElementById("txtExis").value;
    armazon.modelo = document.getElementById("txtModelo").value;
    armazon.color = document.getElementById("txtColor").value;
    armazon.dimensiones = document.getElementById("txtDimen").value;
    armazon.descripcion = document.getElementById("txtDesc").value;
    armazon.fotografia = document.getElementById("txtACodigoImageArm").value;

    armazon.idArmazon = parseInt(document.getElementById("txtIdArmazon").value);
    armazon.producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);

    //Convierte un dato tipo Script a Cadena Json
    datos = {
        datosArmazon: JSON.stringify(armazon)
    };

    params = new URLSearchParams(datos);

    fetch("api/armazon/delete",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
//                if (data.exception !== null) {
//                    Swal.fire('', 'Error interno del servidor. Intente nuevamente más tarde.', 'error');
//                    return;
//                }
//                if (data.error !== null) {
//                    Swal.fire('', data.error, 'warning');
//                    return;
//                }
//                if (data.errorperm !== null) {
//                    Swal.fire('', 'No tiene permiso pproductoara realizar esta operación', 'error');
//                    return;
//                }
                refrescarTabla();

            });


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

export function cargarTabla(data) {
    let cuerpo = "";
    armazones = data;
    armazones.forEach(function (armazon) {
        let registro =
                '<tr onclick="moduloArmazones.seleccionarArmazon(' + armazones.indexOf(armazon) + ');">' +
                '<td>' + armazon.producto.codigoBarras + '</td>' +
                '<td>' + armazon.producto.nombre + '</td>' +
                '<td>' + armazon.producto.marca + '</td>' +
                '<td>' + armazon.color + '</td>' +
                '<td>' + armazon.descripcion + '</td>' +
                '<td>$' + armazon.producto.precioVenta + '</td>' +
                '<td>$' + armazon.producto.precioCompra + '</td>' +
                '<td>' + armazon.producto.existencias + ' Pzas</td>' +
                '<td>' + armazon.producto.estatus + '</td></tr>';
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
                '<td>' + armazon.producto.codigoBarras + '</td>' +
                '<td>' + armazon.producto.nombre + '</td>' +
                '<td>' + armazon.producto.marca + '</td>' +
                '<td>' + armazon.color + '</td>' +
                '<td>' + armazon.descripcion + '</td>' +
                '<td>$' + armazon.producto.precioVenta + '</td>' +
                '<td>$' + armazon.producto.precioCompra + '</td>' +
                '<td>' + armazon.producto.existencias + ' Pzas</td>' +
                '<td>' + armazon.producto.status + '</td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblArmazones").innerHTML = cuerpo;
}
export function seleccionarArmazon(index) {
    if (armazones[index].estatus === 0) {
        Swal.fire('Armazón eliminado!', '', 'warning');
    } else {
        document.getElementById("txtNombreArm").value = armazones[index].producto.nombre;
        document.getElementById("txtMarcaArm").value = armazones[index].producto.marca;
        document.getElementById("txtModelo").value = armazones[index].modelo;
        document.getElementById("txtColor").value = armazones[index].color;
        document.getElementById("txtDesc").value = armazones[index].descripcion;
        document.getElementById("txtPrecioVenta").value = armazones[index].producto.precioVenta;
        document.getElementById("txtPrecioCompra").value = armazones[index].producto.precioCompra;
        document.getElementById("txtDimen").value = armazones[index].dimensiones;
        document.getElementById("txtExis").value = armazones[index].producto.existencias;
        document.getElementById("btnDeleteArm").classList.remove("disabled");
        document.getElementById("txtIdArmazon").value = armazones[index].idArmazon;
        document.getElementById("txtIdProducto").value = armazones[index].producto.idProducto;
        document.getElementById("txtACodigoImageArm").value = armazones[index].fotografia;
        JsBarcode("#codigoBarraArm", armazones[index].producto.codigoBarras, {
            format: "CODE128A",
            lineColor: "#000",
            width: 1.5,
            height: 30,
            displayValue: true
        });
        indexArmazónSeleccionado = index;
    }
}

export function limpiarFormulario() {
    document.getElementById("txtNombreArm").value = "";
    document.getElementById("txtMarcaArm").value = "";
    document.getElementById("txtModelo").value = "";
    document.getElementById("txtColor").value = "";
    document.getElementById("txtDesc").value = "";
    document.getElementById("txtPrecioVenta").value = "";
    document.getElementById("txtPrecioCompra").value = "";
    document.getElementById("txtExis").value = "";
    document.getElementById("codigoBarraArm").value = "";
    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtIdArmazon").value = "";
    document.getElementById("txtDimen").value = "";

    JsBarcode("#codigoBarraArm", " ", {
        format: "CODE128A",
        lineColor: "#000",
        width: 2,
        height: 40,
        displayValue: true
    });
    document.getElementById("btnDeleteArm").classList.add("disabled");
    document.getElementById("btnAddArm").classList.remove("disabled");
    indexArmazónSeleccionado = 0;

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

