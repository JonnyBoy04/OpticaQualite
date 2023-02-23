package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerVenta;
import com.creativespace.oq.model.DetalleVP;
import com.creativespace.oq.model.Producto;
import com.google.gson.Gson;
import com.google.gson.JsonParseException;
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

    @Path("obtener")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response obtener(@FormParam("filtro") @DefaultValue("") String filtro) {
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

    @Path("guardar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response guardar(@FormParam("datosVP") @DefaultValue("") String datosVP) {
        String out = null;
        ControllerVenta cv = null;
        DetalleVP dvp = null;
        Gson gson = new Gson();

        try {
            dvp = gson.fromJson(datosVP, DetalleVP.class);
            cv = new ControllerVenta();
            if (cv.generarVenta(dvp)) {
                out = """
                      {"respuesta":"Venta guardarda correctamente."}
                      """;
            } else {
                out = """
                      {"Error":"Error al guardar la venta"}
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
