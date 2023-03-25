package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerTipoMica;
import com.creativespace.oq.model.TipoMica;
import com.google.gson.Gson;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 *
 * @author 14sim
 */
@Path("tipomica")
public class RESTTipoMica extends Application{

    @GET
    @Path("obtenertp")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        String out = null;
        ControllerTipoMica cs = null;
        List<TipoMica> tipoMicas = null;
        try {
            cs = new ControllerTipoMica();
            tipoMicas = cs.obtenerTM();
            out = new Gson().toJson(tipoMicas);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
