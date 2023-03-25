package com.creativespace.oq.model;

/**
 *
 * @author 14sim
 */
public class VentaPresupuestoLentes {

    private PresupuestoLentes presupuestoLentes;
    private int cantidad;
    private double precioUnitario;
    private double descuento;

    public VentaPresupuestoLentes() {
    }

    public VentaPresupuestoLentes(PresupuestoLentes presupuestoLentes, int cantidad, double precioUnitario, double descuento) {
        this.presupuestoLentes = presupuestoLentes;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.descuento = descuento;
    }

    public double getDescuento() {
        return descuento;
    }

    public void setDescuento(double descuento) {
        this.descuento = descuento;
    }

    public PresupuestoLentes getPresupuestoLentes() {
        return presupuestoLentes;
    }

    public void setPresupuestoLentes(PresupuestoLentes presupuestoLentes) {
        this.presupuestoLentes = presupuestoLentes;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

}
