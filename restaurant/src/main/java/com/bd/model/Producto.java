package com.bd.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "producto", schema = "c##restaurant")
public class Producto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idproducto")
    private Long idProducto;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio", columnDefinition="NUMBER(15, 3)")
    private double precio;

    public Producto() {

    }

    public Producto(Long idProducto, String descripcion, double precio) {
        this.idProducto = idProducto;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }


    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }
}
