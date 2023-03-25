package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerVentaLC;
import com.creativespace.oq.model.DetalleVentaPre;
import com.creativespace.oq.model.ExamenDeVista;
import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
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
@Path("ventalc")
public class RESTVentaLC extends Application {

    @Path("generarv")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response generarVentaLC(@FormParam("datosVentaLC") @DefaultValue("") String datosVentaLC) {
        DetalleVentaPre dvpr = new DetalleVentaPre();
        Gson gson = new Gson();
        ControllerVentaLC cvl = new ControllerVentaLC();
        String out = null;
        dvpr = gson.fromJson(datosVentaLC, DetalleVentaPre.class);
        if (cvl.generarVentaLC(dvpr)) {
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

    @Path("buscarev")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarEV(@FormParam("idCliente") int idCliente) {
        String out = null;
        ControllerVentaLC cvl = null;
        List<ExamenDeVista> examenDeVista = null;

        try {
            cvl = new ControllerVentaLC();
            examenDeVista = cvl.obtenerEV(idCliente);
            out = new Gson().toJson(examenDeVista);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exeption\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
