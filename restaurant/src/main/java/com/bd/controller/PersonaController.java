package com.bd.controller;

import com.bd.exception.ResourceNotFoundException;
import com.bd.model.Persona;
import com.bd.repos.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.200:3000", "http://quescarv.casacam.net:3000"})
@RestController
@RequestMapping("/api/v1/")
public class PersonaController {

    @Autowired

    private PersonaRepository personaRepo;

    // REST APIs

    // Shows Personas
    @GetMapping("/personas")
    public List<Persona> getAllPersonas(){
        return personaRepo.findAll();
    }

    // Creates Personas, saves to DB
    @PostMapping("/personas")
    public Persona createPersona(@RequestBody Persona persona){
        return personaRepo.save(persona);
    }

    // Gets person from ID
    @GetMapping("/personas/{cedula}")
    public ResponseEntity<Persona>  getPersonaByID(@PathVariable String cedula){
        Persona persona = personaRepo.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Persona con cédula: "+ cedula));

        return ResponseEntity.ok(persona);
    }

    // Updated person

    @PutMapping("/personas/{cedula}")
    public ResponseEntity<Persona> updatePersona(@PathVariable String cedula, @RequestBody Persona personaDetails){
        Persona persona = personaRepo.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Persona con cédula: "+ cedula));

        persona.setNombre(personaDetails.getNombre());
        persona.setApellido1(personaDetails.getApellido1());
        persona.setApellido2(personaDetails.getApellido2());

        Persona updatedPersona = personaRepo.save(persona);
        return ResponseEntity.ok(updatedPersona);
    }

    // Delete person
    @DeleteMapping("/personas/{cedula}")
    public ResponseEntity<Map<String, Boolean>> deletePersona(@PathVariable String cedula){
        Persona persona = personaRepo.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Persona con cédula: "+ cedula));

        personaRepo.delete(persona);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
