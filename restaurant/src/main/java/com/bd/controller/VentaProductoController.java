package com.bd.controller;

import com.bd.exception.ResourceNotFoundException;
import com.bd.model.Venta;
import com.bd.model.VentaProducto;
import com.bd.model.VentaProductoID;
import com.bd.repos.VentaProductoRepository;
import com.bd.repos.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.200:3000", "http://201.237.205.229:3000", "http://quescarv.casacam.net:3000"})
@RestController
@RequestMapping("/api/v1/")
public class VentaProductoController {
    @Autowired
    private VentaProductoRepository ventaProductoRepo;

    // REST APIs

    // Shows Personas

    @GetMapping("/ventaProducto")
    public List<VentaProducto> getAllVentas(){
        return ventaProductoRepo.findAll();
    }

    // Creates Personas, saves to DB
    @PostMapping("/ventaProducto")
    public List<VentaProducto> createVenta(@RequestBody List<VentaProducto> ventaProducto){
        List<VentaProducto> inserted = new ArrayList<>();
        for (int i = 0; i < ventaProducto.size(); i++) {
            VentaProductoID id = new VentaProductoID(ventaProducto.get(i).getIdVenta(), ventaProducto.get(i).getIdProducto());
            inserted.add(ventaProductoRepo.save(ventaProducto.get(i)));
            if (ventaProducto.get(i).getCantidad() == 0) {
                ventaProductoRepo.delete(ventaProducto.get(i));
            }
        }
        return inserted;
    }

    // Gets person from ID
    @GetMapping("/ventaProducto/{idVenta}")
    public List<VentaProducto>  getVentaByID(@PathVariable Long idVenta){
        List<VentaProducto> ventaProducto = ventaProductoRepo.findByIdVenta(idVenta);

        return ventaProducto;
    }

    // Updated person

    @PutMapping("/ventaProducto/{idVenta}/{idProducto}")
    public ResponseEntity<VentaProducto> updateVenta(@PathVariable Long idVenta, @PathVariable Long idProducto, @RequestBody VentaProducto ventaProductoDetails){
        VentaProductoID id = new VentaProductoID(idVenta, idProducto);
        VentaProducto ventaProducto = ventaProductoRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Venta: "+ idVenta));

        ventaProducto.setCantidad(ventaProductoDetails.getCantidad());

        VentaProducto updatedVenta = ventaProductoRepo.save(ventaProducto);
        return ResponseEntity.ok(updatedVenta);
    }


    // Delete person
    @DeleteMapping("/ventaProducto/{idVenta}/{idProducto}")
    public ResponseEntity<Map<String, Boolean>> deletePersona(@PathVariable Long idVenta, @PathVariable Long idProducto){
        VentaProductoID id = new VentaProductoID(idVenta, idProducto);
        VentaProducto ventaProducto = ventaProductoRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Venta: "+ idVenta));

        ventaProductoRepo.delete(ventaProducto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
