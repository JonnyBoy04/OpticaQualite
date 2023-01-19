package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerLogin;
import com.creativespace.oq.model.Empleado;
import com.creativespace.oq.model.Usuario;
import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("log")
public class RESTLogin extends Application{
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("in")
    public Response login(@FormParam("datos") @DefaultValue("") String datos){
        Gson gson = new Gson();
        Usuario usuario = gson.fromJson(datos, Usuario.class);
        String out = null;
        ControllerLogin cl = new ControllerLogin();
        Empleado emp = null;
        RESTEmpleado re = new RESTEmpleado();
        
        try{
            emp = cl.login(usuario.getNombre(), usuario.getContrasenia());
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
