package com.bd.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "ventaproducto", schema = "c##restaurant")
public class VentaProducto implements Serializable {
    @EmbeddedId
    private VentaProductoID ventaProductoId;


    @Column(name = "cantidad")
    private int cantidad;
    public VentaProducto() {

    }

    public VentaProducto(VentaProductoID ventaProductoId, int cantidad) {
        this.ventaProductoId = ventaProductoId;
        this.cantidad = cantidad;
    }

    public VentaProductoID getVentaProductoId() {
        return ventaProductoId;
    }

    public void setVentaProductoId(VentaProductoID idProducto) {
        this.ventaProductoId = ventaProductoId;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
