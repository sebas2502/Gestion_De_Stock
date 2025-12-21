-- ============================================================
--   SISTEMA DE GESTIÓN DE STOCK — MODELO MULTIEMPRESA (SaaS)
-- ============================================================

CREATE DATABASE IF NOT EXISTS sistema_stock;
USE sistema_stock;

-- credenciales empresa_id=1 
-- Admin Demo 1234
-- Empleado 2468

-- credenciales empresa_id=2 
-- Sebastian Contreras(Admin) MypassAdmin25
-- Jose Perez(Empleado) Pass25

insert into usuarios(2,1,"Sebastian Contreras")

-- ===============================================
--                TABLA: EMPRESAS
-- ===============================================
CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cuit VARCHAR(20),
    direccion VARCHAR(200),
    telefono VARCHAR(50),
    email VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================================
--                TABLA: ROLES
-- ===============================================
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

INSERT INTO roles (nombre) VALUES 
('admin'),
('empleado');
use sistema_stock;
select * from usuarios;
select * from roles;
select * from empresas;
select * from categorias;
select * from productos;
select * from movimientos_stock;
delete from movimientos_stock;
describe movimientos_stock;
INSERT INTO movimientos_stock (empresa_id, producto_id, tipo, cantidad, descripcion)
VALUES (1, 1, 'entrada', 1, 'Prueba dashboard');

-- ===============================================
--                TABLA: USUARIOS
-- ===============================================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    rol_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    activo TINYINT DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (empresa_id) REFERENCES empresas(id),
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- ===============================================
--                TABLA: CATEGORÍAS
-- ===============================================
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,

    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- ===============================================
--                TABLA: PRODUCTOS
-- ===============================================
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    categoria_id INT,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    stock_minimo INT DEFAULT 0,
    codigo_barras VARCHAR(80),
    activo TINYINT DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (empresa_id) REFERENCES empresas(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- ===============================================
--          TABLA: MOVIMIENTOS DE STOCK
-- ===============================================
CREATE TABLE movimientos_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    producto_id INT NOT NULL,
    tipo ENUM('entrada','salida') NOT NULL,
    cantidad INT NOT NULL,
    descripcion VARCHAR(200),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (empresa_id) REFERENCES empresas(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ===============================================
--                 TABLA: VENTAS
-- ===============================================
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    usuario_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (empresa_id) REFERENCES empresas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- ===============================================
--            TABLA: DETALLES DE VENTA
-- ===============================================
CREATE TABLE ventas_detalles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (venta_id) REFERENCES ventas(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ===============================================
--                USUARIO ADMIN BASE
-- ===============================================

-- ⚠️ Reemplazá la contraseña en tu backend por una encriptada con bcrypt.
INSERT INTO empresas (nombre) VALUES ('Empresa Demo');

INSERT INTO usuarios (empresa_id, rol_id, nombre, email, password)
VALUES (1, 1, 'Admin Demo', 'admin@demo.com', '$2a$10$zvI0RWR6cm1cRTjRZXYyTuY9GwAnL.S1A2H0B64wFzRD17izHSTrC');
-- Clave de usuario Admin Demo : 1234
INSERT INTO usuarios (empresa_id, rol_id, nombre, email, password)
VALUES (1, 2, 'Empleado Demo', 'empleado@demo.com', '$2a$10$2ocf2/XxY./q/xuM.NTdvOTbvDz6O.czyHpNAxPDHVxUhUM7dGUEK');
-- Clave de usuario empleado Demo : 2468

use sistema_stock;
alter table movimientos_stock add column usuario_id int not null;
alter table movimientos_stock add column total float not null;
describe movimientos_stock;

select * from empresas;
select * from usuarios;
select * from productos where empresa_id=2;
delete from movimientos_stock;
describe movimientos_stock;
describe categorias;
select * from categorias where empresa_id=2;
select * from roles;
select * from categorias where id=4 and empresa_id=1;
describe productos;
use sistema_stock;
delete from productos where empresa_id=2;
-- Datos Empresa id=2 ===================================================================
insert into empresas(nombre,cuit,direccion,telefono,email)
values("Ferreteria El Goyanito","30-588545-3","Avenida Rolon 234","3777-858585","elgoyanito@gmail.com");

INSERT INTO categorias (empresa_id, nombre) VALUES
(2, 'Tornillería'),
(2, 'Herramientas Manuales'),
(2, 'Herramientas Eléctricas'),
(2, 'Pinturas y Accesorios'),
(2, 'Electricidad'),
(2, 'Plomería'),
(2, 'Seguridad Industrial'),
(2, 'Adhesivos y Selladores'),
(2, 'Materiales de Construcción'),
(2, 'Jardinería');

INSERT INTO productos 
(empresa_id, categoria_id, nombre, descripcion, precio, stock, stock_minimo, codigo)
VALUES
(2, 1, 'Tornillo Phillips 1/2"', 'Tornillo de acero cabeza phillips', 15.50, 500, 100, 'TOR001'),
(2, 1, 'Tornillo Autoperforante', 'Tornillo autoperforante zincado', 18.00, 400, 80, 'TOR002'),
(2, 1, 'Tuerca Hexagonal M8', 'Tuerca estándar métrica M8', 12.00, 300, 60, 'TOR003');

INSERT INTO productos 
(empresa_id, categoria_id, nombre, descripcion, precio, stock, stock_minimo, codigo)
VALUES
(2, 2, 'Martillo Carpintero', 'Martillo mango de fibra 16 oz', 8500.00, 25, 5, 'HER001'),
(2, 2, 'Destornillador Plano', 'Destornillador plano 6mm', 2200.00, 40, 10, 'HER002'),
(2, 2, 'Pinza Universal', 'Pinza universal aislada', 6800.00, 20, 5, 'HER003');

INSERT INTO productos 
(empresa_id, categoria_id, nombre, descripcion, precio, stock, stock_minimo, codigo)
VALUES
(2, 3, 'Taladro Eléctrico 500W', 'Taladro eléctrico con percutor', 55000.00, 8, 2, 'ELE001'),
(2, 3, 'Amoladora Angular', 'Amoladora 115mm 750W', 48000.00, 6, 2, 'ELE002');

INSERT INTO productos 
(empresa_id, categoria_id, nombre, descripcion, precio, stock, stock_minimo, codigo)
VALUES
(2, 4, 'Pintura Látex Blanca 20L', 'Pintura interior/exterior', 42000.00, 12, 3, 'PIN001'),
(2, 4, 'Rodillo Profesional', 'Rodillo lana sintética', 6500.00, 30, 8, 'PIN002');

INSERT INTO productos 
(empresa_id, categoria_id, nombre, descripcion, precio, stock, stock_minimo, codigo)
VALUES
(2, 5, 'Cable Unipolar 2.5mm', 'Cable eléctrico normalizado', 950.00, 200, 50, 'ELEC01'),
(2, 5, 'Toma Corriente Doble', 'Toma corriente blanco', 3800.00, 35, 10, 'ELEC02');

INSERT INTO productos 
(empresa_id, categoria_id, nombre, descripcion, precio, stock, stock_minimo, codigo)
VALUES
(2, 6, 'Llave Esférica 1/2"', 'Llave de paso metálica', 7200.00, 18, 5, 'PLO001'),
(2, 6, 'Cinta Teflón', 'Cinta selladora para roscas', 1200.00, 50, 15, 'PLO002');


-- ======================================================================================

delete from productos where id=1 and empresa_id=1;
ALTER TABLE productos 
CHANGE codigo_barras codigo VARCHAR(10);

insert into categorias(empresa_id,nombre)values
(1,"limpieza"),(1,"ferreteria"),(1,"vasar");
insert into productos(empresa_id,categoria_id,nombre,descripcion,precio,stock,stock_minimo,codigo_barras,activo)values
(1,2,"detergente","por litro",2000,50,20,"PROD-004",1);
DROP TRIGGER IF EXISTS tr_actualizar_stock_despues_insert;
DROP TRIGGER IF EXISTS tr_movimiento_update;
DROP TRIGGER IF EXISTS tr_movimiento_delete;

SELECT *
FROM movimientos_stock
WHERE empresa_id = 1
  AND fecha >= '2025-12-05 00:00:00'
  AND fecha <= '2025-12-05 23:59:59'
ORDER BY fecha DESC;


-- ===========================
--   INSERTAR 10 PRODUCTOS
-- ===========================
SET FOREIGN_KEY_CHECKS = 0;
delete from productos;
delete from categorias;
delete from movimientos_stock;
SET FOREIGN_KEY_CHECKS = 1;
-- Reestablecemos los ids de las tablas (las tablas deben estar vacias)
ALTER TABLE productos AUTO_INCREMENT = 1;
ALTER TABLE categorias AUTO_INCREMENT = 1;
ALTER TABLE movimientos_stock AUTO_INCREMENT = 1;

INSERT INTO categorias (id, empresa_id, nombre) VALUES
(1, 1, 'Limpieza'),
(2, 1, 'Ferretería'),
(3, 1, 'Electrónica'),
(4, 1, 'Oficina'),
(5, 1, 'Textil');



select * from categorias;
INSERT INTO productos (
  empresa_id, categoria_id, nombre, descripcion, precio, stock, stock_minimo, codigo, activo
) VALUES
-- Limpieza
(1, 1, 'Trapo de Piso', 'Trapo absorbente reforzado', 1500.00, 20, 5, 'TP001', 1),
(1, 1, 'Lavandina 1L', 'Lavandina concentrada', 900.00, 30, 10, 'LA001', 1),

-- Ferretería
(1, 2, 'Martillo Acero', 'Martillo de carpintero', 4500.00, 15, 5, 'MT001', 1),
(1, 2, 'Destornillador Phillips', 'Destornillador PH2', 1200.00, 40, 10, 'DS001', 1),

-- Electrónica
(1, 3, 'Mouse Inalámbrico', 'Mouse óptico inalámbrico', 7000.00, 25, 5, 'MS001', 1),
(1, 3, 'Auriculares Bluetooth', 'Auriculares con micrófono', 15000.00, 12, 3, 'AU001', 1),

-- Oficina
(1, 4, 'Resma A4', 'Papel A4 500 hojas', 4500.00, 50, 10, 'A4001', 1),
(1, 4, 'Lapicera Azul', 'Lapicera punta fina azul', 300.00, 200, 50, 'LP001', 1),

-- Textil
(1, 5, 'Remera Algodón', 'Remera básica de algodón', 8000.00, 18, 5, 'RM001', 1),
(1, 5, 'Toalla de Mano', 'Toalla suave 100% algodón', 3500.00, 10, 3, 'TL001', 1);


-- ===========================
--   INSERTAR 50 MOVIMIENTOS
-- ===========================
SELECT id, nombre FROM productos ORDER BY id;

INSERT INTO movimientos_stock (empresa_id, producto_id, tipo, cantidad, descripcion, fecha, usuario_id, total) VALUES
(1, 1, 'entrada', 10, 'Reposición proveedor', '2025-01-05 10:15:00', 1, 15000),
(1, 1, 'salida', 4, 'Venta local', '2025-01-07 14:20:00', 1, 6000),

(1, 2, 'entrada', 20, 'Ingreso mercadería', '2025-01-10 09:00:00', 1, 18000),
(1, 2, 'salida', 5, 'Venta online', '2025-01-11 16:30:00', 1, 4500),

(1, 3, 'entrada', 8, 'Compra proveedor', '2025-01-03 11:40:00', 1, 36000),
(1, 3, 'salida', 2, 'Venta mostrador', '2025-01-15 13:10:00', 1, 9000),

(1, 4, 'entrada', 25, 'Ingreso ferretería', '2025-01-18 08:55:00', 1, 30000),
(1, 4, 'salida', 10, 'Venta ferretería', '2025-01-22 12:00:00', 1, 12000),

(1, 5, 'entrada', 12, 'Compra mayorista', '2025-01-09 15:47:00', 1, 84000),
(1, 5, 'salida', 3, 'Venta negocio', '2025-01-20 17:30:00', 1, 21000);

INSERT INTO movimientos_stock (empresa_id, producto_id, tipo, cantidad, descripcion, fecha, usuario_id, total) VALUES
(1, 6, 'entrada', 10, 'Stock nuevo', '2025-01-25 09:12:00', 1, 150000),
(1, 6, 'salida', 2, 'Venta', '2025-01-26 14:44:00', 1, 30000),

(1, 7, 'entrada', 30, 'Reposición', '2025-02-02 11:20:00', 1, 135000),
(1, 7, 'salida', 12, 'Venta mayorista', '2025-02-04 16:10:00', 1, 54000),

(1, 8, 'entrada', 100, 'Compra oficina', '2025-02-01 10:00:00', 1, 30000),
(1, 8, 'salida', 40, 'Venta empresa', '2025-02-07 13:15:00', 1, 12000),

(1, 9, 'entrada', 15, 'Ingreso textil', '2025-02-03 17:50:00', 1, 120000),
(1, 9, 'salida', 6, 'Venta online', '2025-02-09 12:33:00', 1, 48000),

(1, 10, 'entrada', 10, 'Reposición proveedor', '2025-02-05 09:25:00', 1, 35000),
(1, 10, 'salida', 3, 'Venta local', '2025-02-10 14:00:00', 1, 10500);

INSERT INTO movimientos_stock (empresa_id, producto_id, tipo, cantidad, descripcion, fecha, usuario_id, total) VALUES
(1, 1, 'salida', 3, 'Venta', '2025-02-15 11:10:00', 1, 4500),
(1, 2, 'salida', 4, 'Venta', '2025-02-16 10:05:00', 1, 3600),

(1, 3, 'entrada', 5, 'Ingreso proveedor', '2025-02-20 16:30:00', 1, 22500),
(1, 3, 'salida', 2, 'Venta', '2025-02-22 18:00:00', 1, 9000),

(1, 4, 'entrada', 12, 'Compra', '2025-02-24 08:50:00', 1, 14400),
(1, 4, 'salida', 6, 'Venta', '2025-02-26 13:00:00', 1, 7200),

(1, 5, 'entrada', 4, 'Stock nuevo', '2025-02-27 17:00:00', 1, 28000),
(1, 5, 'salida', 1, 'Venta', '2025-03-01 09:00:00', 1, 7000),

(1, 6, 'entrada', 5, 'Ingreso', '2025-03-02 11:20:00', 1, 75000),
(1, 6, 'salida', 1, 'Venta', '2025-03-04 15:40:00', 1, 15000);

INSERT INTO movimientos_stock (empresa_id, producto_id, tipo, cantidad, descripcion, fecha, usuario_id, total) VALUES
(1, 7, 'entrada', 20, 'Stock oficina', '2025-03-05 09:00:00', 1, 90000),
(1, 7, 'salida', 7, 'Venta empresa', '2025-03-06 13:40:00', 1, 31500),

(1, 8, 'salida', 30, 'Venta mayorista', '2025-03-07 10:20:00', 1, 9000),
(1, 8, 'entrada', 50, 'Compra', '2025-03-09 16:40:00', 1, 15000),

(1, 9, 'entrada', 6, 'Ingreso textil', '2025-03-10 15:00:00', 1, 48000),
(1, 9, 'salida', 4, 'Venta', '2025-03-12 11:15:00', 1, 32000),

(1, 10, 'salida', 2, 'Venta', '2025-03-14 09:35:00', 1, 7000),
(1, 10, 'entrada', 8, 'Reposición', '2025-03-15 18:00:00', 1, 28000),

(1, 1, 'entrada', 7, 'Stock limpieza', '2025-03-16 08:55:00', 1, 10500),
(1, 2, 'salida', 8, 'Venta', '2025-03-17 17:22:00', 1, 7200);

INSERT INTO movimientos_stock (empresa_id, producto_id, tipo, cantidad, descripcion, fecha, usuario_id, total) VALUES
(1, 3, 'salida', 1, 'Venta rápida', '2025-03-18 11:40:00', 1, 4500),
(1, 4, 'entrada', 5, 'Compra ferretería', '2025-03-19 15:00:00', 1, 6000),

(1, 5, 'salida', 2, 'Venta online', '2025-03-20 12:30:00', 1, 14000),
(1, 6, 'entrada', 3, 'Ingreso mercadería', '2025-03-21 18:40:00', 1, 45000),

(1, 7, 'salida', 5, 'Venta oficina', '2025-03-22 10:10:00', 1, 22500),
(1, 8, 'entrada', 40, 'Reposición', '2025-03-23 16:55:00', 1, 12000),

(1, 9, 'salida', 2, 'Venta', '2025-03-24 14:25:00', 1, 16000),
(1, 10, 'entrada', 4, 'Ingreso proveedor', '2025-03-25 09:20:00', 1, 14000),

(1, 1, 'salida', 6, 'Venta', '2025-03-26 17:11:00', 1, 9000),
(1, 2, 'entrada', 10, 'Compra mercadería', '2025-03-27 13:10:00', 1, 9000);










DELIMITER $$

CREATE TRIGGER tr_actualizar_stock_despues_insert
AFTER INSERT ON movimientos_stock
FOR EACH ROW
BEGIN
    IF LOWER(NEW.tipo) = 'entrada' THEN
        UPDATE productos 
        SET stock = stock + NEW.cantidad
        WHERE id = NEW.producto_id;

    ELSEIF LOWER(NEW.tipo) = 'salida' THEN
        UPDATE productos 
        SET stock = stock - NEW.cantidad
        WHERE id = NEW.producto_id;
    END IF;
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER tr_movimiento_update
AFTER UPDATE ON movimientos_stock
FOR EACH ROW
BEGIN
    -- Revertir movimiento anterior
    IF LOWER(OLD.tipo) = 'entrada' THEN
        UPDATE productos
        SET stock = stock - OLD.cantidad
        WHERE id = OLD.producto_id;

    ELSEIF LOWER(OLD.tipo) = 'salida' THEN
        UPDATE productos
        SET stock = stock + OLD.cantidad
        WHERE id = OLD.producto_id;
    END IF;

    -- Aplicar nuevo movimiento
    IF LOWER(NEW.tipo) = 'entrada' THEN
        UPDATE productos
        SET stock = stock + NEW.cantidad
        WHERE id = NEW.producto_id;

    ELSEIF LOWER(NEW.tipo) = 'salida' THEN
        UPDATE productos
        SET stock = stock - NEW.cantidad
        WHERE id = NEW.producto_id;
    END IF;
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER tr_movimiento_delete
AFTER DELETE ON movimientos_stock
FOR EACH ROW
BEGIN
    IF LOWER(OLD.tipo) = 'entrada' THEN
        UPDATE productos
        SET stock = stock - OLD.cantidad
        WHERE id = OLD.producto_id;

    ELSEIF LOWER(OLD.tipo) = 'salida' THEN
        UPDATE productos
        SET stock = stock + OLD.cantidad
        WHERE id = OLD.producto_id;
    END IF;
END $$

DELIMITER ;

SHOW TRIGGERS;

