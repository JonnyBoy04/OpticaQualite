/* global Swal */

async function encriptar(texto) {
    const encoder = new TextEncoder();//Invocamos la clase que convierte un String
    const data = encoder.encode(texto);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function iniciarSesion() {
    Swal.fire({
        title: 'Inicio de sesion',
        html: `<span class="input-group-addon"><i class="fa-solid fa-envelope fa-fw"></i></span>
               <input type="text" id="login" class="swal2-input" placeholder="Usuario">
               <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
               <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: 'Ingresar',
        focusConfirm: false,
        preConfirm: () => {
            let datos = null;
            let params = null;
            let url = "api/log/in";
            let login = Swal.getPopup().querySelector('#login').value;
            let password = Swal.getPopup().querySelector('#password').value;

            encriptar(password).then((textoEncriptado) => {
                datos = JSON.stringify({nombre: login, contrasenia: textoEncriptado});
                params = new URLSearchParams({datos: datos});
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
                            if (data.exception != null) {
                                Swal.fire('', 'Error interno de servidar. Intente nuevamente más tarde.', 'error')
                                return;
                            }
                            if (data.error != null) {
                                Swal.fire('', data.error, 'warning');
                                return;
                            } else {
                                cargarMenu();
                                Swal.fire('Sesion iniciada correctamente', '', 'success');
                                document.getElementById("botonIniciarSesion").innerHTML = '<h2 class="text-white" style="display:flex; align-items: center; font-size: 22px;">' + data.persona.nombre + ' ' + data.persona.apellidoPaterno + ' ' + data.persona.apellidoMaterno + '<i class="logo fa fa-user-circle" aria-hidden="true"></i></h2>';
                                document.getElementById("menu").innerHTML =
                                        '<div class="area"></div>\n\
                            <nav class="main-menu">\n\
                                <ul>\n\
                                    <li class="has-subnav">\n\
                                        <a  onclick="cargarModuloClientes()">\n\
                                            <i class="fa fa-users fa-2x"></i>\n\
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
                                        <a  onclick="cargarModuloArmazon()">\n\
                                           <i class="fa-solid fa-glasses fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                -Armazones\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    \n\<li>\n\
                                        <a  onclick="cargarModuloAccesorios()">\n\
                                           <i class="fa-solid fa-basket-shopping fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                -Accesorios\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    <li>\n\
                                       <a  onclick="cargarModuloSoluciones()">\n\
                                            <i class="fa-solid fa-bottle-droplet fa-2x"></i></i>\n\
                                            <span class="nav-text">\n\
                                                -Soluciones\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    <li>\n\
                                        <a  onclick="cargarmoduloLDC()">\n\
                                           <i class="fa-solid fa-eye fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                -Lente de contacto\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
\n\                                 <li>\n\
                                        <a  onclick="cargarModuloExamenVista()">\n\
                                            <i class="fa-solid fa-file-lines fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Examen de la vista\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                    <li>\n\
                                        <a  onclick="cargarModuloPresupuesto()">\n\
                                           <i class="fa-solid fa-coins fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Presupuesto\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                     <li>\n\
                                        <a  onclick="cargarModuloVentas()">\n\
                                            <i class="fa-solid fa-bag-shopping fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Ventas\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                  <li>\n\
                                        <a  onclick="cargarModuloPagos()">\n\
                                            <i class="fa-solid fa-money-bill fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Pagos\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                     <li>\n\
                                        <a  onclick="cargarModuloCompra()">\n\
                                            <i class="fa-solid fa-cart-shopping fa-2x"></i>\n\
                                            <span class="nav-text">\n\
                                                Bitacora de copra\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                </ul>\n\
                                <ul class="logout">\n\
                                    <li>\n\
                                       <a onclick="cerrarSesion()">\n\
                                             <i class="gg-log-off"></i>\n\
                                            <span class="nav-text">\n\
                                                Cerrar sesión\n\
                                            </span>\n\
                                        </a>\n\
                                    </li>\n\
                                </ul>\n\
                            </nav>';
                                document.getElementById("titulo").classList.add("Desactivado");
                                localStorage.setItem('currentUser', JSON.stringify(data));
                            }
                        });
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
            let em = localStorage.getItem('currentUser');
            let empleado = {"empleado": em};
            let params = new URLSearchParams(empleado);

            fetch("api/log/out",
                    {method: "POST",
                        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                        body: params})
                    .then(reaponse => {
                        return reaponse.json();
                    })
                    .then(function (data) {
                        if (data.exception != null) {
                            Swal.fire('', 'Error interno de servidar. Intente nuevamente más tarde.', 'error');
                            return;
                        }
                        if (data.error != null) {
                            Swal.fire('', data.error, 'warning');
                            return;
                        } else {
                            localStorage.removeItem('currentUser');
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
    });
}

