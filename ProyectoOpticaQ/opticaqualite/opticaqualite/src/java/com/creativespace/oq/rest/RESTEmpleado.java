package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerEmpleado;
import com.creativespace.oq.model.Empleado;
import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("empleado")
public class RESTEmpleado {

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerEmpleado ce = null;
        List<Empleado> empleados = null;

        try {
            ce = new ControllerEmpleado();
            empleados = ce.getAll(filtro);
            out = new Gson().toJson(empleados);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exeption\":\"Error interno del servidor.\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @GET
    @Path("buscar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscar(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerEmpleado ce = null;
        List<Empleado> empleados = null;

        try {
            ce = new ControllerEmpleado();
            empleados = ce.buscarEmpleado(filtro);
            out = new Gson().toJson(empleados);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exeption\":\"Error interno del servidor.\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosEmpleado") @DefaultValue("") String datosEmpleado) {
        String out = null;
        Gson gson = new Gson();
        Empleado emp = null;
        ControllerEmpleado ce = new ControllerEmpleado();
        
        try{
            emp = gson.fromJson(datosEmpleado, Empleado.class);
            if (emp.getIdEmpleado() == 0) {
                ce.insert(emp);
            }else{
                ce.update(emp);
            }
            out = gson.toJson(emp);
        }catch(JsonParseException jpe){
            jpe.printStackTrace();
            out="""
                {"exception":"Formato JSON de datos incorrectos."}
                """;
        }catch (Exception e){
            e.printStackTrace();
            out = """
                  {"exception":"%s"}
                  """;
            out = String.format(out, e.toString());
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }

    public Response delete() {

        return null;
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("delete")
    public Response delete(@FormParam("datosEmpleado") @DefaultValue("") String datosEmpleado) {
        String out = null;
        Gson gson = new Gson();
        Empleado emp = null;
        ControllerEmpleado ce = new ControllerEmpleado();

        try {
            emp = gson.fromJson(datosEmpleado, Empleado.class);
            ce.delete(emp.getPersona().getIdPersona());
            out = gson.toJson(emp);
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = """
                {"exception":"Formato JSON de datos incorrectos."}
                """;
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                  {"exception":"%s"}
                  """;
            out = String.format(out, e.toString());
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
}
