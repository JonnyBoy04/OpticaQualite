package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMySQL;
import com.creativespace.oq.model.TipoMica;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author 14sim
 */
public class ControllerTipoMica {

    public List<TipoMica> obtenerTM() throws Exception {
        String sql = "SELECT * FROM tipo_mica";

        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);

        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();

        List<TipoMica> tipoMicas = new ArrayList<>();

        while (rs.next()) {
            tipoMicas.add(llenar(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return tipoMicas;
    }

    private TipoMica llenar(ResultSet rs) throws Exception {
        TipoMica tm = new TipoMica();

        tm.setIdTipoMica(rs.getInt("idTipoMica"));
        tm.setNombre(rs.getString("nombre"));
        tm.setPrecioCompra(rs.getFloat("precioCompra"));
        tm.setPrecioVenta(rs.getFloat("precioVenta"));

        return tm;
    }
}
