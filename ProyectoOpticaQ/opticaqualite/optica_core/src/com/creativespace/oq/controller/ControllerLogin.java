/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMYSQL;
import com.creativespace.oq.model.Empleado;
import com.creativespace.oq.model.Persona;
import com.creativespace.oq.model.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author jonnyboy
 */
public class ControllerLogin {
    
    /**
     * Con este metodo se traen todos los datos del empleado donde coincida su usuario y contraseña
     * @param usuario
     * @param contrasenia
     * @return
     * @throws Exception 
     */
     public Empleado login(String usuario, String contrasenia) throws Exception {
        //La consulta SQL a ejecutar:
        String sql = "SELECT * FROM v_empleados VE WHERE VE.nombreUsuario = ? AND VE.contrasenia = ?";

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMYSQL connMySQL = new ConexionMYSQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);

        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = null; 
        
        pstmt.setString(1, usuario);
        pstmt.setString(2, contrasenia);
        
        rs = pstmt.executeQuery();
        
        Empleado emp = null;


         if (rs.next()) {
             emp = fill(rs);
         }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return emp;
    }
     
     /**
      * Con el metodo fill se llenan los atributos del empleado, persona y usuario
      * @param rs
      * @return
      * @throws Exception 
      */
     private Empleado fill(ResultSet rs) throws Exception {
        Empleado e = new Empleado();
        Persona p = new Persona();

        p.setApellidoMaterno(rs.getString("apellidoMaterno"));
        p.setApellidoPaterno(rs.getString("apellidoPaterno"));
        p.setCalle(rs.getString("calle"));
        p.setCiudad(rs.getString("ciudad"));
        p.setColonia(rs.getString("colonia"));
        p.setCp(rs.getString("cp"));
        p.setEmail(rs.getString("email"));
        p.setEstado(rs.getString("estado"));
        p.setFechaNacimiento(rs.getString("fechaNacimiento"));
        p.setGenero(rs.getString("genero"));
        p.setIdPersona(rs.getInt("idPersona"));
        p.setNombre(rs.getString("nombre"));
        p.setNumero(rs.getString("numero"));
        p.setTelCasa(rs.getString("telcasa"));
        p.setTelMovil(rs.getString("telmovil"));

        e.setIdEmpleado(rs.getInt("idEmpleado"));
        e.setNumeroUnico(rs.getString("numeroUnico"));
        e.setUsuario(new Usuario());
        e.getUsuario().setContrasenia(rs.getString("contrasenia"));
        e.getUsuario().setIdUsuario(rs.getInt("idUsuario"));
        e.getUsuario().setNombre(rs.getString("nombreUsuario"));
        e.getUsuario().setRol(rs.getString("rol"));
        e.getUsuario().setLastToken(rs.getString("lastToken"));
        e.getUsuario().setLastTokenDate(rs.getString("dateLastToken"));
        e.setNumeroUnico(rs.getString("numeroUnico"));

        e.setPersona(p);

        return e;
    }
}
