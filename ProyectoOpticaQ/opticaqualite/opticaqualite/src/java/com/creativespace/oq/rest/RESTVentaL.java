package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerVentaL;
import com.creativespace.oq.model.DetalleVentaPreLen;
import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 *
 * @author 14sim
 */
@Path("vental")
public class RESTVentaL extends Application{
    @Path("generarvl")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response generarVentaLC(@FormParam("datosVentaL") @DefaultValue("") String datosVentaL) {
        DetalleVentaPreLen dvprl = new DetalleVentaPreLen();
        Gson gson = new Gson();
        ControllerVentaL cvl = new ControllerVentaL();
        String out = null;
        dvprl = gson.fromJson(datosVentaL, DetalleVentaPreLen.class);
        if (cvl.generarVentaLentes(dvprl)) {
            out = """
                      {"response":"Venta Exitosa"}
                      """;
        } else {
            out = """
                      {"error":"Venta no generada"}
                      """;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
