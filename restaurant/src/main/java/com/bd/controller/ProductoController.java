package com.bd.controller;

import com.bd.exception.ResourceNotFoundException;
import com.bd.model.Producto;
import com.bd.repos.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.200:3000", "http://201.237.205.229:3000", "http://quescarv.casacam.net:3000"})
@RestController
@RequestMapping("/api/v1/")
public class ProductoController {
    @Autowired
    private ProductoRepository productoRepo;

    // REST APIs

    // Shows Personas

    @GetMapping("/productos")
    public List<Producto> getAllProductos(){
        return productoRepo.findAll();
    }

    // Creates Personas, saves to DB
    @PostMapping("/productos")
    public Producto createProductos (@RequestBody Producto producto){
        return productoRepo.save(producto);
    }

    // Gets person from ID
    @GetMapping("/productos/{productoId}")
    public ResponseEntity<Producto>  getProductoByID(@PathVariable Long idProducto){
        Producto producto = productoRepo.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Persona con productoId: "+ idProducto));

        return ResponseEntity.ok(producto);
    }

    // Updated person

    @PutMapping("/productos/{productoId}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long idProducto, @RequestBody Producto productoDetails){
        Producto producto = productoRepo.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Cliente con cédula: "+ idProducto));

        producto.setIdProducto(productoDetails.getIdProducto());
        producto.setDescripcion(productoDetails.getDescripcion());
        producto.setPrecio(productoDetails.getPrecio());

        Producto updatedProducto = productoRepo.save(producto);
        return ResponseEntity.ok(updatedProducto);
    }

    // Delete person
    @DeleteMapping("/producto/{productoId}")
    public ResponseEntity<Map<String, Boolean>> deleteProducto(@PathVariable Long idProducto){
        Producto producto = productoRepo.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Cliente con cédula: "+ idProducto));

        productoRepo.delete(producto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
/*
    @GetMapping("/{idProducto}/ventas")
    public ResponseEntity<Set<Venta>> getVentasPerProducto(@PathVariable Long idProducto){
        Producto producto = productoRepo.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("No existe Persona con productoId: "+ idProducto));

        return ResponseEntity.ok(producto.getVentas());
    }

 */
}
