package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerLogin;
import com.creativespace.oq.model.Empleado;
import com.creativespace.oq.model.Usuario;
import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("log")
public class RESTLogin extends Application {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("in")
    public Response logIn(@FormParam("datos") @DefaultValue("") String datos) {
        Gson gson = new Gson();
        Usuario usuario = gson.fromJson(datos, Usuario.class);
        String out = null;
        ControllerLogin cl = new ControllerLogin();
        Empleado emp = null;
        RESTEmpleado re = new RESTEmpleado();

        try {
            emp = cl.login(usuario.getNombre(), usuario.getContrasenia());
            if (emp != null) {
                emp.getUsuario().setLastToken();
                out = new Gson().toJson(emp);
                cl.generarToken(emp);
            } else {
                out = """
                      {"error":"Datos de Credencial Incorrectos"}
                      """;
            }
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                  {"excepcion":"%s"}
                  """;
            out = String.format(out, e.toString());
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("out")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response logOut(@FormParam("empleado") @DefaultValue("") String e) throws Exception {
        String out = null;
        Empleado empleado = null;
        ControllerLogin cl = null;
        Gson gson = new Gson();

        try {
            empleado = gson.fromJson(e, Empleado.class);
            cl = new ControllerLogin();
            if (cl.eliminarToken(empleado)) {
                out = """
                      {"ok":"Eliminación de token correcta"}
                      """;
            } else {
                out = """
                      {"error":"Eliminación de token no realizada"}
                      """;
            }
        } catch (JsonParseException jpe) {
            out = """
                {"exception":"Formato JSON de datos incorrectos."}
                """;
        } catch (Exception ex) {
            ex.printStackTrace();
            out = """
                  {"exception":"%s"}
                  """;
            out = String.format(out, ex.toString());
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

}
