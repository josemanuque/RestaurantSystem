package com.bd.controller;

import com.bd.exception.ResourceNotFoundException;
import com.bd.model.Vendedor;
import com.bd.model.Vendedor;
import com.bd.repos.VendedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.200:3000", "http://201.237.205.229:3000", "http://quescarv.casacam.net:3000"})
@RestController
@RequestMapping("/api/v1/")
public class VendedorController {

    @Autowired
    private VendedorRepository vendedorRepo;

    @GetMapping("/vendedores")
    public List<Vendedor> getAllVendedores() {
        return vendedorRepo.findAll();
    }


    @PostMapping("/vendedores")
    public Vendedor createVendedor(@RequestBody Vendedor vendedor){
        return vendedorRepo.save(vendedor);
    }

    // Gets person from ID
    @GetMapping("/vendedores/{usuario}")
    public ResponseEntity<Vendedor> getVendedorByID(@PathVariable String usuario){
        Vendedor vendedor = vendedorRepo.findById(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Persona con cédula: "+ usuario));

        return ResponseEntity.ok(vendedor);
    }

    // Updated person

    @PutMapping("/vendedores/{usuario}")
    public ResponseEntity<Vendedor> updateVendedor(@PathVariable String usuario, @RequestBody Vendedor vendedorDetails){
        Vendedor vendedor = vendedorRepo.findById(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Vendedor con usuario: "+ usuario));

        vendedor.setUsuario(vendedorDetails.getUsuario());
        vendedor.setClave(vendedorDetails.getClave());
        vendedor.setCedula(vendedorDetails.getCedula());

        Vendedor updatedPersona = vendedorRepo.save(vendedor);
        return ResponseEntity.ok(updatedPersona);
    }

    // Delete person
    @DeleteMapping("/vendedores/{usuario}")
    public ResponseEntity<Map<String, Boolean>> deleteVendedor(@PathVariable String usuario){
        Vendedor persona = vendedorRepo.findById(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Vendedor con usuario: "+ usuario));

        vendedorRepo.delete(persona);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}