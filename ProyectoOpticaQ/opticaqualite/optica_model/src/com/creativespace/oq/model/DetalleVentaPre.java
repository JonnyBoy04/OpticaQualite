package com.creativespace.oq.model;

import java.util.List;

/**
 *
 * @author Jonathan
 */
public class DetalleVentaPre {

    Venta venta;
    List<VentaPresupuesto> listaVentaPre;

    public DetalleVentaPre() {
    }

    public DetalleVentaPre(Venta venta, List<VentaPresupuesto> listaVentaPre) {
        this.venta = venta;
        this.listaVentaPre = listaVentaPre;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public List<VentaPresupuesto> getListaVentaPre() {
        return listaVentaPre;
    }

    public void setListaVentaPre(List<VentaPresupuesto> listaVentaPre) {
        this.listaVentaPre = listaVentaPre;
    }

}
