package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMYSQL;
import com.creativespace.oq.model.Tratamiento;
import java.sql.PreparedStatement;
import java.sql.CallableStatement;
import java.sql.Statement;
import java.util.List;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.Types;
import java.util.ArrayList;

/**
 *
 * @author jonnyboy
 */
public class ControllerTratamiento {
    public List<Tratamiento> getAll(String filtro) throws Exception {
        String sql = "SELECT * FROM tratamiento";

        ConexionMYSQL connMySQL = new ConexionMYSQL();
        Connection conn = connMySQL.open();
        PreparedStatement ptm = conn.prepareStatement(sql);
        ResultSet rs = ptm.executeQuery();
        List<Tratamiento> tratamientos = new ArrayList<>();

        while (rs.next()) {
            tratamientos.add(fill(rs));
        }
        rs.close();
        ptm.close();
        connMySQL.close();
        return tratamientos;
    }
    
    private Tratamiento fill(ResultSet rs) throws Exception {
        Tratamiento t = new Tratamiento();
        
        t.setIdTratamiento(rs.getInt("idTratamiento"));
        t.setNombre(rs.getString("nombre"));
        t.setPrecioCompra(rs.getDouble("precioCompra"));
        t.setPrecioVenta(rs.getDouble("precioVenta"));
        t.setEstatus(rs.getInt("estatus"));
        return t;
    }
}
