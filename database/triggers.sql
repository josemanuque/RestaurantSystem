-- Tabla de auditoria de cambios en la base de datos (logs)

create table logs(
    operacion   varchar(30),
    tiempo      timestamp,
    usuario     varchar2(30),
    tabla       varchar2(30),
    idTabla     varchar2(30),
    datosOld    varchar2(200),
    datosNew    varchar2(200)
    );


-- -------------- TRIGGERS --------------


-- Triggers para insertar en la tabla de auditoria (logs)

drop trigger persona_inserta;
CREATE trigger persona_inserta 
    after insert on 
        personas
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := :new.cedula;
        tempNew varchar2(200);

    BEGIN
        tempNew := (:new.cedula || ', ' || :new.nombre || ', ' || :new.apellido1 ||', ' || :new.apellido2);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Insert', sysdate, v_username, 'Personas', tempId, NULL, tempNew);
        
    END;

drop trigger vendedor_inserta;
CREATE trigger vendedor_inserta 
    after insert on 
        vendedor
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := :new.usuario;
        tempNew varchar2(200);

    BEGIN
        tempNew := (:new.cedula || ', ' || :new.usuario || ', ' || :new.clave);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Insert', sysdate, v_username, 'Vendedor', tempId, NULL, tempNew);
        
    END;
    
drop trigger cliente_inserta;
CREATE trigger cliente_inserta 
    after insert on 
        cliente
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := :new.cedula;
        tempNew varchar2(200);

    BEGIN
        tempNew := (:new.cedula || ', ' || :new.telefono || ', ' || :new.email);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Insert', sysdate, v_username, 'Cliente', tempId, NULL, tempNew);
        
    END;

drop trigger producto_inserta;
CREATE trigger producto_inserta 
    after insert on 
        producto
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := to_char(:new.idProducto);
        tempNew varchar2(200);

    BEGIN
        tempNew := (to_char(:new.idProducto) || ', ' || :new.descripcion || ', ' || to_char(:new.precio));
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Insert', sysdate, v_username, 'Producto', tempId, NULL, tempNew);
        
    END;

drop trigger venta_inserta;
CREATE trigger venta_inserta 
    after insert on 
        venta
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := to_char(:new.idVenta);
        tempNew varchar2(200);

    BEGIN
        tempNew := (to_char(:new.idVenta) || ', ' || :new.fecha || ', ' || :new.vendedor ||', ' || to_char(:new.total));
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Insert', sysdate, v_username, 'Venta', tempId, NULL, tempNew);
        
    END;


drop trigger ventaproducto_inserta;
CREATE trigger ventaproducto_inserta 
    after insert on 
        ventaProducto
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := ('idVenta: ' || to_char(:new.idVenta) || ', idProducto: ' || to_char(:new.idProducto));
        tempNew varchar2(200);

    BEGIN
        tempNew := (to_char(:new.idVenta) || ', ' || :new.idProducto || ', ' || :new.cantidad);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Insert', sysdate, v_username, 'VentaProducto', tempId, NULL, tempNew);
        
    END;

-- Triggers para delete

drop trigger persona_delete;
CREATE trigger persona_delete 
    after delete on 
        personas
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := :old.cedula;
        tempOld varchar2(200);

    BEGIN
        tempOld := (:old.cedula || ', ' || :old.nombre || ', ' || :old.apellido1 ||', ' || :old.apellido2);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Delete', sysdate, v_username, 'Personas', tempId, tempOld, NULL);
        
    END;


drop trigger vendedor_delete;
CREATE trigger vendedor_delete 
    after delete on 
        vendedor
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := :old.usuario;
        tempOld varchar2(200);

    BEGIN
        tempOld := (:old.cedula || ', ' || :old.usuario || ', ' || :old.clave);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Delete', sysdate, v_username, 'Vendedor', tempId, tempOld, NULL);
        
    END;
    
drop trigger cliente_delete;
CREATE trigger cliente_delete 
    after delete on 
        cliente
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := :old.cedula;
        tempOld varchar2(200);

    BEGIN
        tempOld := (:old.cedula || ', ' || :old.telefono || ', ' || :old.email);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Delete', sysdate, v_username, 'Cliente', tempId, tempOld, NULL);
        
    END;

drop trigger producto_delete;
CREATE trigger producto_delete 
    after delete on 
        producto
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := to_char(:old.idProducto);
        tempOld varchar2(200);

    BEGIN
        tempOld := (to_char(:old.idProducto) || ', ' || :old.descripcion || ', ' || to_char(:old.precio));
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Delete', sysdate, v_username, 'Producto', tempId, tempOld, NULL);
        
    END;

drop trigger venta_delete;
CREATE trigger venta_delete 
    after delete on 
        venta
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := to_char(:old.idVenta);
        tempOld varchar2(200);

    BEGIN
        tempOld := (to_char(:old.idVenta) || ', ' || :old.fecha || ', ' || :old.vendedor ||', ' || to_char(:old.total));
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Delete', sysdate, v_username, 'Venta', tempId, tempOld, NULL);
        
    END;


drop trigger ventaproducto_delete;
CREATE trigger ventaproducto_delete 
    after delete on 
        ventaProducto
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := ('idVenta: ' || to_char(:old.idVenta) || ', idProducto: ' || to_char(:old.idProducto));
        tempOld varchar2(200);

    BEGIN
        tempOld := (to_char(:old.idVenta) || ', ' || :old.idProducto || ', ' || :old.cantidad);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Delete', sysdate, v_username, 'VentaProducto', tempId, tempOld, NULL);
        
    END;



-- Triggers para update

drop trigger persona_update;
CREATE trigger persona_update 
    after update on 
        personas
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := :new.cedula;
        tempOld varchar2(200);
        tempNew varchar2(200);

    BEGIN
        tempOld := (:old.cedula || ', ' || :old.nombre || ', ' || :old.apellido1 ||', ' || :old.apellido2);
        tempNew := (:new.cedula || ', ' || :new.nombre || ', ' || :new.apellido1 ||', ' || :new.apellido2);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Update', sysdate, v_username, 'Personas', tempId, tempOld, tempNew);
        
    END;
    

drop trigger vendedor_update;
CREATE trigger vendedor_update 
    after update on 
        vendedor
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := :new.usuario;
        tempOld varchar2(200);
        tempNew varchar2(200);

    BEGIN
        tempOld := (:old.cedula || ', ' || :old.usuario || ', ' || :old.clave);
        tempNew := (:new.cedula || ', ' || :new.usuario || ', ' || :new.clave);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Update', sysdate, v_username, 'Vendedor', tempId, tempOld, tempNew);
        
    END;
    
drop trigger cliente_update;
CREATE trigger cliente_update 
    after update on 
        cliente
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := :new.cedula;
        tempOld varchar2(200);
        tempNew varchar2(200);

    BEGIN
        tempOld := (:old.cedula || ', ' || :old.telefono || ', ' || :old.email);
        tempNew := (:new.cedula || ', ' || :new.telefono || ', ' || :new.email);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Update', sysdate, v_username, 'Cliente', tempId, tempOld, tempNew);
        
    END;

drop trigger producto_update;
CREATE trigger producto_update 
    after update on 
        producto
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := to_char(:new.idProducto);
        tempOld varchar2(200);
        tempNew varchar2(200);

    BEGIN
        tempOld := (to_char(:old.idProducto) || ', ' || :old.descripcion || ', ' || to_char(:old.precio));
        tempNew := (to_char(:new.idProducto) || ', ' || :new.descripcion || ', ' || to_char(:new.precio));
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Update', sysdate, v_username, 'Producto', tempId, tempOld, tempNew);
        
    END;

drop trigger venta_update;
CREATE trigger venta_update 
    after update on 
        venta
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := to_char(:new.idVenta);
        tempOld varchar2(200);
        tempNew varchar2(200);

    BEGIN
        tempOld := (to_char(:old.idVenta) || ', ' || :old.fecha || ', ' || :old.vendedor ||', ' || to_char(:old.total));
        tempNew := (to_char(:new.idVenta) || ', ' || :new.fecha || ', ' || :new.vendedor ||', ' || to_char(:new.total));
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Update', sysdate, v_username, 'Venta', tempId, tempOld, tempNew);
        
    END;


drop trigger ventaproducto_update;
CREATE trigger ventaproducto_update 
    after update on 
        ventaProducto
    for each row
    
    DECLARE
        v_username varchar2(20);
        fecha timestamp := sysdate;
        tempId varchar2(30) := ('idVenta: ' || to_char(:new.idVenta) || ', idProducto: ' || to_char(:new.idProducto));
        tempOld varchar2(200);
        tempNew varchar2(200);

    BEGIN
        tempOld := (to_char(:old.idVenta) || ', ' || :old.idProducto || ', ' || :old.cantidad);
        tempNew := (to_char(:new.idVenta) || ', ' || :new.idProducto || ', ' || :new.cantidad);
        
        SELECT user INTO v_username
           FROM dual;

        insert into logs (operacion, tiempo, usuario, tabla, idTabla, datosOld, datosNew) 
            values ('Update', sysdate, v_username, 'VentaProducto', tempId, tempOld, tempNew);
        
    END;

