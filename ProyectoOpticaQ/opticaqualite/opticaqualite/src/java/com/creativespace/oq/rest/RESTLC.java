package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerLC;
import com.creativespace.oq.model.LenteContacto;
import com.google.gson.Gson;
import jakarta.ws.rs.POST;
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
@Path("lc")
public class RESTLC extends Application{
    @Path("buscarlc")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarEV() {
        String out = null;
        ControllerLC clc = null;
        List<LenteContacto> lenteContactos = null;

        try {
            clc = new ControllerLC();
            lenteContactos = clc.obtenerLC();
            out = new Gson().toJson(lenteContactos);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exeption\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
