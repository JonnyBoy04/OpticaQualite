package com.creativespace.oq.model;

public class Presupuesto {

    int idPresupuesto;
    String clave;
    ExamenDeVista examenDeVista;

    public int getIdPresupuesto() {
        return idPresupuesto;
    }

    public void setIdPresupuesto(int idPresupuesto) {
        this.idPresupuesto = idPresupuesto;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public ExamenDeVista getExamenDeVista() {
        return examenDeVista;
    }

    public void setExamenDeVista(ExamenDeVista examenDeVista) {
        this.examenDeVista = examenDeVista;
    }

}
