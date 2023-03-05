package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMySQL;
import com.creativespace.oq.model.DetalleVP;
import com.creativespace.oq.model.Producto;
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Jonathan
 */
public class ControllerVenta {

    public List<Producto> getAll(String filtro) throws Exception {
        String sql = "SELECT * FROM optiqalumnos.producto WHERE nombre LIKE '%" + filtro + "%' OR codigoBarras = '" + filtro + "'";

        ConexionMySQL connMySQL = new ConexionMySQL();
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

    public boolean generarVenta(DetalleVP dvp) {
        ConexionMySQL connMYSQL = new ConexionMySQL();
        Connection conn = connMYSQL.open();
        Statement stm = null;
        ResultSet rs = null;
        boolean r = false;

        try {
            conn.setAutoCommit(false);
            String query1 = "INSERT INTO venta(clave, idEmpleado) VALUES (" + dvp.getVenta().getClave() + "," + dvp.getVenta().getEmpleado().getIdEmpleado() + ");";
            stm = conn.createStatement();
            stm.execute(query1);

            String query2 = "SELECT LAST_INSERT_ID()";
            rs = stm.executeQuery(query2);

            if (rs.next()) {
                dvp.getVenta().setIdVenta(rs.getInt(1));
            }

            for (int i = 0; i < dvp.getListaVP().size(); i++) {
                String query3 = "INSERT INTO venta_producto VALUES(" + dvp.getVenta().getIdVenta() + "," + dvp.getListaVP().get(i).getProducto().getIdProducto() + "," + dvp.getListaVP().get(i).getCantidad() + "," + dvp.getListaVP().get(i).getPrecioUnitario() + "," + dvp.getListaVP().get(i).getDescuento() + ");";
                stm.execute(query3);
            }
            conn.commit();
            conn.setAutoCommit(true);
            rs.close();
            stm.close();
            conn.close();
            r = true;
        } catch (SQLException ex) {
            Logger.getLogger(ControllerVenta.class.getName()).log(Level.SEVERE, null, ex);
            try {
                conn.rollback();
                conn.setAutoCommit(true);
                rs.close();
                stm.close();
                conn.close();
                r = false;
            } catch  (SQLException ex1){
                Logger.getLogger(ControllerVenta.class.getName()).log(Level.SEVERE, null, ex1);
                r = false;
            }
        }

        return r;
    }
}
