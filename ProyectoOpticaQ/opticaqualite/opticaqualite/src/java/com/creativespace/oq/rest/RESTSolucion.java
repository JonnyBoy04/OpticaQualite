package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerSolucion;
import com.creativespace.oq.model.Solucion;
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

@Path("solucion")
public class RESTSolucion {

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerSolucion cs = null;
        List<Solucion> soluciones = null;

        try {
            cs = new ControllerSolucion();
            soluciones = cs.getAll(filtro);
            out = new Gson().toJson(soluciones);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exeption\":\"Error interno del servidor.\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosSolucion") @DefaultValue("") String datosSolucion) {
        String out = null;
        Gson gson = new Gson();
        Solucion sol = null;
        ControllerSolucion cs = new ControllerSolucion();

        try {
            sol = gson.fromJson(datosSolucion, Solucion.class);
            if (sol.getIdSolucion() == 0) {
                cs.insert(sol);
            } else {
                cs.update(sol);
            }
            out = gson.toJson(sol);

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

    @POST
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("datosSolucion") @DefaultValue("") String datosSolucion) {
        String out = null;
        Gson gson = new Gson();
        Solucion sol = null;
        ControllerSolucion cs = new ControllerSolucion();
        
        try {
         sol = gson.fromJson(datosSolucion, Solucion.class);
         cs.delete(sol.getIdSolucion());
         out = gson.toJson(sol);
                } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = """
                {"exception":"Formato JSON de datos incorrectos."}
                """;
        } catch (Exception e) {
            e.printStackTrace();
            out = """
                  {"exeption":"%s"}
                  """;
            out = String.format(out, e.toString());
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

}
