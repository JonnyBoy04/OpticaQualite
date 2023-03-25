package com.creativespace.oq.model;

/**
 *
 * @author Jonathan
 */
public class VentaPresupuesto {

    PresupuestoLentesContacto presupuestoLentesContacto;
    int cantidad;
    double precioUnitario;
    double descuento;

    public VentaPresupuesto() {
    }

    public VentaPresupuesto(PresupuestoLentesContacto presupuestoLentesContacto, int cantidad, double precioUnitario, double descuento) {
        this.presupuestoLentesContacto = presupuestoLentesContacto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.descuento = descuento;
    }

    public PresupuestoLentesContacto getPresupuestoLentesContacto() {
        return presupuestoLentesContacto;
    }

    public void setPresupuestoLentesContacto(PresupuestoLentesContacto presupuestoLentesContacto) {
        this.presupuestoLentesContacto = presupuestoLentesContacto;
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

    public double getDescuento() {
        return descuento;
    }

    public void setDescuento(double descuento) {
        this.descuento = descuento;
    }

}
