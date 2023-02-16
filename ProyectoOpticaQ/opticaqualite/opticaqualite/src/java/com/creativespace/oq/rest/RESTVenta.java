package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerVenta;
import com.creativespace.oq.model.Producto;
import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 *
 * @author Jonathan
 */
@Path("venta")
public class RESTVenta {
    @Path("getAll")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@FormParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerVenta cv = null;
        List<Producto> productos = null;

        try {
            cv = new ControllerVenta();
            productos = cv.getAll(filtro);
            out = new Gson().toJson(productos);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exeption\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
