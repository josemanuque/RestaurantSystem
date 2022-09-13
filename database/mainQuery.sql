CREATE TABLE Personas (
    cedula      CHAR(9)         NOT NULL,
    nombre      VARCHAR2(30)    NOT NULL,
    apellido1   VARCHAR2(30)    NOT NULL,
    apellido2   VARCHAR2(30)    NOT NULL,
    
    CONSTRAINT Pk_personas_cedula PRIMARY KEY (cedula)
);

CREATE TABLE Vendedor (
    cedula      CHAR(9)         NOT NULL,
    usuario     VARCHAR2(30)    NOT NULL,
    clave       VARCHAR2(30)    NOT NULL,
    
    CONSTRAINT Pk_vendedor_usuario PRIMARY KEY (usuario),
    CONSTRAINT Fk_vendedor_cedula FOREIGN KEY (cedula)
        REFERENCES Personas(cedula)
);

CREATE TABLE Cliente (
    cedula      CHAR(9)     NOT NULL,
    idCliente   INT         NOT NULL,
    
    CONSTRAINT Pk_cliente_idCliente PRIMARY KEY (idCliente),
    CONSTRAINT Fk_cliente_cedula FOREIGN KEY (cedula)
        REFERENCES Personas(cedula)
);


CREATE TABLE Venta (
    idVenta     INT             NOT NULL,
    fecha       TIMESTAMP       NOT NULL,
    vendedor    VARCHAR2(30)    NOT NULL, --usuario
    cliente     int             NOT NULL, --idCliente
    
    CONSTRAINT Pk_venta_idVenta PRIMARY KEY (idVenta),
    CONSTRAINT Fk_venta_vendedor FOREIGN KEY (vendedor)
        REFERENCES Vendedor(usuario),
    CONSTRAINT Fk_venta_cliente FOREIGN KEY (cliente)
        REFERENCES Cliente(idCliente)
);



CREATE TABLE Producto (
    idProducto      INT             NOT NULL,
    descripcion     VARCHAR2(45)    NOT NULL,
    precio          NUMBER(15,3)     NOT NULL,
    
    CONSTRAINT Pk_producto_idProducto PRIMARY KEY (idProducto)
);


CREATE TABLE VentaProducto (
    idProducto      INT     NOT NULL,
    idVenta         INT     NOT NULL,
    cantidad        INT     NOT NULL,
    
    CONSTRAINT Pk_ventaproducto_id PRIMARY KEY (idVenta, idProducto),
    CONSTRAINT Fk_ventaproducto_idVenta FOREIGN KEY (idVenta)
        REFERENCES Venta(idVenta),
    CONSTRAINT Fk_ventaproducto_idProducto FOREIGN KEY (idProducto)
        REFERENCES Producto(idProducto)
);