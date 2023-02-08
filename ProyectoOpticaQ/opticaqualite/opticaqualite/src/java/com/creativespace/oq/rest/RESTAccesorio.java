package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerAccesorio;
import com.creativespace.oq.controller.ControllerLogin;
import com.creativespace.oq.model.Accesorio;
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

/**
 *
 * @author jonnyboy
 */
@Path("accesorio")
public class RESTAccesorio {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getAll")
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerAccesorio ca = null;
        List<Accesorio> accesorios = null;

        try {
            ca = new ControllerAccesorio();
            accesorios = ca.getAll(filtro);
            out = new Gson().toJson(accesorios);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exeption\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("save")
    public Response save(@FormParam("datosAccesorio") @DefaultValue("") String datosAccesorio,
            @FormParam("token") @DefaultValue("") String token) {
        String out = null;
        Gson gson = new Gson();
        Accesorio acc = null;
        ControllerAccesorio ca = new ControllerAccesorio();
        ControllerLogin cl = new ControllerLogin();

        try {
            if (cl.validarToken(token)) {
                acc = gson.fromJson(datosAccesorio, Accesorio.class);
                if (acc.getIdAccesorio() == 0) {
                    ca.insert(acc);
                } else {
                    ca.update(acc);
                }
                out = gson.toJson(acc);
            } else {
                out = """
                      {"error":"No tiene permisos para realizar esta operación."}
                      """;
            }
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
    @Produces(MediaType.APPLICATION_JSON)
    @Path("delete")
    public Response delete(@FormParam("datosAccesorio") @DefaultValue("") String datosAccesorio,
            @FormParam("token") @DefaultValue("") String token) {
        String out = null;
        Gson gson = new Gson();
        Accesorio acc = null;
        ControllerAccesorio ca = new ControllerAccesorio();
        ControllerLogin cl = new ControllerLogin();

        try {
            if (cl.validarToken(token)) {
                acc = gson.fromJson(datosAccesorio, Accesorio.class);
                ca.delete(acc.getProducto().getIdProducto());
                out = gson.toJson(acc);
            } else {
                out = """
                      {"error":"No tiene permisos para realizar esta operación."}
                      """;
            }
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
