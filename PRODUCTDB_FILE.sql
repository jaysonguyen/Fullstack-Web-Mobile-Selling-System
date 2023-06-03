--PRODUCT 
-- INSERT TYPE PRODUCT
CREATE OR ALTER PROC sp_insert_type_product 
(
@name_type nvarchar(25))
as
begin
	declare @type_id int;
	set @type_id = 1;
	while exists (select ID_PRODUCT_TYPE from PRODUCT_TYPE where ID_PRODUCT_TYPE = @type_id)
		set @type_id = @type_id + 1
	if exists (select* 
				from PRODUCT_TYPE
				where NAME_PRODUCT_TYPE like @name_type
				)
					Raiserror('Type of product is exsits', 16, 1);
	else 
		insert into product_type(ID_PRODUCT_TYPE, NAME_PRODUCT_TYPE, type_status)
						values(@type_id, @name_type, 0);
end

select*
from PRODUCT_TYPE

update PRODUCT_TYPE




exec sp_insert_type_product N'Điện thoại'
exec sp_insert_type_product N'Máy tính bảng'
exec sp_insert_type_product N'Laptop'
exec sp_insert_type_product N'Phụ kiện'
exec sp_insert_type_product N'Dịch Vụ'




--INSERT PRODUCT

exec sp_insert_product 'Iphone 14 pro', '', 1, '', 'Black', '#000', 'A17', '256G', 19000000

alter PROC sp_insert_product
(
@product_name nvarchar(1000), 
@product_desc nvarchar(1000), 
@id_type_product int,  
@IMAGE_SIG TEXT,
@color_name varchar(100), 
@color_hexa_code varchar(8),
@CPU nvarchar(100), 
@STORAGE nvarchar(100),  
@price int
)
as
begin
	declare @product_id int;
	set @product_id = 1;
	while exists (select ID_PRODUCT from PRODUCT where ID_PRODUCT = @product_id)
		set @product_id = @product_id + 1 
		insert into PRODUCT(ID_PRODUCT, PRODUCT_NAME, PRODUCT_DESC, ID_TYPE_PRODUCT, IMAGE_SIG, proStatus)
						values(@product_id, @product_name, @product_desc, @id_type_product, @IMAGE_SIG, 0);
	declare @color_id int;
	set @color_id = 1;
	while exists (select ID_COLOR from COLOR where ID_COLOR = @color_id)
		set @color_id = @color_id + 1 
		insert into COLOR(ID_COLOR, COLOR_NAME, COLOR_HEXA_CODE, ID_PRODUCT)
						values(@color_id, @color_name, @color_hexa_code, @product_id);
	declare @id_hardware_conf int;
	set @id_hardware_conf = 1;
	while exists (select ID_HARDWARE_CONFIGURATION from HARDWARE_CONFIGURATION where ID_HARDWARE_CONFIGURATION = @id_hardware_conf)
		set @id_hardware_conf = @id_hardware_conf + 1
		insert into HARDWARE_CONFIGURATION(ID_HARDWARE_CONFIGURATION,  CPU, STORAGE, ID_PRODUCT)
						values(@id_hardware_conf, @CPU, @STORAGE, @product_id);
	declare @idDetail int;
	set @idDetail = 1;
	while exists (select ID_DETAILS from PRODUCT_DETAIL where ID_DETAILS = @idDetail)
		set @idDetail = @idDetail + 1
	if exists (select* 
				from PRODUCT_DETAIL
				where ID_COLOR like @color_id
				AND ID_PRODUCT LIKE @product_id
				)
				RAISERROR('DU LIEU DA TON TAI', 16, 1)
	else
		insert into PRODUCT_DETAIL(ID_DETAILS, ID_COLOR, ID_PRODUCT, Import_date, ID_Hardware, price)
			values (@idDetail, @color_id, @product_id, getdate(), @id_hardware_conf, @price);

end


ALTER PROC sp_insert_color
(
@color_name varchar(100), 
@color_hexa_code varchar(8), @idProduct int)
as
begin
	declare @color_id int;
	set @color_id = 1;
	while exists (select ID_COLOR from COLOR where ID_COLOR = @color_id)
		set @color_id = @color_id + 1 
		insert into COLOR(ID_COLOR, COLOR_NAME, COLOR_HEXA_CODE, ID_PRODUCT)
						values(@color_id, @color_name, @color_hexa_code, @idProduct);
end


-- INSERT_IMAGE
create PROC sp_insert_image
(  
@image_link text, 
@id_valid bit, @desc text, @idColor int, @idProduct int)
as
begin
	declare @id_image int;
	set @id_image = 1;
	while exists (select ID_IMAGE from IMAGE_PRODUCT where ID_IMAGE = @id_image)
		set @id_image = @id_image + 1 
		insert into IMAGE_PRODUCT(ID_IMAGE, IMAGE_LINK, IMAGE_DESC, ID_PRODUCT, ID_COLOR)
				values(@id_image, @image_link, @desc, @idProduct, @idColor);
end


--INSERT COLOR PRODUCT
create or alter PROC sp_insert_product_detail (@id_color int,
@id_product int, 
@idHardWare int, 
@id_image int, 
@quantity int, 
@date date, 
@price int)
as
begin
	declare @idD int;
	set @idD = 1;
	while exists (select ID_DETAILS from PRODUCT_DETAIL where ID_DETAILS = @idD)
		set @idD = @idD + 1 
	if exists (select* 
				from PRODUCT_DETAIL
				where ID_COLOR like @id_color
				AND ID_PRODUCT LIKE @id_product
				)
				RAISERROR('DU LIEU DA TON TAI', 16, 1)
	else
		insert into PRODUCT_DETAIL(ID_DETAILS, ID_COLOR, ID_PRODUCT, Quantity, Import_date, ID_Hardware,id_image, price)
			values (@idD, @id_color, @id_product, @quantity, @date, @idHardWare, @id_image, @price);
end

exec sp_insert_product_detail 8, 4, 2, 1, 10, '', 4900000

-- INSERT CONFIGURATION
create PROC sp_insert_hardware_configuration
(
@CPU nvarchar(100), 
@STORAGE nvarchar(100),
@PRODUCT_EXTENSION NVARCHAR(1000), 
@PRODUCT_CONNECT NVARCHAR(1000), 
@PRODUCT_SCREEN NVARCHAR(1000), @ID_PRODUCT int)
as
begin
	declare @id_hardware_conf int;
	set @id_hardware_conf = 1;
	while exists (select ID_HARDWARE_CONFIGURATION from HARDWARE_CONFIGURATION where ID_HARDWARE_CONFIGURATION = @id_hardware_conf)
		set @id_hardware_conf = @id_hardware_conf + 1
		insert into HARDWARE_CONFIGURATION(ID_HARDWARE_CONFIGURATION,  CPU, STORAGE, PRODUCT_EXTENSION, PRODUCT_CONNECT, PRODUCT_SCREEN, ID_PRODUCT)
						values(@id_hardware_conf, @CPU, @STORAGE, @PRODUCT_EXTENSION, @PRODUCT_CONNECT, @PRODUCT_SCREEN, @ID_PRODUCT);
end



create PROC sp_insert_accessory (
@price int,  
@accessory_name nvarchar(1000))
as
begin
	declare @id int;
	set @id = 1;
	while exists (select ID_ACCESSORY from ACCESSORY where ID_ACCESSORY = @id)
		set @id = @id + 1 
	if exists (select* from ACCESSORY where ACCESSORY_NAME = @accessory_name)
		raiserror('San pham da ton tai', 16, 1);
	else 
		insert into ACCESSORY(ID_ACCESSORY, PRICE, ACCESSORY_NAME)
						values(@id, @price, @accessory_name)
		
end






--GET

create proc sp_get_infor_product
as
begin
	select product_name, price, image_sig, color_hexa_code, product.id_product
	from product
	join product_detail on product_detail.id_product = product.id_product
	join color on color.id_product = product.id_product
end

create proc sp_get_product_type
as
begin	
	select product_type.id_product_type, name_product_type
	from product_type
	join product on product_type.id_product_type = product.id_type_product
	order by product_type.id_product_type asc 
end

create proc sp_get_image_product
as
begin	
	select*
	from image_product
end

create proc sp_get_color_product
as
	select*
	from color_product
	order by id_product asc


alter PROC sp_get_product_name_price
as
begin
	select product.id_product, price, image_sig, product_name, id_type_product, PRODUCT_DESC
	from product
	join product_detail dt on dt.id_product = product.id_product
	ORDER by product.id_product DESC
end


create PROC sp_get_color
as
begin
	SELECT PRODUCT.ID_PRODUCT, COLOR_HEXA_CODE
	FROM PRODUCT
	JOIN COLOR ON COLOR.ID_PRODUCT = PRODUCT.ID_PRODUCT
end


select*
from color


select*
from HARDWARE_CONFIGURATION

alter proc sp_get_hardware_byId @id int
as
	select CPU, STORAGE, ID_HARDWARE_CONFIGURATION, priceStorage
	from hardware_configuration
	left join product on hardware_configuration.ID_PRODUCT = product.ID_Product
	where hardware_configuration.ID_PRODUCT = @id

exec sp_get_hardware_byId 11

create proc get_one_product_infor @id int
as
begin 
	select PRODUCT.ID_PRODUCT, PRODUCT_NAME, PRODUCT_DESC, ID_TYPE_PRODUCT, BRAND, IMAGE_SIG, ID_COLOR, ID_HARDWARE IMPORT_DATE, PRICE
	from PRODUCT
	JOIN product_detail on product_detail.ID_PRODUCT = PRODUCT.ID_PRODUCT
	where PRODUCT.ID_PRODUCT = @id
end

exec get_one_product_infor 11

--DELETE


create proc sp_delete_slider @id int
as
begin	
	delete from SLIDER where ID_SLIDER = @id
end


--DELETE TYPPE

create proc sp_delete_type_product @id int
as
begin
	delete from PRODUCT_TYPE where ID_PRODUCT_TYPE = @id
end

--DELTE IMAGE
create proc sp_delete_image_product @id int
as
begin
	delete from image_product where ID_IMAGE = @id
end

exec sp_delete_image_product 6
--END

-- DELETE COLOR PRODUCT

create proc sp_delete_color_product @idcolor int, @idproduct int
as
begin	
	delete from color_product where id_color = @idcolor and id_product = @idproduct
end



 -- DELETE PRODCUT
 CREATE PROC sp_delete_product @id INT
AS
BEGIN
	DELETE FROM PRODUCT WHERE ID_PRODUCT = @id
END

-- DELETE HARDWARE
CREATE PROC sp_delete_hardware @id int
AS
BEGIN 
	DELETE FROM HARDWARE_CONFIGURATION WHERE ID_HARDWARE_CONFIGURATION = @id
END


--DELETE COLOR
create proc sp_delete_color @id int
as
begin 
	delete from color where id_color = @id
end

--UPDATE

-- UPDATE PRODUCT
create or alter PROC sp_update_product @id int, @name  nvarchar(max), @desc nvarchar(max), @idType int, @is_valid bit
as
	Update PRODUCT 
	SET PRODUCT_DESC = @desc, ID_TYPE_PRODUCT = @idType, proStatus = @is_valid, PRODUCT_NAME = @name
	WHERE ID_PRODUCT = @id


-- Update Type product
 create proc sp_update_type_product @id int ,@typename nvarchar(1000), @desc nvarchar(1000)
 as
 begin
	update product_type
	set NAME_PRODUCT_TYPE = @typename
	where ID_PRODUCT_TYPE = @id
end

 
--END
 -- Update Image product
 create proc sp_update_image_product @id_image int, @imageLink text, @desc text, @idProc int, @idColor int
 as
 begin
	update image_product
	set image_link = @imageLink, IMAGE_DESC = @desc, ID_PRODUCT = @idProc, ID_COLOR = @idColor
	where ID_IMAGE = @id_image
end




 -- UPDATE COLOR
select*
from color
create proc sp_update_color @id int, @name varchar(100), @hex_code varchar(8), @valid bit
as
begin 
	update color 
	set COLOR_NAME = @name, COLOR_HEXA_CODE = @hex_code, is_valid = @valid
	where ID_COLOR = @id
end

-- UPdate HARDWARE
create PROC sp_update_hardware @id int, @cpu nvarchar(max), @storage varchar(max), @extension nvarchar(max), @connect nvarchar(max), @screen nvarchar(100), @id_proc int
as
	Update HARDWARE_CONFIGURATION 
	SET CPU = @cpu, STORAGE = @storage, PRODUCT_EXTENSION = @extension, PRODUCT_CONNECT = @connect, PRODUCT_SCREEN = @screen, ID_PRODUCT = @id_proc
	WHERE ID_HARDWARE_CONFIGURATION = @id


select*
from product

update product
set image_sig = 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-yellow?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1676505836714'
where ID_PRODUCT > 3



insert into color(ID_COLOR, COLOR_NAME, COLOR_HEXA_CODE, ID_PRODUCT)
values (12, 'Xam', '#cdcdcd', 11);



insert into HARDWARE_CONFIGURATION values(12, 11, 'A17', '', '', '', '512GB', 35000000);