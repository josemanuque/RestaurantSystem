package com.bd.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

//@Embeddable
public class VentaProductoID implements Serializable {

    //@Column(name = "idproducto")
    private Long idProducto;

    //@Column(name = "idventa")
    private Long idVenta;


    public VentaProductoID(){

    }

    public VentaProductoID(Long idVenta, Long idProducto) {
        super();
        this.idProducto = idProducto;
        this.idVenta = idVenta;
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

    @Override
    public int hashCode() {
        return Objects.hash(idProducto, idVenta);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        VentaProductoID other = (VentaProductoID) obj;
        return Objects.equals(getIdVenta(), other.getIdVenta()) && Objects.equals(getIdProducto(), other.getIdProducto());
    }
}
