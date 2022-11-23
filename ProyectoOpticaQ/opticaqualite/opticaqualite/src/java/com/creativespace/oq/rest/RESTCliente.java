package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerCliente;
import com.creativespace.oq.model.Cliente;
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

@Path("cliente")
public class RESTCliente {

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerCliente ce = null;
        List<Cliente> clientes = null;

        try {
            ce = new ControllerCliente();
            clientes = ce.getAll(filtro);
            out = new Gson().toJson(clientes);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exeption\":\"Error interno del servidor.\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosCliente") @DefaultValue("") String datosCliente) {
        String out = null;
        Gson gson = new Gson();
        Cliente cli = null;
        ControllerCliente cc = new ControllerCliente();

        try {
            cli = gson.fromJson(datosCliente, Cliente.class);
            if (cli.getIdCliente() == 0) {
                cc.insert(cli);
            } else {
                cc.update(cli);
            }
            out = gson.toJson(cli);
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
    public Response delete(@FormParam("datosCliente") @DefaultValue("") String datosCliente) {
        String out = null;
        Gson gson = new Gson();
        Cliente cli = null;
        ControllerCliente cc = new ControllerCliente();
        try {
            cli = gson.fromJson(datosCliente, Cliente.class);
            cc.delete(cli.getPersona().getIdPersona());
            out = gson.toJson(cli);
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
