package com.creativespace.oq.model;


public class Usuario {

    int idUsuario;
    String nombre;
    String contrasenia;
    String rol;
    String lastToken;
    String lastTokenDate;

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getLastToken() {
        return lastToken;
    }

    public void setLastToken(String lastToken) {
        this.lastToken = lastToken;
    }

    public String getLastTokenDate() {
        return lastTokenDate;
    }

    public void setLastTokenDate(String lastTokenDate) {
        this.lastTokenDate = lastTokenDate;
    }

}
