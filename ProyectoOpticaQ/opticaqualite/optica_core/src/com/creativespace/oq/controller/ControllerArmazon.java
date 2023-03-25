package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMySQL;
import com.creativespace.oq.model.Armazon;
import com.creativespace.oq.model.Producto;
import java.sql.CallableStatement;
import java.sql.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author inaliq
 */
public class ControllerArmazon {

    public int insert(Armazon a) throws Exception {

        String sql = "{call insertarArmazon(?,?,?,?,?," // Datos del producto
                + "?,?,?,?," // Datos Armazon
                + "?,?,?,?)}";// Datos de Retorno

        int idProductoGenerado = -1;
        int idArmazonGenerado = -1;
        String codigoBarrasGenerado = "";

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto invocaremos al StoredProcedure:
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, a.getProducto().getNombre());
        cstmt.setString(2, a.getProducto().getMarca());
        cstmt.setDouble(3, a.getProducto().getPrecioCompra());
        cstmt.setDouble(4, a.getProducto().getPrecioVenta());
        cstmt.setInt(5, a.getProducto().getExistencias());

        cstmt.setString(6, a.getModelo());
        cstmt.setString(7, a.getColor());
        cstmt.setString(8, a.getDimensiones());
        cstmt.setString(9, a.getDescripcion());
        cstmt.setString(10, a.getFotografia());

        cstmt.registerOutParameter(11, Types.INTEGER);
        cstmt.registerOutParameter(12, Types.INTEGER);
        cstmt.registerOutParameter(13, Types.VARCHAR);

        cstmt.executeUpdate();

        idProductoGenerado = cstmt.getInt(11);
        idArmazonGenerado = cstmt.getInt(12);
        codigoBarrasGenerado = cstmt.getString(13);

        System.out.println(idProductoGenerado);
        System.out.println(idArmazonGenerado);
        a.getProducto().setIdProducto(idProductoGenerado);
        a.setIdArmazon(idArmazonGenerado);
        a.getProducto().setCodigoBarras(codigoBarrasGenerado);

        cstmt.close();
        connMySQL.close();

        return idArmazonGenerado;
    }

    public void update(Armazon a) throws Exception {
        String sql = "{call actualizarArmazon (?,?,?,?,?," //Datos del producto
                + "?,?,?,?," // Datos del armazon
                + "?,?,?) }"; // Datos de retorno 

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto invocaremos al StoredProcedure:
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, a.getProducto().getNombre());
        cstmt.setString(2, a.getProducto().getMarca());
        cstmt.setDouble(3, a.getProducto().getPrecioCompra());
        cstmt.setDouble(4, a.getProducto().getPrecioVenta());
        cstmt.setInt(5, a.getProducto().getExistencias());

        cstmt.setString(6, a.getModelo());
        cstmt.setString(7, a.getColor());
        cstmt.setString(8, a.getDimensiones());
        cstmt.setString(9, a.getDescripcion());
        cstmt.setString(10, a.getFotografia());

        cstmt.setInt(11, a.getProducto().getIdProducto());
        cstmt.setInt(12, a.getIdArmazon());

        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();
    }

    public void delete(int id) throws Exception {
        String sql = "UPDATE producto SET estatus = 0 where idProducto = " + id;

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto invocaremos al StoredProcedure:
        Statement stmt = conn.createStatement();

        stmt.executeUpdate(sql);
        stmt.close();
        connMySQL.close();

    }

    public List<Armazon> getAll(String filtro) throws Exception {
        String sql = "SELECT * FROM v_armazones";

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);

        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();

        List<Armazon> armazones = new ArrayList<>();

        while (rs.next()) {
            armazones.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();

        return armazones;
    }

    private Armazon fill(ResultSet rs) throws Exception {
        Armazon a = new Armazon();
        Producto p = new Producto();

        a.setIdArmazon(rs.getInt("idArmazon"));
        a.setModelo(rs.getString("modelo"));
        a.setColor(rs.getString("color"));
        a.setDimensiones(rs.getString("dimensiones"));
        a.setDescripcion(rs.getString("descripcion"));
        a.setFotografia(rs.getString("fotografia"));

        p.setIdProducto(rs.getInt("idProducto"));
        p.setNombre(rs.getString("nombre"));
        p.setMarca(rs.getString("marca"));
        p.setCodigoBarras(rs.getString("codigoBarras"));
        p.setPrecioCompra(rs.getDouble("precioCompra"));
        p.setPrecioVenta(rs.getDouble("precioVenta"));
        p.setExistencias(rs.getInt("existencias"));
        p.setEstatus(rs.getInt("estatus"));

        a.setProducto(p);

        return a;

    }
}
