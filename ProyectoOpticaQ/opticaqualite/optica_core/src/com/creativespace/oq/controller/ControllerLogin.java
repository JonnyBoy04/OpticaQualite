package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMYSQL;
import com.creativespace.oq.model.Empleado;
import com.creativespace.oq.model.Persona;
import com.creativespace.oq.model.Usuario;
import java.sql.CallableStatement;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author jonnyboy
 */
public class ControllerLogin {

    /**
     * Con este metodo se traen todos los datos del empleado donde coincida su
     * usuario y contraseña
     *
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
     * Con el metodo fill se llenan los atributos del empleado, persona y
     * usuario
     *
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
        p.setRfc(rs.getString("rfc"));

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
        e.setEstatus(rs.getInt("estatus"));
        e.setPersona(p);

        return e;
    }

    public void generarToken(Empleado e) throws Exception {
        String sql = "CALL generarToken(?,?)";

        ConexionMYSQL connMySQL = new ConexionMYSQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto invocaremos al StoredProcedure:
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, e.getUsuario().getLastToken());
        cstmt.setInt(2, e.getUsuario().getIdUsuario());
        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();
    }

    public boolean eliminarToken(Empleado e) throws Exception {
        boolean r = false;

        String sql = "UPDATE usuario SET lastToken='' WHERE idUsuario = ?";

        ConexionMYSQL conexionMYSQL = new ConexionMYSQL();

        Connection connection = conexionMYSQL.open();

        PreparedStatement ptm = connection.prepareCall(sql);

        ptm.setInt(1, e.getUsuario().getIdUsuario());

        ptm.execute();

        r = true;

        ptm.close();
        connection.close();
        conexionMYSQL.close();
        return r;
    }
    
    public boolean validarToken (String t) throws SQLException{
        boolean r = false;
        String sql = "SELECT * FROM v_empleados WHERE lastToken = '"+t+"'";
        ConexionMYSQL conexionMYSQL = new ConexionMYSQL();
        Connection connection = conexionMYSQL.open();
        Statement stm = connection.createStatement();
        ResultSet rs = stm.executeQuery(sql);
        
        if(rs.next())
            r= true;
        
        stm.close();
        connection.close();
        conexionMYSQL.close();
        
        return r;
    }
}
