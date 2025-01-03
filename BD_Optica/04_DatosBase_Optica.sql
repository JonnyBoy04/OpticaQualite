-- ---------------------------------------------------------------- --
-- Archivo: 04_DatosBase_Optica.sql                                 -- 
-- Version: 1.0                                                     --
-- Autor:   Miguel Angel Gil Rios   								--
-- Email:   angel.grios@gmail.com / mgil@utleon.edu.mx              --
-- Fecha de elaboracion: 29-12-2021                                 --
-- ---------------------------------------------------------------- --

USE optiqalumnos;

-- Insercion del Usuario Raiz (Administrador):
CALL insertarEmpleado('Administrador', '-', '-', 'O', '01/01/1901', -- Datos Personales
                      '', '', '', '', '', '', '', '', '', '',
                      'Administrador', '', 'Administrador',         -- Datos de Seguridad
                      @out1, @out2, @out3, @out4, @out5); -- Parametros de salida
                      
-- Insercion de Catalogos Base

INSERT INTO tipo_mica (nombre, precioCompra, precioVenta)
VALUES 
('Bifocal delgado', 15.00, 30.00),
('Monofocal delgado', 10.00, 20.00),
('Progresivo delgado', 25.00, 50.00),
('Bifocal solar', 20.00, 40.00),
('Monofocal solar', 12.00, 24.00),
('Progresivo solar', 30.00, 60.00),
('Bifocal luz azul', 18.00, 36.00),
('Monofocal luz azul', 11.00, 22.00),
('Progresivo luz azul', 27.00, 54.00),
('Monofocal botella', 8.00, 16.00);

                    
                    
INSERT INTO material (nombre, precioCompra, precioVenta)
VALUES 
('Cristal Transparente', 5.00, 10.00),
('Cristal anti', 7.00, 14.00),
('Polarizado', 10.00, 20.00),
('Policarbonato', 8.00, 16.00),
('Plastico', 3.00, 6.00),
('PlasticoPolarizado', 5.00, 10.00),
('PlasticoCarbonato', 6.00, 12.00),
('Cristalpolarizado', 12.00, 24.00),
('Cristalcarbonato', 9.00, 18.00),
('Normal', 4.00, 8.00);
                    
INSERT INTO tratamiento(nombre, precioCompra, precioVenta)
VALUES
('Antireflejante premium', 50.00, 100.00),
('Anti blue', 30.00, 60.00),
('Tinte', 20.00, 40.00),
('Polarizado', 60.00, 120.00),
('Comun', 10.00, 20.00),
('Doble tinte', 25.00, 50.00),
('Entintado rojo', 15.00, 30.00),
('Entintado azul', 15.00, 30.00),
('Entintado morado', 15.00, 30.00),
('Entintado rosa', 15.00, 30.00);	
-- Insertar empleados                        
CALL insertarEmpleado('Pedro', 'Morales', 'Acocer', 'M', '30/01/2002', -- Datos Personales
                      'Andres Guevara', '225', 'Hidalgo', '37500', 'León', 'Guanajuato', '47779875', '477564978', 'palcocer@optoq.com','MOAP880326XXX',
                      'pmorales', '123456', 'Administrador',         -- Datos de Seguridad
                      @out1, @out2, @out3, @out4, @out5); -- Parametros de salida
                      
CALL insertarEmpleado('Simón Jonathan', 'Zendejas', 'Gutierrez', 'M', '26/12/2002', -- Datos Personales
                      'Santa Ines', '113', 'Hacienda Arriba', '37696', 'León', 'Guanajuato', '6745638764', '4779074784', 'simonzdjgtz@gmail.com','ZEGS880326XXX',
                      'sjonathan', '56964', 'Administrador',         -- Datos de Seguridad
                      @out1, @out2, @out3, @out4, @out5); -- Parametros de salida

CALL insertarEmpleado('Juan', 'Perez', 'Garcia', 'M', '01/01/1980',
					  'Colonia Centro', '123', 'Calle Principal', '37000', 'Ciudad', 'Estado', '8673674578', '4778974563', 'juan.perez@gmail.com','PEJG800101XXX',
				 	  'jperez', '1234', 'Empleado',
					  @out1, @out2, @out3, @out4, @out5);

CALL insertarEmpleado('Maria', 'Sanchez', 'Lopez', 'F', '02/02/1985',
					  'Colonia Norte', '456', 'Calle Secundaria', '37001', 'Ciudad', 'Estado', '4673846578', '4778975648', 'maria.sanchez@gmail.com','SALM850202XXX',
					  'msanchez', '5678', 'Empleado',
					  @out1, @out2, @out3, @out4, @out5);

CALL insertarEmpleado('Pedro', 'Garcia', 'Martinez', 'M', '03/03/1990',
					  'Colonia Sur', '789', 'Calle Terciaria', '37002', 'Ciudad', 'Estado', '4627436784', '4774576365', 'pedro.garcia@gmail.com','GAMP900303XXX',
					  'pgarcia', '9101', 'Empleado',
					  @out1, @out2, @out3, @out4, @out5);

CALL insertarEmpleado('Ana', 'Martinez', 'Rodriguez', 'F', '04/04/1995',
					  'Colonia Este', '321', 'Calle Cuarta', '37003', 'Ciudad', 'Estado', '7834634567', '4778923756', 'ana.martinez@gmail.com','MARA950404XXX',
					  'amartinez', '1314', 'Empleado',
					  @out1, @out2, @out3, @out4, @out5);

CALL insertarEmpleado('Carlos', 'Rodriguez', 'Gonzalez', 'M', '05/05/2000',
					  'Colonia Oeste', '654', 'Calle Quinta', '37004', 'Ciudad', 'Estado', '9846735467', '4771813731', 'carlos.rodriguez@gmail.com','ROGC000505XXX',
					  'crodriguez', '1516', 'Empleado',
					  @out1, @out2, @out3, @out4, @out5);


-- Insertar accesorios
CALL insertarAccesorio('','Estuche Protector','Chums',150,300,50,@out1,@out2,@out3);

CALL insertarAccesorio('', 'Paño de Microfibra', 'LensPen', 50, 100, 200, @out1, @out2, @out3);

CALL insertarAccesorio('', 'Estuche de Lentes', 'Oakley', 80, 160, 100, @out1, @out2, @out3);

CALL insertarAccesorio('', 'Correa para Lentes', 'Croakies', 60, 120, 75, @out1, @out2, @out3);

CALL insertarAccesorio('', 'Spray Limpiador de Lentes', 'Zeiss', 70, 140, 90, @out1, @out2, @out3);

CALL insertarAccesorio('', 'Clip para Lentes', 'Fintie', 30, 60, 50, @out1, @out2, @out3);


-- Insertar clientes
CALL insertarCliente('Karla Edith','Ortiz','','F','11/08/2002','Priv. Jacaranda',114,'La patiña',37655,'León','Guanajuato','8796785646','477183731',
					 'karla@gmail.com','ORGK880326XXX',@out1,@out2,@out3);
                     
CALL insertarCliente('Juan Manuel','Sánchez','García','M','01/12/1999','Calle del Sol',25,'El Paraíso',38125,'Monterrey','Nuevo León','8128385512','467812345',
					 'juanm_sg@hotmail.com','SJMG990112XXX',@out1,@out2,@out3);

CALL insertarCliente('María Elena','Rodríguez','Martínez','F','03/05/2001','Av. Las Flores',5,'Las Américas',31235,'Guadalajara','Jalisco','8738754854','456789012',
					 'mariaelena@outlook.com','RMMR0105XXXXX',@out1,@out2,@out3);

CALL insertarCliente('Diego Alejandro','Hernández','Pérez','M','07/02/1998','Calle de la Luna',15,'El Refugio',31258,'Puebla','Puebla','8698512345','478451236',
					 'diegoa_hp@gmail.com','HPDA980207XXX',@out1,@out2,@out3);

CALL insertarCliente('Ana Sofía','González','Ruiz','F','06/09/2000','Av. de los Pájaros',13,'El Bosque',31754,'Tijuana','Baja California','8185638654','479613528',
					 'anasofia@yahoo.com','GARU000609XXX',@out1,@out2,@out3);

CALL insertarCliente('Roberto Carlos','Díaz','Gutiérrez','M','08/11/1997','Calle de las Estrellas',20,'Los Alamos',31269,'Querétaro','Querétaro','8589764312','478541236',
					 'roberto_dg@hotmail.com','DGRC971108XXX',@out1,@out2,@out3);

CALL insertarCliente('Laura Isabel','Martínez','Hernández','F','12/04/1996','Av. de los Jardines',30,'El Jardín',31785,'Ciudad de México','Distrito Federal','8684512321','479617854',
					 'laura_mh@gmail.com','MHMI960412XXX',@out1,@out2,@out3);


-- Insertar soluciones
CALL insertarSolucion('','Solución desinfectante','Opti-free',150,350,50,@out1,@out2,@out3);

CALL insertarSolucion('', 'Solución limpiadora', 'Bausch & Lomb', 70, 200, 100, @out1, @out2, @out3);

CALL insertarSolucion('', 'Solución desinfectante', 'ReNu', 80, 220, 120, @out1, @out2, @out3);

CALL insertarSolucion('', 'Solución limpiadora', 'Opti-free', 90, 250, 150, @out1, @out2, @out3);

CALL insertarSolucion('', 'Solución desinfectante', 'Clear Care', 100, 280, 200, @out1, @out2, @out3);

CALL insertarSolucion('', 'Solución limpiadora', 'Complete', 60, 180, 80, @out1, @out2, @out3);

CALL insertarSolucion(null,'HAJSH','Ojito',24.5,25.5,1, @out1,  @out2 , @out3);
CALL insertarSolucion(null,'HAJSH','Ojito',24.5,25.5,1, @out1,  @out2 , @out3);
CALL insertarSolucion(null,'HAJSH','Ojito',24.5,25.5,1, @out1,  @out2 , @out3);
CALL insertarSolucion(null,'HAJSH','Ojito',24.5,25.5,1, @out1,  @out2 , @out3);
CALL insertarSolucion(null,'HAJSH','Ojito',24.5,25.5,1, @out1,  @out2 , @out3);
CALL insertarSolucion(null,'HAJSH','Ojito',24.5,25.5,1, @out1,  @out2 , @out3);

-- insertar armazones
CALL insertarArmazon('Saint Laurent Eyewear','Optic',220,500,20,'SLE12','Negro','150-100',
					 'Diseño de montura: Animal print. Material de varilla: Mezcla de materiales.','/9j/4AAQSkZJRgABAQEASABIAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAEAAQADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKK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+rS/BH9oqHSl0wfEnQdMg1DRPGENmoTSrb4keFEmsV157GPNrbeIrDUdN8R22niGyludSs7OwsrT9vqK0pVatGaqUpypyXWLtdb2l3XkZVqNOvB06sFOD6NX+a7M/wA2z4qf8EKv+Crf7L3iS71jwP8ADm6+JNno80k+k/ED9n7x5b3eoXEUMrvDdQ6DqN34c8b2N6x2s1rDpmoGItGomnEe6JfB/wDwVp/4LD/sT+R4T+Ifi/4tadY2Gy2j8P8A7Sfwuv8AWlEcDGMRW3ibxtoNvr8se7dGrWuvOjJGIlk8pSp/0jyisckZPr7c4HuBkkZzzzWXqWg6RrVtLY6zp9lq9hP/AK2x1Oztb6zdR0SS3uYZIpFB5AkVzkk5OF2+v/bXO4/WMDh6+6k1Hler396TVvJI8pZT7H/dsViKaV7Rc1y2dm9FGPXbysj+BTRP+Doz9u2CDyr7wl+zzrkyqublvC3iG0kJ4GTBY+MvKwxPXcMEgCMZ4r6t/wAHQH7et0rR2Ogfs/6E0mTHJF4O1a8aPb2CX/i8pIckcHp0yK/tw179i79kPxTcyXniX9mD4Aa7dy5Mtzqvwg8A3s8jEglnmuNAklLcdS/c+tVtF/Yh/Y48OXCXWgfssfs9aRcRsHSWw+Dvw/t5FYHO5ZI/D6yBhzghwBnOCaX9o5be/wDY9O/f2nXTpt0/JaITy/MHtmEkr/3npp6Xenlrqf5/vjb/AIKU/wDBWT/gobI3w78OeL/jB460rU3ktbrwR+z34F1Hw9o1zHcHy3tdevPh7pFpeXNi0cu24s/EniG806a3k23cflCRq+vP2Mf+DdP9r748+K9K8SftViP9nD4Qx3SahqumyarpPiD4t+KLeU757HRNE0u51PRvCLXmCtxq+vajJeWfyyRaBdTKPL/vR0nw9oegWcen6Fo+l6JYRbRFZaRp9rptpEFVFUJbWcUMC7VRVXbGNqgKBtGK1VQKSR3JOP8AeIJ65OeOxAx1GQDRLOpqnKGFw9PCKas+VKUul3dJWdlZb2tccMn5pqWLxVTFRVmoSSUW+0k+Ztd9Vf8APyn4GfBP4cfs6/CnwR8F/hL4ZtPCPw++H2g2Xh/w5olnufyrW1jHm3d5dSO8+oarqNy01/q+p3TyXmo6ncXd7cyyyztI3rNFFeK223KTcpSd5Serk3bVvvpY9mMVCKjFKMYpJJKySWySCiiigYUUUUAFFFFABRRRQAUUUUAFFFFABRjPUZ/CiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/2Q==',
                     @ou1,@out2,@out3);

CALL insertarArmazon('Armazon1', 'Marca1', 10.0, 20.0, 100, 'Modelo1', 'Negro', '100x50x20', 'Descripción del armazón 1', 'ruta/a/la/fotografia1.png', @out1, @out2, @out3);
CALL insertarArmazon('Armazon2', 'Marca2', 20.0, 30.0, 200, 'Modelo2', 'Rojo', '90x45x18', 'Descripción del armazón 2', 'ruta/a/la/fotografia2.png', @out1, @out2, @out2);
CALL insertarArmazon('Armazon3', 'Marca3', 30.0, 40.0, 300, 'Modelo3', 'Verde', '80x40x16', 'Descripción del armazón 3', 'ruta/a/la/fotografia3.png', @out1, @out2, @out2);
CALL insertarArmazon('Armazon4', 'Marca4', 40.0, 50.0, 400, 'Modelo4', 'Azul', '70x35x14', 'Descripción del armazón 4', 'ruta/a/la/fotografia4.png', @out1, @out2, @out2);
CALL insertarArmazon('Armazon5', 'Marca5', 50.0, 60.0, 500, 'Modelo5', 'Amarillo', '60x30x12', 'Descripción del armazón 5', 'ruta/a/la/fotografia5.png', @out1, @out2, @out2);
CALL insertarArmazon('Armazon6', 'Marca6', 60.0, 70.0, 600, 'Modelo6', 'Naranja', '50x25x10', 'Descripción del armazón 6', 'ruta/a/la/fotografia6.png', @out1, @out2, @out2);
CALL insertarArmazon('Armazon7', 'Marca7', 70.0, 80.0, 700, 'Modelo7', 'Morado', '40x20x8', 'Descripción del armazón 7', 'ruta/a/la/fotografia7.png', @out1, @out2, @out2);
CALL insertarArmazon('Armazon8', 'Marca8', 80.0, 90.0, 800, 'Modelo8', 'Café', '30x15x6', 'Descripción del armazón 8', 'ruta/a/la/fotografia8.png', @out1, @out2, @out2);


-- insertar Lentes de contacto
CALL insertarLC('', 'Gaspermeables', 'Clarity', 60, 180, 80, 12.99,  'Fotografia',@out1, @out2, @out3);
CALL insertarLc('', 'Lente de contacto anual', 'Marca 5', 24.99, 49.99, 10, 6, 'Fotografía larga que excede el límite de 64 caracteres permitidos en la tabla de base de datos para la columna de fotografia.',@out1, @out2, @out3);
CALL insertarLc('', 'Lente de contacto quincenal', 'Marca 4', 12.50, 24.99, 25, 7, 'Fotografía del lente de contacto.',@out1, @out2, @out3);
CALL insertarLc('', 'Lente de contacto semanal', 'Marca 3', 8.99, 19.99, 75, -5, 'Fotografía del lente de contacto.',@out1, @out2, @out3);
CALL insertarLc('', 'Lente de contacto mensual', 'Marca 2', 15.75, 29.99, 50, 7, 'Fotografía del lente de contacto.',@out1, @out2, @out3);
CALL insertarLc('', 'Lente de contacto diario', 'Marca 1', 10.50, 19.99, 100, 8, 'Fotografía del lente de contacto.',@out1, @out2, @out3);

INSERT INTO graduacion (esferaod, esferaoi, cilindrood, cilindrooi, ejeoi, ejeod, dip)
VALUES (1.25, -0.75, 0, 0, 180, 180, '65 / 65');

INSERT INTO graduacion (esferaod, esferaoi, cilindrood, cilindrooi, ejeoi, ejeod, dip)
VALUES 
    (0.5, 0.5, 0, 0, 180, 180, '63 / 63'),
    (-1.25, -1.25, 0, 0, 170, 170, '62 / 62'),
    (1.0, -1.0, 0, 0, 175, 175, '64 / 64');
    
INSERT INTO examen_vista (clave, idEmpleado, idCliente, idGraduacion, fecha)
	VALUES	(RAND() * 1000000000000,1,1,1,NOW()),
			(RAND() * 1000000000000,2,2,2,NOW()),
			(RAND() * 1000000000000,3,3,3,NOW()),
			(RAND() * 1000000000000,4,4,1,NOW()),
			(RAND() * 1000000000000,4,4,2,NOW()),
			(RAND() * 1000000000000,5,5,3,NOW()),
			(RAND() * 1000000000000,6,6,1,NOW()),
			(RAND() * 1000000000000,7,7,2,NOW()),
			(RAND() * 1000000000000,7,2,2,NOW()),
			(RAND() * 1000000000000,6,3,3,NOW()),
			(RAND() * 1000000000000,5,4,2,NOW()),
			(RAND() * 1000000000000,4,4,1,NOW()),
			(RAND() * 1000000000000,3,5,3,NOW()),
			(RAND() * 1000000000000,2,6,2,NOW()),
			(RAND() * 1000000000000,1,7,1,NOW()),
			(RAND() * 1000000000000,2,1,1,NOW());


