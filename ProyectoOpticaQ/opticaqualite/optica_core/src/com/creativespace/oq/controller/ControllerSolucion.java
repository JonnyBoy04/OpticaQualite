package com.creativespace.oq.controller;

import com.creativespace.oq.model.Usuario;
import com.creativespace.oq.db.ConexionMYSQL;
import com.creativespace.oq.model.Producto;
import com.creativespace.oq.model.Solucion;
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Types;

public class ControllerSolucion {

    public int insert(Solucion s) throws Exception {
        String sql = "{call insertarSolucion(?, ?, ?, ?, ?, ?, ?, ?, ?)}";

        int idProducto = -1;
        int idSolucion = -1;
        String condigoBarras = "";

        ConexionMYSQL connMySQL = new ConexionMYSQL();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, "");
        cstmt.setString(2, s.getProducto().getNombre());
        cstmt.setString(3, s.getProducto().getMarca());
        cstmt.setDouble(4, s.getProducto().getPrecioCompra());
        cstmt.setDouble(5, s.getProducto().getPrecioVenta());
        cstmt.setInt(6, s.getProducto().getExistencias());

        cstmt.registerOutParameter(7, Types.INTEGER);
        cstmt.registerOutParameter(8, Types.INTEGER);
        cstmt.registerOutParameter(9, Types.VARCHAR);

        cstmt.executeUpdate();

        idProducto = cstmt.getInt(7);
        idSolucion = cstmt.getInt(8);

        s.getProducto().setIdProducto(idProducto);
        s.setIdSolucion(idSolucion);

        cstmt.close();
        connMySQL.close();

        return idSolucion;
    }

    public void update(Solucion s) throws Exception {
        String sql = "{call actualizarSolucion(?, ?, ?, ?, ?, ?, ?)}";

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMYSQL connMySQL = new ConexionMYSQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto invocaremos al StoredProcedure:
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, "");
        cstmt.setString(2, s.getProducto().getNombre());
        cstmt.setString(3, s.getProducto().getMarca());
        cstmt.setDouble(4, s.getProducto().getPrecioCompra());
        cstmt.setDouble(5, s.getProducto().getPrecioVenta());
        cstmt.setInt(6, s.getProducto().getExistencias());
        cstmt.setInt(7, s.getProducto().getIdProducto());

        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();
    }

    public void delete(int id) throws Exception {
        String sql = "UPDATE producto SET estatus = 0 WHERE idProducto = " + id;

        ConexionMYSQL connMySQL = new ConexionMYSQL();
        Connection conn = connMySQL.open();
        Statement stm = conn.createStatement();
        stm.executeUpdate(sql);
        stm.close();
        connMySQL.close();
    }

    public List<Solucion> getAll(String filtro) throws Exception {
        String sql = "SELECT * FROM v_soluciones";

        ConexionMYSQL connMySQL = new ConexionMYSQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();

        List<Solucion> solucion = new ArrayList<>();

        while (rs.next()) {
            solucion.add(fill(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return solucion;
    }

    private Solucion fill(ResultSet rs) throws Exception {
        Solucion s = new Solucion();
        Producto p = new Producto();

        p.setIdProducto(rs.getInt("idProducto"));
        p.setNombre(rs.getString("nombre"));
        p.setMarca(rs.getString("marca"));
        p.setPrecioCompra(rs.getDouble("precioCompra"));
        p.setPrecioVenta(rs.getDouble("precioVenta"));
        p.setExistencias(rs.getInt("existencias"));
        p.setEstatus(rs.getInt("estatus"));

        s.setIdSolucion(rs.getInt("idSolucion"));
        s.setProducto(p);

        return s;
    }
}
