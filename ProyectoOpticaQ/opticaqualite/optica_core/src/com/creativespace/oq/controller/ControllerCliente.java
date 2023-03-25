package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMySQL;
import com.creativespace.oq.model.Cliente;
import com.creativespace.oq.model.Persona;
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.CallableStatement;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.Types;

public class ControllerCliente {

    public int insert(Cliente c) throws Exception {
        //Definimos la consulta SQL que invoca al Stored Procedure:
        String sql = "{call insertarCliente(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//datos seleccionados de la persona
        //se ponen los id que se generaran 
        int idPersonaGenerado = -1;
        int idClienteGenerado = -1;
        String numeroUnicoGenerado = "";
        //crear una objeto de conexion a mysql
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto invocaremos al StoredProcedure:
        CallableStatement cstmt = conn.prepareCall(sql);

        //Establecemos los valores de los datos personales en el orden
        //en que los pide el procedimiento almacenado, comenzando en 1:
        cstmt.setString(1, c.getPersona().getNombre());
        cstmt.setString(2, c.getPersona().getApellidoPaterno());
        cstmt.setString(3, c.getPersona().getApellidoMaterno());
        cstmt.setString(4, c.getPersona().getGenero());
        cstmt.setString(5, c.getPersona().getFechaNacimiento());
        cstmt.setString(6, c.getPersona().getCalle());
        cstmt.setString(7, c.getPersona().getNumero());
        cstmt.setString(8, c.getPersona().getColonia());
        cstmt.setString(9, c.getPersona().getCp());
        cstmt.setString(10, c.getPersona().getCiudad());
        cstmt.setString(11, c.getPersona().getEstado());
        cstmt.setString(12, c.getPersona().getTelCasa());
        cstmt.setString(13, c.getPersona().getTelMovil());
        cstmt.setString(14, c.getPersona().getEmail());
        cstmt.setString(15, c.getPersona().getRfc());
        //parametros de salida
        cstmt.registerOutParameter(16, Types.INTEGER);
        cstmt.registerOutParameter(17, Types.INTEGER);
        cstmt.registerOutParameter(18, Types.VARCHAR);

        //Ejecutamos el Stored Procedure:
        cstmt.executeUpdate();

        //Recuperamos los ID's generados:
        idPersonaGenerado = cstmt.getInt(16);
        idClienteGenerado = cstmt.getInt(17);
        numeroUnicoGenerado = cstmt.getString(18);

        c.getPersona().setIdPersona(idPersonaGenerado);
        c.setIdCliente(idClienteGenerado);
        c.setNumeroUnico(numeroUnicoGenerado);

        cstmt.close();
        connMySQL.close();

        //Devolvemos el ID de Cliente generado:
        return idClienteGenerado;
    }

    public void update(Cliente e) throws Exception {
        //Definimos la consulta SQL que invoca al Stored Procedure:
        String sql = "{call actualizarCliente(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; // IDs

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

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
        cstmt.setInt(16, e.getPersona().getIdPersona());
        //Ejecutamos el Stored Procedure
        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();
    }

    public void delete(int id) throws Exception {
        String sql = "UPDATE cliente SET estatus = 0 WHERE idCliente = " + id;

        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto invocaremos al StoredProcedure:
        Statement cstmt = conn.createStatement();
        cstmt.executeUpdate(sql);
        cstmt.close();
        connMySQL.close();
    }

    public List<Cliente> getAll(String filtro) throws Exception {
        //La consulta SQL a ejecutar:
        String sql = "SELECT * FROM v_clientes";

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);

        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();

        List<Cliente> clientes = new ArrayList<>();

        while (rs.next()) {
            clientes.add(fill(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return clientes;
    }

    public List<Cliente> buscarCliente(String filtro) throws Exception {
        //La consulta SQL a ejecutar:
        String sql = "SELECT * FROM v_clientes WHERE nombre LIKE '%" + filtro + "%'";

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);

        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();

        List<Cliente> clientes = new ArrayList<>();

        while (rs.next()) {
            clientes.add(fill(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return clientes;
    }
    
    private Cliente fill(ResultSet rs) throws Exception {
        Cliente c = new Cliente();
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
        p.setRfc(rs.getString("rfc"));
        p.setTelMovil(rs.getString("telmovil"));
        c.setIdCliente(rs.getInt("idCliente"));
        c.setNumeroUnico(rs.getString("numeroUnico"));
        c.setEstatus(rs.getInt("estatus"));
        c.setPersona(p);

        return c;
    }
}
