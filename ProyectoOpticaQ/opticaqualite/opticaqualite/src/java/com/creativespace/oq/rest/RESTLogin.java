package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerLogin;
import com.creativespace.oq.model.Empleado;
import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("login")
public class RESTLogin {
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("login")
    public Response login(@FormParam("usuario") @DefaultValue("") String nombreUsuario,
                          @FormParam("contrasenia") @DefaultValue("") String contrasenia){
        
        String out = null;
        ControllerLogin cl = new ControllerLogin();
        Empleado emp = null;
        
        try{
            emp = cl.login(nombreUsuario, contrasenia);
            if (emp != null) {
                out = new Gson().toJson(emp);
            }else{
                out = """
                      {"error":"Datos de Credencial Incorrectos"}
                      """;
            }
        }catch(Exception e){
            e.printStackTrace();
            out = """
                  {"excepcion":"%s"}
                  """;
            out = String.format(out, e.toString());
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    } 
    
}
