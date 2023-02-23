package com.creativespace.oq.model;

import java.util.List;

/**
 *
 * @author Jonathan
 */
public class DetalleVP {

    Venta venta;

    List<VentaProducto> listaVP;

    public DetalleVP() {
    }

    public DetalleVP(Venta venta, List<VentaProducto> listaVP) {
        this.venta = venta;
        this.listaVP = listaVP;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public List<VentaProducto> getListaVP() {
        return listaVP;
    }

    public void setListaVP(List<VentaProducto> listaVP) {
        this.listaVP = listaVP;
    }

}
