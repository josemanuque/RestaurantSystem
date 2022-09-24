-- Query que crea tablas para proyecto. Incluye contraints (PK, FK, NN, etc)

CREATE TABLE C##RESTAURANT.Personas (
    cedula      CHAR(9)         NOT NULL,
    nombre      VARCHAR2(30)    NOT NULL,
    apellido1   VARCHAR2(30)    NOT NULL,
    apellido2   VARCHAR2(30)    NOT NULL,

    CONSTRAINT Pk_personas_cedula PRIMARY KEY (cedula)
);

CREATE TABLE C##RESTAURANT.Vendedor (
    cedula      CHAR(9)         NOT NULL,
    usuario     VARCHAR2(30)    NOT NULL,
    clave       VARCHAR2(30)    NOT NULL,

    CONSTRAINT Pk_vendedor_usuario PRIMARY KEY (usuario),
    CONSTRAINT Fk_vendedor_cedula FOREIGN KEY (cedula)
        REFERENCES C##RESTAURANT.Personas(cedula)
);


CREATE TABLE C##RESTAURANT.Cliente (
     cedula     CHAR(9)         NOT NULL,
     telefono   CHAR(9)         NOT NULL,
     email      VARCHAR2(50)    NOT NULL,

     CONSTRAINT Pk_cliente_idCliente PRIMARY KEY (cedula),
     CONSTRAINT Fk_cliente_cedula FOREIGN KEY (cedula)
         REFERENCES C##RESTAURANT.Personas(cedula)
);

CREATE TABLE C##RESTAURANT.producto (
    idProducto      INT     GENERATED AS IDENTITY NOT NULL,
    descripcion     VARCHAR2(50)    NOT NULL,
    precio          NUMBER(15,3)    NOT NULL,

    CONSTRAINT Pk_producto_idProducto PRIMARY KEY (idProducto)
);


CREATE TABLE Venta (
       idVenta     INT       GENERATED AS IDENTITY NOT NULL,
       fecha       TIMESTAMP       NOT NULL,
       vendedor    VARCHAR2(30)    NOT NULL, --usuario
       cliente     CHAR(9)         NOT NULL, --idCliente

       CONSTRAINT Pk_venta_idVenta PRIMARY KEY (idVenta),
       CONSTRAINT Fk_venta_vendedor FOREIGN KEY (vendedor)
           REFERENCES C##RESTAURANT.Vendedor(usuario),
       CONSTRAINT Fk_venta_cliente FOREIGN KEY (cliente)
           REFERENCES C##RESTAURANT.Cliente(cedula)
);


CREATE TABLE C##RESTAURANT.VentaProducto (
       idProducto      INT     NOT NULL,
       idVenta         INT     NOT NULL,
       cantidad        INT     NOT NULL,

       CONSTRAINT Pk_ventaproducto_id PRIMARY KEY (idVenta, idProducto),
       CONSTRAINT Fk_ventaproducto_idVenta FOREIGN KEY (idVenta)
           REFERENCES C##RESTAURANT.Venta(idVenta),
       CONSTRAINT Fk_ventaproducto_idProducto FOREIGN KEY (idProducto)
           REFERENCES C##RESTAURANT.Producto(idProducto)
);


select * from vendedor;