package com.creativespace.oq.model;

import java.util.List;

/**
 *
 * @author 14sim
 */
public class PresupuestoLentes {

    private int idPresupuestoLentes;
    private int alturaOblea;
    private Presupuesto presupuesto;
    private TipoMica tipoMica;
    private Material material;
    private Armazon armazon;
    private List<Tratamiento> tratamientos;

    public PresupuestoLentes() {
    }

    public PresupuestoLentes(int idPresupuestoLentes, int alturaOblea, Presupuesto presupuesto, TipoMica tipoMica, Material material, Armazon armazon, List<Tratamiento> tratamientos) {
        this.idPresupuestoLentes = idPresupuestoLentes;
        this.alturaOblea = alturaOblea;
        this.presupuesto = presupuesto;
        this.tipoMica = tipoMica;
        this.material = material;
        this.armazon = armazon;
        this.tratamientos = tratamientos;
    }

    public List<Tratamiento> getTratamientos() {
        return tratamientos;
    }

    public void setTratamientos(List<Tratamiento> tratamientos) {
        this.tratamientos = tratamientos;
    }

    public int getIdPresupuestoLentes() {
        return idPresupuestoLentes;
    }

    public void setIdPresupuestoLentes(int idPresupuestoLentes) {
        this.idPresupuestoLentes = idPresupuestoLentes;
    }

    public int getAlturaOblea() {
        return alturaOblea;
    }

    public void setAlturaOblea(int alturaOblea) {
        this.alturaOblea = alturaOblea;
    }

    public Presupuesto getPresupuesto() {
        return presupuesto;
    }

    public void setPresupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
    }

    public TipoMica getTipoMica() {
        return tipoMica;
    }

    public void setTipoMica(TipoMica tipoMica) {
        this.tipoMica = tipoMica;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public Armazon getArmazon() {
        return armazon;
    }

    public void setArmazon(Armazon armazon) {
        this.armazon = armazon;
    }

}
