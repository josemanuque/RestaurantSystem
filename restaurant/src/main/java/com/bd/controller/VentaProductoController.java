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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public VentaProducto createVenta(@RequestBody VentaProducto ventaProducto){
        return ventaProductoRepo.save(ventaProducto);
    }

    // Gets person from ID
    @GetMapping("/ventaProducto/{idVenta}/{idProducto}")
    public ResponseEntity<VentaProducto>  getVentaByID(@PathVariable Long idVenta, @PathVariable Long idProducto){
        VentaProductoID id = new VentaProductoID(idVenta, idProducto);
        VentaProducto ventaProducto = ventaProductoRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe"));

        return ResponseEntity.ok(ventaProducto);
    }

    // Updated person

    @PutMapping("/ventas/{idVenta}/{idProducto}")
    public ResponseEntity<VentaProducto> updateVenta(@PathVariable Long idVenta, @PathVariable Long idProducto, @RequestBody VentaProducto ventaProductoDetails){
        VentaProductoID id = new VentaProductoID(idVenta, idProducto);
        VentaProducto ventaProducto = ventaProductoRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Venta: "+ idVenta));

        ventaProducto.setCantidad(ventaProductoDetails.getCantidad());

        VentaProducto updatedVenta = ventaProductoRepo.save(ventaProducto);
        return ResponseEntity.ok(updatedVenta);
    }

    // Delete person
    @DeleteMapping("/ventas/{idVenta}/{idProducto}")
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
