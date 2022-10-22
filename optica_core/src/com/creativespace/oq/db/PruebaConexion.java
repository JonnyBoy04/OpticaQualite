package com.creativespace.oq.db;

public class PruebaConexion {

    public static void main(String[] args) {

        ConexionMYSQL connMySQL = new ConexionMYSQL();
        
        try{
            connMySQL.open();
            System.out.println("Conexion establecida con MySQL");
            
            connMySQL.close();
            System.out.println("Se ha cerrado la conexion con MySQL");
        }catch(Exception e){
            e.printStackTrace();
        }   
    }
}
