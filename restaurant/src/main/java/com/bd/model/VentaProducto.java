package com.bd.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "ventaproducto", schema = "c##restaurant")
@IdClass(VentaProductoID.class)
public class VentaProducto implements Serializable {

    @Id
    @Column(name = "idproducto")
    private Long idProducto;

    @Id
    @Column(name = "idventa")
    private Long idVenta;

    private int cantidad;
    public VentaProducto() {

    }

    public VentaProducto(Long idProducto, Long idVenta, int cantidad) {
        this.idProducto = idProducto;
        this.idVenta = idVenta;
        this.cantidad = cantidad;
    }

    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }

    public Long getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Long idVenta) {
        this.idVenta = idVenta;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
