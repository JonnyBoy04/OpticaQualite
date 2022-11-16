package com.creativespace.oq.controller;

import com.creativespace.oq.model.Usuario;
import com.creativespace.oq.db.ConexionMYSQL;
import com.creativespace.oq.model.Empleado;
import com.creativespace.oq.model.Persona;
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Types;

/**
 * Clase controlador para empleado
 * @author jonnyboy
 */
public class ControllerEmpleado {

    /**
     * IsAdmin nos permite comprobar si un empleado registrado es administrador o empleado ordinario
     * se recibe como parametro un empleado el cual se comprueba si es nulo o su usuario y su nombre
     * de usuario estan nulos no es Admin 
     * @param e
     * @return 
     */
    public static boolean isAdmin(Empleado e) {
        if (e == null || e.getUsuario() == null || e.getUsuario().getNombre() == null) {
            return false;
        } else {
            return e.getUsuario().getRol().trim().toLowerCase().equals("administrador");
        }
    }

    /**
     * Se crea la instruccion de MySQL para llamar el procedimiento almacenado para agregar un empleado
     * se asignan se llenan los 9 parametros, 18 de ellos son datos del armazon los otros 5 son los ID's y 
     * clave unica generados en la base de datos
     * @param e
     * @return
     * @throws Exception 
     */
    public int insert(Empleado e) throws Exception {
        //Definimos la consulta SQL que invoca al Stored Procedure:
        String sql = "{call insertarEmpleado(?, ?, ?, ?, ?, ?, ?, ?,"+ // Datos Personales
                "?, ?, ?, ?, ?, ?, ?, "+ 
                "?, ?, ?, "+ // Datos de Seguridad
                "?, ?, ?, ?, ?)}";  // Valores de Retorno

        //Aquí guardaremos los ID's que se generarán:
        int idPersonaGenerado = -1;
        int idEmpleadoGenerado = -1;
        int idUsuarioGenerado = -1;
        String numeroUnicoGenerado = "";

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMYSQL connMySQL = new ConexionMYSQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto invocaremos al StoredProcedure:
        CallableStatement cstmt = conn.prepareCall(sql);

        //Establecemos los valores de los datos personales en el orden
        //en que los pide el procedimiento almacenado, comenzando en 1:
        cstmt.setString(1, e.getPersona().getNombre());
        cstmt.setString(2, e.getPersona().getApellidoPaterno());
        cstmt.setString(3, e.getPersona().getApellidoMaterno());
        cstmt.setString(4, e.getPersona().getGenero());
        cstmt.setString(5, e.getPersona().getFechaNacimiento());
        cstmt.setString(6, e.getPersona().getCalle());
        cstmt.setString(7, e.getPersona().getNumero());
        cstmt.setString(8, e.getPersona().getColonia());
        cstmt.setString(9, e.getPersona().getCp());
        cstmt.setString(10, e.getPersona().getCiudad());
        cstmt.setString(11, e.getPersona().getEstado());
        cstmt.setString(12, e.getPersona().getTelCasa());
        cstmt.setString(13, e.getPersona().getTelMovil());
        cstmt.setString(14, e.getPersona().getEmail());
        cstmt.setString(15, e.getPersona().getRfc());

        // Registramos parámetros de datos de seguridad:
        cstmt.setString(16, e.getUsuario().getNombre());
        cstmt.setString(17, e.getUsuario().getContrasenia());
        cstmt.setString(18, e.getUsuario().getRol());

        //Registramos los parámetros de salida:
        cstmt.registerOutParameter(19, Types.INTEGER);
        cstmt.registerOutParameter(20, Types.INTEGER);
        cstmt.registerOutParameter(21, Types.INTEGER);
        cstmt.registerOutParameter(22, Types.VARCHAR);
        cstmt.registerOutParameter(23, Types.VARCHAR);

        //Ejecutamos el Stored Procedure:
        cstmt.executeUpdate();

        //Recuperamos los ID's generados:
        idPersonaGenerado = cstmt.getInt(19);
        idUsuarioGenerado = cstmt.getInt(20);
        idEmpleadoGenerado = cstmt.getInt(21);
        numeroUnicoGenerado = cstmt.getString(22);

        e.setIdEmpleado(idEmpleadoGenerado);
        e.getPersona().setIdPersona(idPersonaGenerado);
        e.getUsuario().setIdUsuario(idUsuarioGenerado);
        e.setNumeroUnico(numeroUnicoGenerado);

        cstmt.close();
        connMySQL.close();

        //Devolvemos el ID de Cliente generado:
        return idEmpleadoGenerado;
    }

    /**
     * Se ejecuta el procedimiento almacenado que actualiza el empleado seleccionado,
     * el procedimiento recibe 21 parametros los cuales son los datos del empleado a actualizar
     * @param e
     * @throws Exception 
     */
    public void update(Empleado e) throws Exception {
        //Definimos la consulta SQL que invoca al Stored Procedure:
        String sql = "{call actualizarEmpleado(  ?, ?, ?, ?, ?, ?, ?, "+ //Datos Personales
                "?, ?, ?, ?, ?, ?, ?, ?,"+ 
                "?, ?, ?, "+ // Datos de Seguridad
                "?, ?, ?)}"; // IDs

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMYSQL connMySQL = new ConexionMYSQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto invocaremos al StoredProcedure:
        CallableStatement cstmt = conn.prepareCall(sql);

        //Establecemos los parámetros de los datos personales en el orden
        //en que los pide el procedimiento almacenado, comenzando en 1:
        cstmt.setString(1, e.getPersona().getNombre());
        cstmt.setString(2, e.getPersona().getApellidoPaterno());
        cstmt.setString(3, e.getPersona().getApellidoMaterno());
        cstmt.setString(4, e.getPersona().getGenero());
        cstmt.setString(5, e.getPersona().getFechaNacimiento());
        cstmt.setString(6, e.getPersona().getCalle());
        cstmt.setString(7, e.getPersona().getNumero());
        cstmt.setString(8, e.getPersona().getColonia());
        cstmt.setString(9, e.getPersona().getCp());
        cstmt.setString(10, e.getPersona().getCiudad());
        cstmt.setString(11, e.getPersona().getEstado());
        cstmt.setString(12, e.getPersona().getTelCasa());
        cstmt.setString(13, e.getPersona().getTelMovil());
        cstmt.setString(14, e.getPersona().getEmail());
        cstmt.setString(15, e.getPersona().getRfc());
        cstmt.setString(16, e.getUsuario().getNombre());
        cstmt.setString(17, e.getUsuario().getContrasenia());
        cstmt.setString(18, e.getUsuario().getRol());

        cstmt.setInt(19, e.getPersona().getIdPersona());
        cstmt.setInt(20, e.getUsuario().getIdUsuario());
        cstmt.setInt(21, e.getIdEmpleado());        
        //Ejecutamos el Stored Procedure
        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();
    }

    /**
     * Se ejecuta una instrucción donde se elimina un empleado de manera logica (se cambia es estatus a 0)
     * en este metodo solo se recibe un parametro que es el id del empleado a eliminar
     * @param id
     * @throws Exception 
     */
    public void delete(int id) throws Exception {
        String sql = "UPDATE empleado SET estatus = 0 WHERE idEmpleado = "+id;
        
        ConexionMYSQL connMySQL = new ConexionMYSQL();
        Connection conn = connMySQL.open();
        Statement stm = conn.createStatement();
        stm.executeUpdate(sql);
        stm.close();
        connMySQL.close();
    }

    /**
     * Con este metodo se traen todos los datos de la vista v_empleados
     * @param filtro
     * @return
     * @throws Exception 
     */
    public List<Empleado> getAll(String filtro) throws Exception {
        //La consulta SQL a ejecutar:
        String sql = "SELECT * FROM v_empleados";

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMYSQL connMySQL = new ConexionMYSQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);

        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();

        List<Empleado> empleados = new ArrayList<>();

        while (rs.next()) {
            empleados.add(fill(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return empleados;
    }

    /**
     * Este metodo nos permite asignar los valores obtenidos de la vista de empleados en la base de datos y 
     * son asignados a los atributos de empleado, persona y usuario
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
}
