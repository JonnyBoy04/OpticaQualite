package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMySQL;
import com.creativespace.oq.model.DetalleVentaPre;
import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;

/**
 *
 * @author Jonathan
 */
public class ControllerVentaLC {

    public boolean generarLC(DetalleVentaPre dvpr) {
        boolean r = false;
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        Statement stm = null;
        ResultSet re = null;
        
        return r;
    }
}
