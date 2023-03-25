package com.creativespace.oq.model;

/**
 *
 * @author 14sim
 */
public class PresupuestoLentesContacto {

    private int idPresupuestoLentesContacto;
    private LenteContacto lenteContacto;
    private String clave;
    private Presupuesto presupuesto;
    private ExamenDeVista examenDeVista;

    public PresupuestoLentesContacto() {
    }

    public PresupuestoLentesContacto(int idPresupuestoLentesContacto, LenteContacto lenteContacto, String clave, Presupuesto presupuesto, ExamenDeVista examenDeVista) {
        this.idPresupuestoLentesContacto = idPresupuestoLentesContacto;
        this.lenteContacto = lenteContacto;
        this.clave = clave;
        this.presupuesto = presupuesto;
        this.examenDeVista = examenDeVista;
    }

    public LenteContacto getLenteContacto() {
        return lenteContacto;
    }

    public void setLenteContacto(LenteContacto LenteContacto) {
        this.lenteContacto = LenteContacto;
    }

    public int getIdPresupuestoLentesContacto() {
        return idPresupuestoLentesContacto;
    }

    public void setIdPresupuestoLentesContacto(int idPresupuestoLentesContacto) {
        this.idPresupuestoLentesContacto = idPresupuestoLentesContacto;
    }
    
    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public Presupuesto getPresupuesto() {
        return presupuesto;
    }

    public void setPresupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
    }

    public ExamenDeVista getExamenDeVista() {
        return examenDeVista;
    }

    public void setExamenDeVista(ExamenDeVista examenDeVista) {
        this.examenDeVista = examenDeVista;
    }

}
