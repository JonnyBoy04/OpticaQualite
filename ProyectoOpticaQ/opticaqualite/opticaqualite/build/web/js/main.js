/* global fetch, Swal, import */
let moduloEmpleado;
let moduloLDC;
let moduloArmazones;
let moduloSoluciones;
let moduloAccesorio;
let moduloTratamientos;
let moduloCliente;
let moduloMaterial;
let moduloVenta;
let index;


function cargarMenu() {
    $(document).ready(function () {
        $('.menu li:has(ul)').click(function (e) {
            e.preventDefault();
            if ($(this).hasClass('activado')) {
                $(this).removeClass('activado');
                $(this).children('ul').slideUp();
            } else {
                $('.menu li ul').slideUp();
                $('.menu li').removeClass('activado');
                $(this).addClass('activado');
                $(this).children('ul').slideDown();
            }
        });
        $('.menu li ul li a').click(function () {
            window.location.onclick = $(this).attr("onclick");
        });
    });
}

function cargarModuloClientes() {
    fetch("modulos/catalogoClientes/moduloClientes.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor").innerHTML = html;
                        import("../modulos/catalogoClientes/scriptClientes.js").then(
                                function (controller) {
                                    moduloCliente = controller;
                                    moduloCliente.inicializar();
                                }
                        );
                    }
            );
}

function cargarModuloEmpleados() {
    fetch("modulos/catalogoEmpleados/moduloEmpleados.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor").innerHTML = html;
                        import("../modulos/catalogoEmpleados/scriptEmpleados.js").then(
                                function (controller) {
                                    moduloEmpleado = controller;
                                    moduloEmpleado.inicializar();
                                }
                        );
                    }
            );
}

function cargarModuloMateriales() {
    fetch("modulos/catalogoMateriales/moduloMateriales.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor").innerHTML = html;
                        import("../modulos/catalogoMateriales/scriptMateriales.js").then(
                                function (controller) {
                                    moduloMaterial = controller;
                                    moduloMaterial.inicializar();
                                }
                        );
                    }
            );
}

function cargarmoduloLDC() {
    fetch("modulos/catalogoLentesContacto/LentesDeContacto.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor").innerHTML = html;
                        import("../modulos/catalogoLentesContacto/ScriptLentesCo.js").then(
                                function (controller) {
                                    moduloLDC = controller;
                                }
                        );
                    }
            );
}

function cargarModuloArmazon() {
    fetch("modulos/catalogoArmazones/moduloArmazones.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor").innerHTML = html;
                        import("../modulos/catalogoArmazones/scriptArmazones.js").then(
                                function (controller) {
                                    moduloArmazones = controller;
                                    moduloArmazones.inicializar();
                                }
                        );
                    }
            );
}

function cargarModuloSoluciones() {
    fetch("modulos/catalogoSoluciones/moduloSoluciones.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor").innerHTML = html;
                        import("../modulos/catalogoSoluciones/scriptSoluciones.js").then(
                                function (controller) {
                                    moduloSoluciones = controller;
                                    moduloSoluciones.inicializar();
                                }
                        );
                    }
            );
}


function cargarModuloAccesorios() {
    fetch("modulos/catalogoAccesorios/moduloAccesorios.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor").innerHTML = html;
                        import("../modulos/catalogoAccesorios/scriptAccesorios.js").then(
                                function (controller) {
                                    moduloAccesorio = controller;
                                    moduloAccesorio.inicializar();
                                }
                        );
                    }
            );
}

function cargarModuloTratamientos() {
    fetch("modulos/catalogoTratamiento/moduloTratamientos.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor").innerHTML = html;
                        import("../modulos/catalogoTratamiento/scriptTratamientos.js").then(
                                function (controller) {
                                    moduloTratamientos = controller;
                                    moduloTratamientos.inicializar();
                                }
                        );
                    }
            );
}
function cargarModuloExamenVista() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Modulo en construcción!',
        footer: 'El modulo se terminara en el siguiente cuatrimestre'
    });
}

function cargarModuloPresupuesto() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Modulo en construcción!',
        footer: 'El modulo se terminara en el siguiente cuatrimestre'
    });
}

function cargarModuloVentas() {
    fetch("modulos/catalogoVenta/moduloVentas.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor").innerHTML = html;
                        import("../modulos/catalogoVenta/scriptVentas.js").then(
                                function (controller) {
                                    moduloVenta = controller;
                                    moduloVenta.inicializar();
                                }
                        );
                    }
            );
}

function cargarModuloPagos() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Modulo en construcción!',
        footer: 'El modulo se terminara en el siguiente cuatrimestre'
    });
}

function cargarModuloCompra() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Modulo en construcción!',
        footer: 'El modulo se terminara en el siguiente cuatrimestre'
    });
}
function cargarIndex() {
    fetch("../index.html")
            .then(
                    function (response) {
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedor").innerHTML = html;
                        import("main.js").then(
                                function (controller) {
                                    index = controller;
                                }
                        );
                    }
            );
}