package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMYSQL;
import com.creativespace.oq.model.Material;
import java.sql.PreparedStatement;
import java.sql.CallableStatement;
import java.sql.Statement;
import java.util.List;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;

/**
 *
 * @author jonnyboy
 */
public class ControllerMaterial {
    public void insertarMaterial(Material m) throws SQLException{
        String sql = "INSERT INTO material (nombre, precioCompra, precioVenta) VALUES(?,?,?);";
        ConexionMYSQL connMySQL = new ConexionMYSQL();
        Connection conn = connMySQL.open();
        CallableStatement ctm = conn.prepareCall(sql);
        ctm.setString(1, m.getNombre());
        ctm.setDouble(2, m.getPrecioCompra());
        ctm.setDouble(3, m.getPrecioVenta());
        
        ctm.executeUpdate();
        
        ctm.close();
        connMySQL.close();
    }
    
    public void actualizarMaterial(Material m) throws SQLException{
        String sql = "UPDATE material SET nombre = ?, precioCompra = ?, precioVenta = ?;";
        ConexionMYSQL connMySQL = new ConexionMYSQL();
        Connection conn = connMySQL.open();
        CallableStatement ctm = conn.prepareCall(sql);
        ctm.setString(1, m.getNombre());
        ctm.setDouble(2, m.getPrecioCompra());
        ctm.setDouble(3, m.getPrecioVenta());
        
        ctm.executeUpdate();
        
        ctm.close();
        connMySQL.close();
    }
    
    public void delete(int id) throws Exception {
        String sql = "UPDATE material SET estatus = 0 WHERE idMaterial = "+id;
        
        ConexionMYSQL connMySQL = new ConexionMYSQL();
        Connection conn = connMySQL.open();
        Statement stm = conn.createStatement();
        stm.executeUpdate(sql);
        stm.close();
        connMySQL.close();
    }
    
    public List<Material> getAll(String filtro) throws Exception {
        String sql = "SELECT * FROM material";

        ConexionMYSQL connMySQL = new ConexionMYSQL();
        Connection conn = connMySQL.open();
        PreparedStatement ptm = conn.prepareStatement(sql);
        ResultSet rs = ptm.executeQuery();
        List<Material> materiales = new ArrayList<>();

        while (rs.next()) {
            materiales.add(fill(rs));
        }
        rs.close();
        ptm.close();
        connMySQL.close();
        return materiales;
    }
    
    private Material fill(ResultSet rs) throws Exception {
        Material m = new Material();
        
        m.setIdMaterial(rs.getInt("idMaterial"));
        m.setNombre(rs.getString("nombre"));
        m.setPrecioCompra(rs.getDouble("precioCompra"));
        m.setPrecioVenta(rs.getDouble("precioVenta"));
        m.setEstatus(rs.getInt("estatus"));
        
        return m;
    }
}
