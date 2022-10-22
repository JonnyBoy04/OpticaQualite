/*Login*/
/* global Swal */

function iniciarSesion() {
    Swal.fire({
        title: 'Inicio de sesion',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
               <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: 'Ingresar',
        focusConfirm: false,
        preConfirm: () => {
            let login = Swal.getPopup().querySelector('#login').value;
            let password = Swal.getPopup().querySelector('#password').value;
            if (login === "admin" && password === "admin") {
                cargarMenu();
                Swal.fire('Sesion iniciada correctamente', '', 'success');
                document.getElementById("botonIniciarSesion").innerHTML = '<h2 class="text-white"><i class="logo fa fa-user-circle" aria-hidden="true"></i>Simón Jonathan Zendejas Gutiérrez</h2>\n\
                      <button title="Cerrar Sesion" type="button" class="boton2" onclick="cerrarSesion()"><i class="fa fa-sign-out" aria-hidden="true"></i></button>';
                document.getElementById("menu").innerHTML =
                        '<ul class="menu">\n\
                     <li><a onclick="cargarModuloClientes();">Clientes</a></li>\n\
                     <li><a onclick="cargarModuloEmpleados();">Empleados</a>\n\
                     </li>\n\
                     <li><a onclick="cargarModuloMateriales();">Materiales</a>\n\
                     </li>\n\
                     <li><a onclick="cargarModuloTratamientos();">Tratamientos</a>\n\
                     </li>\n\
                     <li><a onclick=""><i class="icono der fa fa-chevron-down" aria-hidden="true"></i>Productos</a>\n\
                         <ul>\n\
                             <li><a onclick="cargarModuloArmazon();">Armazones</a>\n\
                             </li>\n\
                             <li><a onclick="cargarModuloAccesorios();">Accesorios</a>\n\
                             </li>\n\
                             <li><a onclick="cargarModuloSoluciones();">Soluciones</a>\n\
                             </li>\n\
                             <li><a onclick="cargarmoduloLDC();">Lentes de contacto</a>\n\
                             </li>\n\
                        </ul>\n\
                     </li>\n\
                     <li><a onclick="cargarModuloExamenVista();">Examenes de la vista</a>\n\
                     </li>\n\
                     <li><a onclick="cargarModuloPresupuesto();">Presupuesto</a>\n\
                     </li>\n\
                     <li><a onclick="cargarModuloVentas();">Ventas</a>\n\
                     </li>\n\
                     <li><a onclick="cargarModuloPagos();">Pagos</a>\n\
                     </li>\n\
                     <li><a onclick="cargarModuloCompra();">Bitácora de compra</a>\n\
                     </li>\n\
                 </ul>';
                document.getElementById("mapaSection").classList.remove("mapa");
                document.getElementById("mapaSection").classList.add("Desactivado");
                document.getElementById("video").classList.remove("video");
                document.getElementById("video").classList.add("Desactivado");
                document.getElementById("titulo").classList.add("Desactivado");

            } else {
                Swal.showValidationMessage(`Usuario o contraseña incorrectas.`);
            }
        }

    });
}

function cerrarSesion() {
    Swal.fire({
        title: '¿Cerrar sesion?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        CancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("botonIniciarSesion").innerHTML = '<button type="button" class="boton2" onclick="iniciarSesion()">Iniciar sesion</button>';
            document.getElementById("menu").innerHTML = '';
            Swal.fire('Sesion cerrada correctamente', '', 'success');
            document.getElementById("mapaSection").classList.add("mapa");
                document.getElementById("mapaSection").classList.remove("Desactivado");
                document.getElementById("video").classList.add("video");
                document.getElementById("video").classList.remove("Desactivado");
                document.getElementById("contenedor").innerHTML = '<div class="imgBienvenida">\n\
                        <img alt="conenedor" src="src/bienvenida.jpg" width="auto" height="530"/>\n\
                    </div>';
             document.getElementById("titulo").classList.remove("Desactivado");
        }
    });
}
