package com.creativespace.oq.controller;

import com.creativespace.oq.db.ConexionMySQL;
import com.creativespace.oq.model.Cliente;
import com.creativespace.oq.model.DetalleVentaPre;
import com.creativespace.oq.model.Empleado;
import com.creativespace.oq.model.ExamenDeVista;
import com.creativespace.oq.model.Graduacion;
import com.creativespace.oq.model.Persona;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Jonathan
 */
public class ControllerVentaLC {

    public List<ExamenDeVista> obtenerEV(int idCliente) throws SQLException {
        String sql = "SELECT * FROM v_examenvista_cliente WHERE idCliente = " + idCliente;

        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto ejecutaremos la consulta:
        PreparedStatement pstmt = conn.prepareStatement(sql);

        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();

        List<ExamenDeVista> examenDeVistas = new ArrayList<>();

        while (rs.next()) {
            examenDeVistas.add(llenar(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return examenDeVistas;
    }

    public ExamenDeVista llenar(ResultSet rs) throws SQLException {
        ExamenDeVista ev = new ExamenDeVista();
        Empleado e = new Empleado();
        Cliente c = new Cliente();
        Graduacion g = new Graduacion();
        Persona p = new Persona();

        p.setNombre(rs.getString("nombreEmpleado"));
        e.setIdEmpleado(rs.getInt("idEmpleado"));
        e.setPersona(p);
        c.setIdCliente(rs.getInt("idCliente"));
        g.setIdGraduacion(rs.getInt("idGraduacion"));
        ev.setIdExamenVista(rs.getInt("idExamenVista"));
        ev.setClave(rs.getString("clave"));
        ev.setFecha(rs.getString("fecha"));
        ev.setCliente(c);
        ev.setEmpleado(e);
        ev.setGraduacion(g);
        return ev;
    }

    public boolean generarVentaLC(DetalleVentaPre dvp) {
        boolean r = false;
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        Statement stmnt = null;
        ResultSet rs = null;
        try {
            conn.setAutoCommit(false);
            stmnt = conn.createStatement();
            // Se inserta la venta
            String query1 = "INSERT INTO venta (idEmpleado, clave) "
                    + "VALUES (" + dvp.getVenta().getEmpleado().getIdEmpleado()
                    + ',' + dvp.getVenta().getClave() + ");";
            stmnt.execute(query1);
            // Se obtiene el id de la venta que se ha insertado
            String query2 = "SELECT LAST_INSERT_ID()";
            rs = stmnt.executeQuery(query2);
            if (rs.next()) {
                dvp.getVenta().setIdVenta(rs.getInt(1));
            }
            for (int i = 0; i < dvp.getListaVentaPre().size(); i++) {
//Se inserta el presupuesto
                String query3 = "INSERT INTO presupuesto"
                        + "(idExamenVista, clave)"
                        + "VALUES (" + dvp.getListaVentaPre().get(i).getPresupuestoLentesContacto().getExamenDeVista().getIdExamenVista()
                        + "," + dvp.getListaVentaPre().get(i).getPresupuestoLentesContacto().getPresupuesto().getClave() + " );";
                stmnt.execute(query3);
//Se obtiene el id del presupuesto generado
                rs = stmnt.executeQuery(query2);
                if (rs.next()) {
                    dvp.getListaVentaPre().get(i).getPresupuestoLentesContacto().getPresupuesto().setIdPresupuesto(rs.getInt(1));
                }
//Se inserta en presupuesto_lentescontacto
                String query4 = "INSERT INTO presupuesto_lentescontacto"
                        + "(idExamenVista, idLenteContacto, clave)"
                        + "VALUES (" + dvp.getListaVentaPre().get(i).getPresupuestoLentesContacto().getExamenDeVista().getIdExamenVista() + ","
                        + dvp.getListaVentaPre().get(i).getPresupuestoLentesContacto().getLenteContacto().getIdLenteContacto() + ","
                        + dvp.getListaVentaPre().get(i).getPresupuestoLentesContacto().getClave() + ");";
                stmnt.execute(query4);
//Se obtiene el id del presupuesto_lentescontacto generado
                rs = stmnt.executeQuery(query2);
                if (rs.next()) {
                    dvp.getListaVentaPre().get(i).getPresupuestoLentesContacto().setIdPresupuestoLentesContacto(rs.getInt(1));
                }
//Se insera en venta_presupuesto la relación entre la venta y el presupuesto
                String query5 = "INSERT INTO venta_presupuesto "
                        + "(idVenta, idPresupuesto, cantidad, precioUnitario, descuento) "
                        + "VALUES ("
                        + dvp.getVenta().getIdVenta() + ","
                        + dvp.getListaVentaPre().get(i).getPresupuestoLentesContacto().getPresupuesto().getIdPresupuesto() + ","
                        + dvp.getListaVentaPre().get(i).getCantidad() + ","
                        + dvp.getListaVentaPre().get(i).getPrecioUnitario() + ","
                        + dvp.getListaVentaPre().get(i).getDescuento() + ");";
                stmnt.execute(query5);
            }
            conn.commit();
            conn.setAutoCommit(true);
            stmnt.close();
            conn.close();
            r = true;
        } catch (SQLException ex) {
            Logger.getLogger(ControllerVentaLC.class.getName()).log(Level.SEVERE, null, ex);
            try {
                conn.rollback();
                conn.setAutoCommit(true);
                r = false;
            } catch (SQLException ex1) {
                r = false;
            }
        }
        return r;
    }

}
