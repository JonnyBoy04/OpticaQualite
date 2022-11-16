package com.creativespace.oq.db;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 * Clase de conexion a base de datos se inicializa la variable conn de tipo Connection
 * @author jonnyboy
 */
public class ConexionMYSQL {

    Connection conn;

    /**
     * El metodo open sirve para conectar con la base de datos a usar, se crea la variable user con nuestro usuario en MySQL
     * y otra con nuestra contraseña, también la url para conectarnos a la base de datos
     * @return 
     */
    public Connection open() {
        String user = "root";
        String password = "monjiro19";
        String url = "jdbc:mysql://127.0.0.1:3306/optiqalumnos?useSSL=false&allowPublicKeyRetrieval=true&useUnicode=true&characterEncoding=utf-8";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, password);
            return conn;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * El metodo close cierra la conexion con nuetra base de datos
     */
    public void close() {
        if (conn != null) {
            try{
                conn.close();
            }catch(Exception e){
                e.printStackTrace();
                System.out.println("Exception controlada");
            }
        }
    }
}
