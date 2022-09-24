package com.bd.controller;

import com.bd.exception.ResourceNotFoundException;
import com.bd.model.Cliente;
import com.bd.model.Persona;
import com.bd.repos.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.200:3000", "http://201.237.205.229:3000", "http://quescarv.casacam.net:3000"})
@RestController
@RequestMapping("/api/v1/")
public class ClienteController {
    @Autowired
    private ClienteRepository clienteRepo;

    // REST APIs

    // Shows Personas

    @GetMapping("/clientes")
    public List<Cliente> getAllClientes(){
        return clienteRepo.findAll();
    }

    // Creates Personas, saves to DB
    @PostMapping("/clientes")
    public Cliente createCliente(@RequestBody Cliente cliente){
        return clienteRepo.save(cliente);
    }

    // Gets person from ID
    @GetMapping("/clientes/{cedula}")
    public ResponseEntity<Cliente>  getClienteByID(@PathVariable String cedula){
        Cliente cliente = clienteRepo.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Persona con cédula: "+ cedula));

        return ResponseEntity.ok(cliente);
    }

    // Updated person

    @PutMapping("/clientes/{cedula}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable String cedula, @RequestBody Cliente clienteDetails){
        Cliente cliente = clienteRepo.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Cliente con cédula: "+ cedula));

        cliente.setCedula(clienteDetails.getCedula());
        cliente.setTelefono(clienteDetails.getTelefono());
        cliente.setEmail(clienteDetails.getEmail());

        Cliente updatedCliente = clienteRepo.save(cliente);
        return ResponseEntity.ok(updatedCliente);
    }

    // Delete person
    @DeleteMapping("/clientes/{cedula}")
    public ResponseEntity<Map<String, Boolean>> deletePersona(@PathVariable String cedula){
        Cliente cliente = clienteRepo.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Cliente con cédula: "+ cedula));

        clienteRepo.delete(cliente);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
