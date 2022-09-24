package com.bd.repos;

import com.bd.model.Cliente;
import com.bd.model.VentaProducto;
import com.bd.model.VentaProductoID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaProductoRepository extends JpaRepository<VentaProducto, VentaProductoID>{
}
