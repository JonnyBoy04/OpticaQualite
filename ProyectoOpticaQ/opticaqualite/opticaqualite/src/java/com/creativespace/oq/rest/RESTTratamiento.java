package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerTratamiento;
import com.creativespace.oq.model.Tratamiento;
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
@Path("tratamiento")
public class RESTTratamiento {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getAll")
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerTratamiento ct = null;
        List<Tratamiento> tratamientos = null;

        try {
            ct = new ControllerTratamiento();
            tratamientos = ct.getAll(filtro);
            out = new Gson().toJson(tratamientos);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exeption\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
