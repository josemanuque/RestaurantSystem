package com.bd.repos;

import com.bd.model.Cliente;
import com.bd.model.VentaProducto;
import com.bd.model.VentaProductoID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VentaProductoRepository extends JpaRepository<VentaProducto, VentaProductoID>{
    List<VentaProducto> findByIdVenta(Long idVenta);
}
