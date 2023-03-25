package com.creativespace.oq.model;

import java.util.List;

/**
 *
 * @author 14sim
 */
public class DetalleVentaPreLen {

    private Venta venta;
    private List<VentaPresupuestoLentes> ventaPresupuestoLentes;

    public DetalleVentaPreLen() {
    }

    public DetalleVentaPreLen(Venta venta, List<VentaPresupuestoLentes> ventaPresupuestoLentes) {
        this.venta = venta;
        this.ventaPresupuestoLentes = ventaPresupuestoLentes;
    }

    public List<VentaPresupuestoLentes> getVentaPresupuestoLentes() {
        return ventaPresupuestoLentes;
    }

    public void setVentaPresupuestoLentes(List<VentaPresupuestoLentes> ventaPresupuestoLentes) {
        this.ventaPresupuestoLentes = ventaPresupuestoLentes;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

}
