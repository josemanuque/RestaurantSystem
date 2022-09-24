package com.bd.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class VentaProductoID implements Serializable {

    @Column(name = "idProducto")
    private Long idProducto;

    @Column(name = "idVenta")
    private Long idVenta;
}
