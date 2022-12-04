/*Login*/
/* global Swal */

function iniciarSesion() {
    Swal.fire({
        title: 'Inicio de sesion',
        html: `<span class="input-group-addon"><i class="fa fa-envelope-o fa-fw"></i></span>
               <input type="text" id="login" class="swal2-input" placeholder="Usuario">
               <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
               <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: 'Ingresar',
        focusConfirm: false,
        preConfirm: () => {
            let datos = null;
            let params = null;
            let login = Swal.getPopup().querySelector('#login').value;
            let password = Swal.getPopup().querySelector('#password').value;
            datos = {usuario: login, contrasenia: password};
            params = new URLSearchParams(datos);
            let url = "api/login/login";
            fetch(url,
                    {
                        method: "POST",
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        body: params
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(function (data)
                    {
                        console.log(data);
                        if (login === data.usuario.nombre && password === data.usuario.contrasenia) {
                            cargarMenu();
                            Swal.fire('Sesion iniciada correctamente', '', 'success');
                            document.getElementById("botonIniciarSesion").innerHTML = '<h2 class="text-white"><i class="logo fa fa-user-circle" aria-hidden="true"></i>' + data.persona.nombre + ' ' + data.persona.apellidoPaterno + ' ' + data.persona.apellidoMaterno + '</h2>\n\
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
                         <li><a onclick="cargarModuloAccesorios();">Accesorios</a>\n\
                         </li>\n\
                         <li><a onclick="cargarModuloArmazon();">Armazones</a>\n\
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
                            document.getElementById("titulo").classList.add("Desactivado");
                        } else {
                            Swal.showValidationMessage(`Usuario o contraseña incorrectas.`);
                        }
                    });
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
            document.getElementById("contenedor").innerHTML = '<div class="imgBienvenida">\n\
                        <img alt="conenedor" src="src/bienvenida.jpg" width="auto" height="530"/>\n\
                    </div>';
            document.getElementById("titulo").classList.remove("Desactivado");
        }
    });
}
