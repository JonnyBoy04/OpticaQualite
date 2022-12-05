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
            let url = "api/login/login";
            let login = Swal.getPopup().querySelector('#login').value;
            let password = Swal.getPopup().querySelector('#password').value;
            datos = {usuario: login, contrasenia: password};
            params = new URLSearchParams(datos);
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
                        if (login === data.usuario.nombre && password === data.usuario.contrasenia) {
                           cargarMenu();
                    Swal.fire('Sesion iniciada correctamente', '', 'success');
                    document.getElementById("botonIniciarSesion").innerHTML = '<h2 class="text-white" style="display:flex; align-items: center; font-size: 22px;">Simón Jonathan Zendejas Gutiérrez<i class="logo fa fa-user-circle" aria-hidden="true"></i></h2>';
                    document.getElementById("menu").innerHTML =
                                '<div class="area"></div>\n\
                            <nav class="main-menu">\n\
                                <ul>\n\
                                    <li class="has-subnav">\n\
                                        <a  onclick="cargarModuloClientes()">\n\
                                            <i class="fa fa-user fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Clientes\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    <li class="has-subnav">\n\
                                        <a onclick="cargarModuloEmpleados()">\n\
                                            <i class="fa fa-user fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Empleado\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    <li class="has-subnav">\n\
                                        <a  onclick="cargarModuloMateriales()">\n\
                                           <i class="fa fa-list fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Materiales\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    <li class="has-subnav">\n\
                                        <a  onclick="cargarModuloTratamientos()">\n\
                                           <i class="fa fa-folder-open fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Tratamientos\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    <li>\n\
                                        <a>\n\
                                            <i class="fa fa-shopping-cart fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Productos\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    \n\<li>\n\
                                        <a  onclick="cargarModuloArmazon()">\n\
                                           <i class="fa fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                -Armazones\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    \n\<li>\n\
                                        <a  onclick="cargarModuloAccesorios()">\n\
                                           <i class="fa fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                -Accesorios\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    <li>\n\
                                       <a  onclick="cargarModuloSoluciones()">\n\
                                            <i class="fa fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                -Soluciones\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    <li>\n\
                                        <a  onclick="cargarmoduloLDC()">\n\
                                           <i class="fa fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                -Lente de contacto\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
\n\                                 <li>\n\
                                        <a  onclick="cargarModuloExamenVista()">\n\
                                            <i class="fa fa-eye fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Examen de la vista\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    <li>\n\
                                        <a  onclick="cargarModuloPresupuesto()">\n\
                                            <i class="fa fa-bar-chart-o fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Presupuesto\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                     <li>\n\
                                        <a  onclick="cargarModuloVentas()">\n\
                                            <i class="fa fa-bar-chart-o fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Ventas\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                  <li>\n\
                                        <a  onclick="cargarModuloPagos()">\n\
                                            <i class="fa fa-bar-chart-o fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Pagos\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                     <li>\n\
                                        <a  onclick="cargarModuloCompra()">\n\
                                            <i class="fa fa-bar-chart-o fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Bitacora de copra\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                </ul>\n\
                                <ul class="logout">\n\
                                    <li>\n\
                                       <a onclick="cerrarSesion()">\n\
                                             <i class="fa fa-power-off fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Cerrar sesión\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                </ul>\n\
                            </nav>';
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

