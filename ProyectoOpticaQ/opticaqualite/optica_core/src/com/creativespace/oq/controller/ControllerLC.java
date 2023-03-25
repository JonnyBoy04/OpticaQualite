package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMySQL;
import com.creativespace.oq.model.LenteContacto;
import com.creativespace.oq.model.Producto;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author 14sim
 */
public class ControllerLC {

    public List<LenteContacto> obtenerLC() throws SQLException {
        String sql = "SELECT * FROM v_lentes_contacto";

        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);

        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();

        List<LenteContacto> lenteContactos = new ArrayList<>();

        while (rs.next()) {
            lenteContactos.add(llenar(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return lenteContactos;
    }

    public LenteContacto llenar(ResultSet rs) throws SQLException {
        Producto p = new Producto();
        LenteContacto lc = new LenteContacto();

        p.setIdProducto(rs.getInt("idProducto"));
        p.setCodigoBarras(rs.getString("codigoBarras"));
        p.setNombre(rs.getString("nombre"));
        p.setMarca(rs.getString("marca"));
        p.setPrecioCompra(rs.getDouble("precioCompra"));
        p.setPrecioVenta(rs.getDouble("precioVenta"));
        p.setExistencias(rs.getInt("existencias"));
        p.setEstatus(rs.getInt("estatus"));
        lc.setIdLenteContacto(rs.getInt("idLenteContacto"));
        lc.setKeratometria(rs.getInt("keratometria"));
        lc.setFotografia(rs.getString("fotografia"));
        lc.setProducto(p);

        return lc;
    }

}
