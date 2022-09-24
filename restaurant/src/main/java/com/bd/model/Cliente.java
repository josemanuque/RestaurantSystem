package com.bd.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "cliente", schema = "c##restaurant")
public class Cliente implements Serializable {
    @Id
    @Column(name = "cedula", columnDefinition="CHAR(9)")
    private String cedula;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "cedula")
    private Persona persona;
    @Column(name = "telefono", columnDefinition="CHAR(9)")
    private String telefono;

    @Column(name = "email")
    private String email;

    public Cliente() {

    }

    public Cliente(Persona persona, String cedula, String telefono, String email) {
        super();
        this.persona = persona;
        this.cedula = cedula;
        this.telefono = telefono;
        this.email = email;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }
}
