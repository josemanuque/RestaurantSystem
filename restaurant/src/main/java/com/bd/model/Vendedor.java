package com.bd.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "vendedor", schema = "c##restaurant")
public class Vendedor implements Serializable {
    @Id
    @Column(name = "usuario")
    private String usuario;

    @OneToOne
    @JoinColumn(name = "cedula")
    private Persona personaId;

    @Column(name = "clave")
    private String clave;

    public Vendedor() {

    }

    public Vendedor(Persona cedula, String usuario, String clave) {
        super();
        this.personaId = cedula;
        this.usuario = usuario;
        this.clave = clave;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Persona getCedula() {
        return personaId;
    }

    public void setCedula(Persona cedula) {
        this.personaId = cedula;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
}