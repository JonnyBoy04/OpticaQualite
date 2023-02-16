/* global Swal */

let indexVentaSeleccionado;
let ventas = [];

export function inicializar() {
   refrescarTabla("");
}

const buscar = document.querySelector('#txtBusquedaVenta');

buscar.addEventListener('input', function() {
    refrescarTabla(buscar.value);
});

export function refrescarTabla(filtro) {
    let params = new URLSearchParams({filtro: filtro});
    fetch("api/venta/getAll",
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
                    Swal.fire('',
                            'Error interno del servidor. Intente nuevamente más tarde',
                            'error'
                            );
                    return;
                }
                if (data.error != null) {
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if (data.errorsec != null) {
                    Swal.fire('', data.errorsec, 'error');
                    window.location.replace('index.html');
                    return;
                } else {
                    cargarTabla(data);
                }
            });
}

export function cargarTabla(data) {
    let cuerpo = "";
    ventas = data;
    ventas.forEach(function (producto) {
        let registro =
                '<tr>' +
                '<td>' + producto.codigoBarras + '</td>' +
                '<td>' + producto.nombre + '</td>' +
                '<td>$' + producto.precioVenta + '</td>' +
                '<td><button class="btnA">A</button></td></tr>';
        cuerpo += registro;
    });
    document.getElementById("tblVenta").innerHTML = cuerpo;
}
