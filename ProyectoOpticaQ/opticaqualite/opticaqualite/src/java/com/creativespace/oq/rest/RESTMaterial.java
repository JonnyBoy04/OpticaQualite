package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerMaterial;
import com.creativespace.oq.model.Material;
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

@Path("material")
public class RESTMaterial {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getAll")
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerMaterial cm = null;
        List<Material> materiales = null;

        try {
            cm = new ControllerMaterial();
            materiales = cm.getAll(filtro);
            out = new Gson().toJson(materiales);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exeption\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("save")
    public Response save(@FormParam("datosAccesorio") @DefaultValue("") String datosAccesorio) {
        String out = null;
        Gson gson = new Gson();
        Material mat = null;
        ControllerMaterial cm = new ControllerMaterial();

        try {
            mat = gson.fromJson(datosAccesorio, Material.class);
            if (mat.getIdMaterial()== 0) {
                cm.insertarMaterial(mat);
            } else {
                cm.actualizarMaterial(mat);
            }
            out = gson.toJson(mat);
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
