package com.bd.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "venta", schema = "c##restaurant")
public class Venta implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idventa")
    private Long idVenta;

    @Column(name = "fecha", columnDefinition="TIMESTAMP")
    private LocalDateTime fecha;

    @Column(name = "vendedor")
    private String vendedor;

    @Column(name = "cliente", columnDefinition="CHAR(9)")
    private String cliente;

    @Column(name = "total", columnDefinition="NUMBER(15,3)")
    private float total;


    public Venta() {

    }

    public Venta(Long idVenta, LocalDateTime fecha, String vendedor, String cliente, float total) {
        this.idVenta = idVenta;
        this.fecha = fecha;
        this.vendedor = vendedor;
        this.cliente = cliente;
        this.total = total;
    }

    public Long getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Long idVenta) {
        this.idVenta = idVenta;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getVendedor() {
        return vendedor;
    }

    public void setVendedor(String vendedor) {
        this.vendedor = vendedor;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }
}
