package com.bd.controller;

import com.bd.exception.ResourceNotFoundException;
import com.bd.model.Venta;
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
public class VentaController {
    @Autowired
    private VentaRepository ventaRepo;

    // REST APIs

    // Shows Personas

    @GetMapping("/ventas")
    public List<Venta> getAllVentas(){
        return ventaRepo.findAll();
    }

    // Creates Personas, saves to DB
    @PostMapping("/ventas")
    public Venta createVenta(@RequestBody Venta venta){
        return ventaRepo.save(venta);
    }

    // Gets person from ID
    @GetMapping("/ventas/{idVenta}")
    public ResponseEntity<Venta>  getVentaByID(@PathVariable Long idVenta){
        Venta venta = ventaRepo.findById(idVenta)
                .orElseThrow(() -> new ResourceNotFoundException("No existe venta: "+ idVenta));

        return ResponseEntity.ok(venta);
    }

    // Updated person

    @PutMapping("/ventas/{idVenta}")
    public ResponseEntity<Venta> updateVenta(@PathVariable Long idVenta, @RequestBody Venta ventaDetails){
        Venta venta = ventaRepo.findById(idVenta)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Venta: "+ idVenta));

        venta.setIdVenta(ventaDetails.getIdVenta());
        venta.setFecha(ventaDetails.getFecha());
        venta.setCliente(ventaDetails.getCliente());
        venta.setVendedor(ventaDetails.getVendedor());

        Venta updatedVenta = ventaRepo.save(venta);
        return ResponseEntity.ok(updatedVenta);
    }

    // Delete person
    @DeleteMapping("/ventas/{idVenta}")
    public ResponseEntity<Map<String, Boolean>> deletePersona(@PathVariable Long idVenta){
        Venta venta = ventaRepo.findById(idVenta)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Venta: "+ idVenta));

        ventaRepo.delete(venta);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
