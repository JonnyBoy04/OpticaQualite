
package com.creativespace.oq.model;

public class Cliente {
    
    int idCliente;
    String numeroUnico;
    int estatus;
    Persona persona;

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }
    

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public String getNumeroUnico() {
        return numeroUnico;
    }

    public void setNumeroUnico(String numeroUnico) {
        this.numeroUnico = numeroUnico;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int status) {
        this.estatus = status;
    }
    
    
}
