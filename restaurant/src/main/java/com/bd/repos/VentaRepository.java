package com.bd.repos;

import com.bd.model.Cliente;
import com.bd.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long>{
}
