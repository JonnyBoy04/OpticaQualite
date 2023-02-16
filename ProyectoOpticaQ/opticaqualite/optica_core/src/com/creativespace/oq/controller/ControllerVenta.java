package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMYSQL;
import com.creativespace.oq.model.Producto;
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
/**
 *
 * @author Jonathan
 */
public class ControllerVenta {
    public List<Producto> getAll(String filtro) throws Exception {
        String sql = "SELECT * FROM optiqalumnos.producto WHERE nombre LIKE '%"+filtro+"%' OR codigoBarras = '"+filtro+"'";

        ConexionMYSQL connMySQL = new ConexionMYSQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();

        List<Producto> productos = new ArrayList<>();

        while (rs.next()) {
            productos.add(fill(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return productos;
    }
    
    private Producto fill(ResultSet rs) throws Exception {
        Producto p = new Producto();

        p.setCodigoBarras(rs.getString("codigoBarras"));
        p.setIdProducto(rs.getInt("idProducto"));
        p.setNombre(rs.getString("nombre"));
        p.setMarca(rs.getString("marca"));
        p.setPrecioCompra(rs.getDouble("precioCompra"));
        p.setPrecioVenta(rs.getDouble("precioVenta"));
        p.setExistencias(rs.getInt("existencias"));
        p.setEstatus(rs.getInt("estatus"));

        return p;
    }
}
