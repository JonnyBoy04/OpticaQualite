package com.creativespace.oq.rest;

import com.creativespace.oq.controller.ControllerArmazon;
import com.creativespace.oq.model.Armazon;
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

@Path("armazon")
public class RESTArmazon {

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerArmazon ca = null;
        List<Armazon> armazones = null;

        try {
            ca = new ControllerArmazon();
            armazones = ca.getAll(filtro);
            out = new Gson().toJson(armazones);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exeption\":\"Error interno del servidor.\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosArmazon") @DefaultValue("") String datosArmazon) {
        String out = null;
        Gson gson = new Gson();
        Armazon arm = null;
        ControllerArmazon ca = new ControllerArmazon();
        
        try{
            arm = gson.fromJson(datosArmazon, Armazon.class);
            if (arm.getIdArmazon()== 0) {
                ca.insert(arm);
            }else{
                ca.update(arm);
            }
            out = gson.toJson(arm);
        }catch(JsonParseException jpe){
            jpe.printStackTrace();
            out="""
                {"exception":"Formato JSON de datos incorrectos."}
                """;
        }catch (Exception e){
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
    public Response delete(@FormParam("datosArmazon") @DefaultValue("") String datosArmazon) {
        String out = null;
        Gson gson = new Gson();
        Armazon arm = null;
        ControllerArmazon ca = new ControllerArmazon();
        
            try{
             arm = gson.fromJson(datosArmazon, Armazon.class);
             ca.delete(arm.getProducto().getIdProducto());
           
            out = gson.toJson(arm);
        
        }catch(JsonParseException jpe ){
        jpe.printStackTrace();
        out="""
                {"exception":"Formato JSON de datos incorrectos."}
                """;
        }catch(Exception e){
         e.printStackTrace();
            out = """
                  {"exception":"%s"}
                  """;
            out = String.format(out, e.toString());
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
}
