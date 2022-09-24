package com.bd.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "ventaProducto", schema = "c##restaurant")
public class VentaProducto implements Serializable {
    @EmbeddedId
    private VentaProductoID id;

    @ManyToOne
    @MapsId("idProducto")
    @JoinColumn(name = "idProducto")
    private Producto producto;

    @ManyToOne
    @MapsId("idVenta")
    @JoinColumn(name = "idVenta")
    private Venta venta;


    public VentaProducto() {

    }

    public VentaProducto(VentaProductoID id, Producto producto, Venta venta) {
        this.id = id;
        this.producto = producto;
        this.venta = venta;
    }
}
