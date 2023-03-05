package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMySQL;
import com.creativespace.oq.model.Accesorio;
import com.creativespace.oq.model.Producto;
import java.sql.PreparedStatement;
import java.sql.CallableStatement;
import java.sql.Statement;
import java.util.List;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.Types;
import java.util.ArrayList;

/**
 * Clase controlador Accesorio
 *
 * @author jonnyboy
 */
public class ControllerAccesorio {

    /**
     * Se crea la instruccion de MySQL para llamar el procedimiento almacenado
     * para agregar un accesorio se asignan se llenan los 9 parametros, 6 de
     * ellos son datos del armazon los otros 3 son los IDS generados en la base
     * de datos
     *
     * @param a
     * @return
     * @throws Exception
     */
    public int insert(Accesorio a) throws Exception {
        String sql = """
                     {CALL insertarAccesorio(?, ?, ?, ?, ?, ?, ?, ?, ?)}
                     """;

        int idAccesorioGenerado = -1;
        int idProductoGenerado = -1;
        String codigoBarrasGenerado = "";

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        CallableStatement ctm = conn.prepareCall(sql);

        ctm.setString(1, a.getProducto().getCodigoBarras());
        ctm.setString(2, a.getProducto().getNombre());
        ctm.setString(3, a.getProducto().getMarca());
        ctm.setDouble(4, a.getProducto().getPrecioCompra());
        ctm.setDouble(5, a.getProducto().getPrecioVenta());
        ctm.setInt(6, a.getProducto().getExistencias());

        ctm.registerOutParameter(7, Types.INTEGER);
        ctm.registerOutParameter(8, Types.INTEGER);
        ctm.registerOutParameter(9, Types.VARCHAR);

        ctm.executeUpdate();

        idProductoGenerado = ctm.getInt(7);
        idAccesorioGenerado = ctm.getInt(8);
        codigoBarrasGenerado = ctm.getString(9);

        a.getProducto().setIdProducto(idProductoGenerado);
        a.setIdAccesorio(idAccesorioGenerado);
        a.getProducto().setCodigoBarras(codigoBarrasGenerado);

        ctm.close();
        connMySQL.close();
        return idAccesorioGenerado;
    }

    /**
     * Se ejecuta el procedimiento almacenado que actualiza el accesorio
     * seleccionado, el procedimiento recibe 7 parametros los cuales son los
     * datos del armazon a actualizar
     *
     * @param a
     * @throws Exception
     */
    public void update(Accesorio a) throws Exception {
        String sql = """
                     {CALL actualizarAccesorio(?, ?, ?, ?, ?, ?, ?)}
                     """;

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        CallableStatement ctm = conn.prepareCall(sql);

        ctm.setString(1, a.getProducto().getCodigoBarras());
        ctm.setString(2, a.getProducto().getNombre());
        ctm.setString(3, a.getProducto().getMarca());
        ctm.setDouble(4, a.getProducto().getPrecioCompra());
        ctm.setDouble(5, a.getProducto().getPrecioVenta());
        ctm.setInt(6, a.getProducto().getExistencias());
        ctm.setInt(7, a.getProducto().getIdProducto());

        ctm.executeUpdate();

        ctm.close();
        connMySQL.close();
    }

    /**
     * Se ejecuta una instrucción donde se elimina un accesorio de manera logica
     * (se cambia es estatus a 0) en este metodo solo se recibe un parametro que
     * es el id del accesorio a eliminar
     *
     * @param id
     * @throws Exception
     */
    public void delete(int id) throws Exception {
        String sql = "UPDATE producto SET estatus = 0 WHERE idProducto = " + id;

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        Statement stm = conn.createStatement();
        stm.executeUpdate(sql);
        stm.close();
        connMySQL.close();
    }

    /**
     * Con este metodo se traen todos los datos de la vista v_accesrios
     *
     * @param filtro
     * @return
     * @throws Exception
     */
    public List<Accesorio> getAll(String filtro) throws Exception {
        String sql = "SELECT * FROM v_accesorios";

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement ptm = conn.prepareStatement(sql);
        ResultSet rs = ptm.executeQuery();
        List<Accesorio> accesorios = new ArrayList<>();

        while (rs.next()) {
            accesorios.add(fill(rs));
        }
        rs.close();
        ptm.close();
        connMySQL.close();
        return accesorios;
    }

    /**
     * Este metodo nos permite asignar los valores obtenidos de la vista de
     * accesorio en la base de datos y son asignados a los atributos de
     * accesorio y producto
     *
     * @param rs
     * @return
     * @throws Exception
     */
    private Accesorio fill(ResultSet rs) throws Exception {
        Accesorio a = new Accesorio();
        Producto p = new Producto();

        p.setCodigoBarras(rs.getString("codigoBarras"));
        p.setIdProducto(rs.getInt("idProducto"));
        p.setNombre(rs.getString("nombre"));
        p.setMarca(rs.getString("marca"));
        p.setPrecioCompra(rs.getDouble("precioCompra"));
        p.setPrecioVenta(rs.getDouble("precioVenta"));
        p.setExistencias(rs.getInt("existencias"));
        p.setEstatus(rs.getInt("estatus"));
        a.setIdAccesorio(rs.getInt("idAccesorio"));
        a.setProducto(p);
        return a;
    }
}
