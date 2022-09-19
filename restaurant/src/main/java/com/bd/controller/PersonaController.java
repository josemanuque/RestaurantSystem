package com.bd.controller;

import com.bd.model.Persona;
import com.bd.repos.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class PersonaController {

    @Autowired
    private PersonaRepository personaRepo;

    // Muestra Personas
    @GetMapping("/personas")
    public List<Persona> getAllPersonas(){
        return personaRepo.findAll();
    }
}
