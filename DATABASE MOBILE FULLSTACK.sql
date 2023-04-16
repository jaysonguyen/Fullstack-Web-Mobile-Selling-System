
CREATE TABLE PRODUCT(
	ID_PRODUCT INT NOT NULL PRIMARY KEY,
	ID_TYPE_PRODUCT INT FOREIGN KEY REFERENCES PRODUCT_TYPE(ID_PRODUCT_TYPE),
	PRODUCT_NAME NVARCHAR(1000) NOT NULL,
	PRODUCT_DESC NVARCHAR(1000),
	PRODUCT_MODEL_NO VARCHAR(20),
	BRAND nvarchar(100),
	IMAGE_SIG TEXT
);	

CREATE TABLE IMAGE_PRODUCT (
	ID_IMAGE INT PRIMARY KEY,
	IMAGE_LINK TEXT,
	Image_desc nvarchar(100),
	ID_COLOR int foreign key references COLOR(ID_COLOR),
	ID_PRODUCT  int foreign key references PRODUCT(ID_PRODUCT)
);
CREATE TABLE COLOR(
	ID_COLOR INT PRIMARY KEY NOT NULL,
	COLOR_NAME VARCHAR(100),
	COLOR_HEXA_CODE VARCHAR(8),
	ID_PRODUCT int foreign key references PRODUCT(ID_PRODUCT)
);

CREATE TABLE PRODUCT_DETAIL(
	ID_COLOR INT FOREIGN KEY REFERENCES COLOR(ID_COLOR),
	ID_PRODUCT INT FOREIGN KEY REFERENCES PRODUCT(ID_PRODUCT),
	ID_HARDWARE int foreign key references HARDWARE_CONFIGURATION(ID_HARDWARE_CONFIGURATION),
	ID_IMAGE INT CONSTRAINT FK_IMAGE_ID REFERENCES IMAGE_PRODUCT(ID_IMAGE),
	QUANTITY int,
	Import_date date,
	PRICE INT
);

select*
from HARDWARE_CONFIGURATION

CREATE TABLE PRODUCT_TYPE(
	ID_PRODUCT_TYPE INT PRIMARY KEY,
	NAME_PRODUCT_TYPE NVARCHAR(1000) NOT NULL,
	PRODUCT_TYPE_DESC NVARCHAR(1000),
);
CREATE TABLE HARDWARE_CONFIGURATION(
	ID_HARDWARE_CONFIGURATION INT PRIMARY KEY NOT NULL,
	ID_PRODUCT INT CONSTRAINT FK_PRODUCT_HARDWARE FOREIGN KEY REFERENCES PRODUCT(ID_PRODUCT),
	CPU NVARCHAR(100),
	PRODUCT_EXTENSION NVARCHAR(1000),
	PRODUCT_CONNECT NVARCHAR(1000),
	PRODUCT_SCREEN NVARCHAR(1000),
	STORAGE NVARCHAR(100),
);

CREATE TABLE PROMOTION(
	ID_PROMOTION INT PRIMARY KEY NOT NULL,
	PROMOTION_NAME NVARCHAR(1000),
	EXP_DATE DATETIME,
	START_TIME DATETIME,
	PROMOTION_CONTENT TEXT,
	PROMOTION_COST SMALLINT,
	IS_VALID BIT
);
CREATE TABLE PROMOTION_PRODUCT(
	ID_PROMOTION INT FOREIGN KEY REFERENCES PROMOTION(ID_PROMOTION),
	ID_PRODUCT INT FOREIGN KEY REFERENCES PRODUCT(ID_PRODUCT),
);
CREATE TABLE ACCESSORY(
	ID_ACCESSORY INT PRIMARY KEY NOT NULL,
	PRICE INT,
	ACCESSORY_NAME NVARCHAR(100),
);
CREATE TABLE RATING(
	ID_RATING INT PRIMARY KEY,
	RATING_POINT TINYINT,
	RATING_COMMENT NVARCHAR(1000),
	ID_PRODUCT INT FOREIGN KEY REFERENCES PRODUCT(ID_PRODUCT),
);
CREATE TABLE WARE_HOUSE(
	ID_WARE_HOUSE INT PRIMARY KEY,
	IMPORT_DATE DATETIME,
	EXPORT_DATE DATETIME,
	WARE_HOUSE_ADDRESS NVARCHAR(1000),
);
CREATE TABLE PRODUCT_WAREHOUSE(
	ID_WAREHOUSE INT FOREIGN KEY REFERENCES WARE_HOUSE(ID_WARE_HOUSE),
	ID_PRODUCT INT FOREIGN KEY REFERENCES PRODUCT(ID_PRODUCT),
	QUANTITY_PRODUCT INT,
);
CREATE TABLE INVOCE_PRODUCT(
	ID_INVOCE INT FOREIGN KEY REFERENCES INVOCE(ID_INVOCE),
	PRODUCT_QUANTITY SMALLINT,
	AMOUNT INT,
	IT_PRODUCT INT FOREIGN KEY REFERENCES PRODUCT(ID_PRODUCT),
);
CREATE TABLE INVOCE(
	ID_INVOCE INT PRIMARY KEY NOT NULL,
	TOTAL INT,
	STORE_ADDRESS NVARCHAR(1000),
	ID_EMPLOYEE INT FOREIGN KEY REFERENCES EMPLOYEE(ID_EMPLOYEE),
	ID_CUSTOMER INT FOREIGN KEY REFERENCES CUSTOMER(ID_CUSTOMER),
);
CREATE TABLE EMPLOYEE(
	ID_EMPLOYEE INT PRIMARY KEY,
	EMPLOYEE_NAME NVARCHAR(1000),
	PHONE_NUMBER VARCHAR(15),
	EMPLOYEE_ADDRESS NVARCHAR(1000),
	PERSON_ID VARCHAR(15),
	EMAIL VARCHAR(1000),
);
CREATE TABLE CUSTOMER(
	ID_CUSTOMER INT PRIMARY KEY NOT NULL,
	CUSTOMER_NAME NVARCHAR(1000) NOT NULL,
	PHONE_NUMBER VARCHAR(15),
	DATE_OF_BIRTH DATETIME,
	EMAIL VARCHAR(100),
	ID_ACCOUNT INT foreign key references Account(ID_Account),
	 CUSTOMER_ADDRESS NVARCHAR(1000)
);


Create TABLE ACCOUNT(
	ID_ACCOUNT INT PRIMARY KEY,
	IS_VALID BIT,
	IS_CUSTOMER BIT,
);


CREATE TABLE PAYING(
	ID_PAYING INT PRIMARY KEY,
	PAY_METHOD NVARCHAR(100) NOT NULL,
	PAYING_STATUS BIT,
	ID_CUSTOMER INT FOREIGN KEY REFERENCES CUSTOMER(ID_CUSTOMER),
	 DATE_ORDER date,
);

drop table PAYING

alter table PAYING
drop ID_CUSTOMER

CREATE TABLE ORDER_PRODUCT(
	ID_ORDER VARCHAR(10) PRIMARY KEY,
	METHOD_RECEIVE NVARCHAR(100),
	STORE_ADDRESS NVARCHAR(100),
	OTHER_DEMAIND NVARCHAR(100),
	ORDER_STATUS NVARCHAR(30),
	DATE_ORDER date
);


CREATE TABLE SLIDER(
	ID_SLIDER INT PRIMARY KEY,
	IMAGE_LINK TEXT,
	NAME_IMAGE NVARCHAR(100),
	IMAGE_STATUS BIT,
	CONTENT NVARCHAR(MAX)
);


-- INSERT TYPE PRODUCT
ALTER PROC sp_insert_type_product 
(
@name_type nvarchar(25), 
@type_desc nvarchar(30))
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
		insert into product_type(ID_PRODUCT_TYPE, NAME_PRODUCT_TYPE, PRODUCT_TYPE_DESC)
						values(@type_id, @name_type, @type_desc);
end

exec sp_insert_type_product N'Đồng hồ',  N'Các dòng đồng hồ thông minh, hoặc đồng hồ điện tử, đồng hồ cơ'

--INSERT PAYING


ALTER PROC sp_insert_paying 
(
@PAY_METHOD smallint, 
@PAYING_STATUS bit,
@ID_CUS int)
as
begin
	declare @id int;
	set @id = 1;
	while exists (select ID_PAYING from PAYING where ID_PAYING = @id)
		set @id = @id + 1 
		insert into PAYING(ID_PAYING, PAY_METHOD, PAYING_STATUS, ID_CUSTOMER)
						values(@id, @PAY_METHOD, @PAYING_STATUS, @ID_CUS);
end

exec sp_insert_paying 1, 1, 1, '04/15/2023';
--END

--INSERT ORDER
CREATE TABLE ORDER_PRODUCT(
	ID_ORDER int PRIMARY KEY,
	METHOD_RECEIVE NVARCHAR(100),
	ORDER_STATUS NVARCHAR(30),
	email varchar(1000) 
);


CREATE TABLE PRODUCT_ORDER_DETAIL (
	ID_ORDER int constraint fk_order foreign key references ORDER_PRODUCT(ID_ORDER),
	ID_PRODUCT int constraint fk_product foreign key references PRODUCT(ID_PRODUCT),
	DATE_ORDER date,
	HW varchar(10),
	ID_ODER_PRODUCT_DETAIL int primary key,
	 COLOR varchar(10),
	 isPay bit
);






ALTER PROC sp_insert_order_detail
(@ID_ORDER NVARCHAR(100), 
@ID_PRODUCT bit, @HW varchar(10), @COLOR varchar(10))
as
begin
	declare @id int;
	set @id = 1;
	while exists (select ID_ODER_PRODUCT_DETAIL from PRODUCT_ORDER_DETAIL where ID_ODER_PRODUCT_DETAIL = @id )
		set @id = @id + 1 
		insert into PRODUCT_ORDER_DETAIL(ID_ORDER, ID_PRODUCT, DATE_ORDER, ID_ODER_PRODUCT_DETAIL, HW, COLOR, isPay)
						values(@ID_ORDER, @ID_PRODUCT, getdate(), @id, @HW, @COLOR, 1);
end



-- INSERT ORDER
ALTER PROC sp_insert_order
(
@METHOD_RECEIVE smallint,   
@ID_PRODUCT int,
@email varchar(1000), @HW varchar(10), @COLOR varchar(10)
)
as
begin
	declare @id int;
	set @id = 1;
	while exists (select ID_ORDER from ORDER_PRODUCT where ID_ORDER = @id)
		set @id = @id + 1 
	insert into ORDER_PRODUCT(ID_ORDER, METHOD_RECEIVE, ORDER_STATUS, email)
			values(@id, @METHOD_RECEIVE, 4, @email);
	exec sp_insert_order_detail @id, @ID_PRODUCT, @HW, @COLOR
end

exec sp_insert_order 1, 1, '22@gmail.com', '512G', '#000'




select* 
from ORDER_PRODUCT

select*
from product_order_detail



-- END INSERT ORDER




-- INSERT COLOR
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


select*
from product_detail

--INSERT COLOR PRODUCT
alter PROC sp_insert_product_detail @id_color int, @id_product int, @idHardWare int, @id_image int, @quantity int, @date date, @price int
as
begin
	if exists (select* 
				from PRODUCT_DETAIL
				where ID_COLOR like @id_color
				AND ID_PRODUCT LIKE @id_product
				)
				RAISERROR('DU LIEU DA TON TAI', 16, 1)
	else
		insert into PRODUCT_DETAIL(ID_COLOR, ID_PRODUCT, Quantity, Import_date, ID_Hardware,id_image, price)
			values (@id_color, @id_product, @quantity, @date, @idHardWare, @id_image, @price);
end

exec sp_insert_product_detail 8, 4, 2, 1, 10, '', 4900000

select*
from color

select*
from product_detail

select*
from product



exec sp_insert_color 'Sliver Grey macbook', '#ee1e0', 4

select*
from product_detail
exec sp_insert_product_detail 6, 1, 2, 1, 10, '', 4990000


-- INSERT_IMAGE
ALTER PROC sp_insert_image
(  
@image_link text, 
@id_valid bit, @desc text, @idColor int, @idProduct int)
as
begin
	declare @id_image int;
	set @id_image = 1;
	while exists (select ID_IMAGE from IMAGE_PRODUCT where ID_IMAGE = @id_image)
		set @id_image = @id_image + 1 
		insert into IMAGE_PRODUCT(ID_IMAGE, IMAGE_LINK, is_valid, IMAGE_DESC, ID_PRODUCT, ID_COLOR)
				values(@id_image, @image_link, @id_valid, @desc, @idProduct, @idColor);
end
exec sp_insert_image 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-gold_AV2?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660754258490', 1, 'Iphone 14 pro Gold', 5, 1

--END


select*
from image_product

alter table image_product
drop column image_desc



--proName, proDesc, idType, productModel, brand, imgSig, colorName, coLorHexa, cpu, storage, price

-- INSERT PRODUCT

exec sp_insert_product 'Iphone 13 Pro', '', 1, 'data:image/png;base64,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', N'Xanh rêu',  '#2e600f', 'A17', '256G', 29000000
ALTER PROC sp_insert_product
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
		insert into PRODUCT(ID_PRODUCT, PRODUCT_NAME, PRODUCT_DESC, ID_TYPE_PRODUCT, is_valid, IMAGE_SIG)
						values(@product_id, @product_name, @product_desc, @id_type_product, 0, @IMAGE_SIG);
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
	if exists (select* 
				from PRODUCT_DETAIL
				where ID_COLOR like @color_id
				AND ID_PRODUCT LIKE @product_id
				)
				RAISERROR('DU LIEU DA TON TAI', 16, 1)
	else
		insert into PRODUCT_DETAIL(ID_COLOR, ID_PRODUCT, Import_date, ID_Hardware, price)
			values (@color_id, @product_id, getdate(), @id_hardware_conf, @price);

end

select*
from PRODUCT_DETAIL

select*
from hardware_configuration

update product set image_sig = 'https://shopdunk.com/images/thumbs/0000647_pink_550.png' where id_product = 5
















-- INSERT EMPLOYEE
ALTER PROC sp_insert_employee
(
@employee_name nvarchar(1000), 
@phone_number int,
@address nvarchar(1000), 
@person_id int, 
@email varchar(6))
as
begin
	declare @employee_id int;
	set @employee_id = 1;
	while exists (select ID_EMPLOYEE from EMPLOYEE where ID_EMPLOYEE = @employee_id)
		set @employee_id = @employee_id + 1
		insert into EMPLOYEE(ID_EMPLOYEE, EMPLOYEE_NAME, PHONE_NUMBER, EMPLOYEE_ADDRESS, PERSON_ID, EMAIL)
						values(@employee_id, @employee_name, @phone_number, @address, @person_id, @email);
end

-- end
Create TABLE ACCOUNT(
	ID_ACCOUNT INT PRIMARY KEY,
	IS_VALID BIT,
	IS_CUSTOMER BIT,
	PASS varchar(20)
);


select*
from account


--insert account
ALTER PROC sp_insert_account
(
@isValid bit, 
@is_customer bit,
@pass varchar(20)
)
as
begin
	declare @idAcc int;
	set @idAcc = 1;
	while exists (select ID_ACCOUNT from ACCOUNT where ID_ACCOUNT = @idAcc)
		set @idAcc = @idAcc + 1
		insert into ACCOUNT(ID_ACCOUNT, IS_VALID, IS_CUSTOMER, PASS)
						values(@idAcc, @isValid, @is_customer, @pass);
end


alter proc sp_insert_account_customer
(
	@pass varchar(200),
	@customerName nvarchar(1000),
	@phoneNum varchar(15),
	@dob datetime,
	@email varchar(100)
)
as
begin
	declare @idAcc int;
	set @idAcc = 1;
	while exists (select ID_ACCOUNT from ACCOUNT where ID_ACCOUNT = @idAcc)
		set @idAcc = @idAcc + 1
	if exists (select* from CUSTOMER where EMAIL = @email)
		raiserror('San pham da ton tai', 16, 1);
	else
		insert into ACCOUNT(ID_ACCOUNT, IS_VALID, IS_CUSTOMER, PASS)
			values(@idAcc, 1, 1, @pass);
		exec sp_insert_customer @customerName, @phoneNum, @dob, @email, @idAcc
end

select*
from account

select*
from CUSTOMER

exec sp_insert_account_customer '123123', N'Nguyen Vu Thanh Nguyen', '0384295435', '05/05/2023', 'thanhnguyen@gmail.com'

-- INSERT CUSTOMER
ALTER PROC sp_insert_customer
(
@customer_name nvarchar(1000), 
@phone_number VARCHAR(15),
@dob DATETIME, @email varchar(100), @idAcc int)
as
begin
	declare @cus_id int;
	set @cus_id = 1;
	while exists (select ID_CUSTOMER from CUSTOMER where ID_CUSTOMER = @cus_id)
		set @cus_id = @cus_id + 1
	else
		insert into CUSTOMER(ID_CUSTOMER, CUSTOMER_NAME, PHONE_NUMBER, DATE_OF_BIRTH, EMAIL, ID_ACCOUNT)
				values(@cus_id, @customer_name, @phone_number, @dob, @email, @idAcc);
end



-- INSERT CART
ALTER PROC sp_insert_cart
(
@QUANTITY SMALLINT, 
@SUBTOTAL INT, 
@ORDER_TOTAL INT,
@ID_PRODUCT INT, @ID_CUSTOMER INT)
as
begin
	declare @id_cart int;
	set @id_cart = 1;
	while exists (select ID_CART from CART where ID_CART = @id_cart)
		set @id_cart = @id_cart + 1
		insert into CART(ID_CART, QUANTITY, SUBTOTAL, ORDER_TOTAL, ID_PRODUCT, ID_CUSTOMER, CREATE_AT)
						values(@id_cart, @QUANTITY, @SUBTOTAL, @ORDER_TOTAL, @ID_PRODUCT, @ID_CUSTOMER, getdate());
end


-- INSERT CONFIGURATION
ALTER PROC sp_insert_hardware_configuration
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

exec sp_insert_hardware_configuration N'Apple M2 Pro', N'Ram: 16GB Ổ cứng: 512G', N'Card màn hình: Card tích hợp - 19 nhân GPU Công nghệ âm thanh: Wide stereo sound Spatial Audio Dolby Atmos', N'HDMIJack tai nghe 3.5 mm MagSafe 3 3 x Thunderbolt 4 5.3', '16.2 inch',  4


-- INSERT SLIDER
ALTER PROC sp_insert_slider
(@image_link text, @name_image nvarchar(100), @status bit)
as
begin
	declare @id_slider int;
	set @id_slider = 1;
	while exists (select ID_SLIDER from SLIDER where ID_SLIDER = @id_slider)
		set @id_slider = @id_slider + 1
		insert into SLIDER(ID_SLIDER,  IMAGE_LINK, NAME_IMAGE, IMAGE_STATUS)
						values(@id_slider, @image_link, @name_image, @status);
end


select*
from slider
exec sp_insert_slider 'https://rb.gy/ks2onq', 'Banner homepage 2', 1
--END

-- INSERT PRODUCT TYPE
ALTER PROC sp_insert_product_type @nameType nvarchar(1000), @typeDesc nvarchar(1000)
as
begin
	declare @id int;
	set @id = 1;
	while exists (select ID_PRODUCT_TYPE from PRODUCT_TYPE where ID_PRODUCT_TYPE = @id)
		set @id = @id + 1
		insert into PRODUCT_TYPE(ID_PRODUCT_TYPE,  NAME_PRODUCT_TYPE, PRODUCT_TYPE_DESC)
						values(@id, @nameType, @typeDesc);
end

exec sp_insert_product_type N'Màn hình', N''
--END

--OK

--INSERT RATING
ALTER PROC sp_insert_product_rating @point TINYINT, @cmt nvarchar(1000), @idProc int
as
begin
	declare @id int;
	set @id = 1;
	while exists (select ID_RATING from RATING where ID_RATING = @id)
		set @id = @id + 1
		insert into RATING(ID_RATING,  RATING_POINT, RATING_COMMENT, ID_PRODUCT)
						values(@id, @point, @cmt, @idProc);
end


--INSERT ACCESSORIES
CREATE TABLE ACCESSORY(
	ID_ACCESSORY INT PRIMARY KEY NOT NULL,
	PRICE INT,
	ACCESSORY_NAME NVARCHAR(100),
	BRAND NVARCHAR(1000)
);


ALTER PROC sp_insert_accessory (
@price int,  
@accessory_name nvarchar(1000), 
@brand nvarchar(1000))
as
begin
	declare @id int;
	set @id = 1;
	while exists (select ID_ACCESSORY from ACCESSORY where ID_ACCESSORY = @id)
		set @id = @id + 1 
	if exists (select* from ACCESSORY where ACCESSORY_NAME = @accessory_name)
		raiserror('San pham da ton tai', 16, 1);
	else 
		insert into ACCESSORY(ID_ACCESSORY, PRICE, ACCESSORY_NAME, BRAND)
						values(@id, @price, @accessory_name, @brand)
		
end

exec sp_insert_accessory 1000000, 'Op lung iphone 14', 'Apple'


--END INSERT
-- GET
-- HOME PAGE

-- GET SLIDER

ALTER proc sp_get_slider
as
begin
	select image_link, id_slider, image_status
	from SLIDER
end

exec sp_get_slider
-- END GET SLIDERS

-- GET TYPE FOR NAVITAION
ALTER proc sp_get_type_navigation
as
begin 
	select name_product_type
	from PRODUCT_TYPE
end

exec sp_get_type_navigation
-- END TYPE FOR NAVITAION
SELECT*
FROM COLOR
ALTER PROC SP_GET_NAME_IMAGE_PRODUCT
AS
BEGIN
	SELECT PRODUCT_NAME, IMAGE_SIG
	FROM PRODUCT
	WHERE IMAGE_SIG IS NOT NULL

	
END

exec SP_GET_ALL_INFOR_PRODUCT



--END

-- END PRODUCT RENDER ALL


SELECT*
FROM HARDWARE_CONFIGURATION
--GET ALL COLOR
ALTER PROC sp_get_color
as
begin
	SELECT PRODUCT.ID_PRODUCT, COLOR_HEXA_CODE
	FROM PRODUCT
	JOIN COLOR ON COLOR.ID_PRODUCT = PRODUCT.ID_PRODUCT
end

exec sp_get_color
--END GET COLOR

--Get image product
alter PROC sp_get_product_name_price
as
begin
	select product.id_product, price, image_sig, product_name, id_type_product
	from product
	join product_detail dt on dt.id_product = product.id_product
end

--GET COLOR PRODUCT
alter proc sp_get_color_product
as
	select*
	from color_product
	order by id_product asc
--END GET COLOR PRODUCT  


--Get infor customer
ALTER PROC sp_get_login_inforcustomer
AS
BEGIN
	SELECT EMAIL, PHONE_NUMBER, CUSTOMER_PASSWORD, IS_VALID
	FROM CUSTOMER
END
-- END GET INFO

-- GET IMAGE
create proc sp_get_image_product
as
begin	
	select*
	from image_product
end

exec sp_get_image_product

--end


-- GET PRODUCT TYPE
alter proc sp_get_product_type
as
begin	
	select product_type.id_product_type, name_product_type
	from product_type
	join product on product_type.id_product_type = product.id_type_product
	order by product_type.id_product_type asc 
end

select*
from product

select*
from product_detail

select*
from color

select*
from product_type

update product_detail
set id_color = ''
where id_color = 6

delete from product_detail
where id_color = 6

exec sp_get_product_type
-- END

-- GET RATING
create proc sp_get_product_rating
as
	select* from rating


create proc sp_get_infor_product
as
begin
	select product_name, price, image_sig, color_hexa_code, product.id_product
	from product
	join product_detail on product_detail.id_product = product.id_product
	join color on color.id_product = product.id_product
end

--GET SLIDER
create proc sp_get_slider
as
begin
	select image_link, image_status
	from slider
end

-- GET INFO LOGIN
create proc sp_get_infor_login
as
begin
	select email, pass, is_valid, is_customer
	from customer
	right join account on customer.id_account = account.id_account
end
exec sp_get_infor_login


--GET CUSTOMER
create proc sp_get_customer_by_email @email varchar(max)
as
begin
	select*
	from customer where email = @email
end

exec sp_get_customer_by_email 'gekiiki@gmail.com'


-- GET ORDER

select ID_ORDER, CUSTOMER_NAME, PRODUCT_NAME, DATE_ORDER, PAYMENT_SATTUS

select*
from PRODUCT_ORDER_DETAIL

select*
from customer

alter table paying 
drop ID_CUSTOMER

alter table order_product
add ID_PAYING int foreign key references PAYING(ID_PAYING)


select*
from PAYING

alter proc sp_get_all_infor_order_detail 
as
begin 
	select ORDER_PRODUCT.ID_ORDER id, CUSTOMER_NAME, ORDER_STATUS, DATE_ORDER, PRODUCT_NAME, METHOD_RECEIVE, isPay
	from ORDER_PRODUCT
	inner join CUSTOMER on customer.EMAIL = ORDER_PRODUCT.email
	inner join PRODUCT_ORDER_DETAIL on PRODUCT_ORDER_DETAIL.ID_ORDER = ORDER_PRODUCT.ID_ORDER
	inner join PRODUCT on PRODUCT_ORDER_DETAIL.ID_PRODUCT = PRODUCT.ID_PRODUCT
	order by ORDER_PRODUCT.ID_ORDER asc
end

exec sp_get_all_infor_order_detail

select*
from order_product

select*
from product_order_detail

update product_order_detail set hw = '#ccc', color = '256G' where id_order = 


de

delete from order_product where id_order = 



--PRODUCT_NAME, PAY_METHOD, PAYING_STATUS



select*
from customer


-- GET ONE MOBILE

select*
from product_detail

alter proc get_one_product_infor @id int
as
begin 
	select PRODUCT.ID_PRODUCT, PRODUCT_NAME, PRODUCT_DESC, ID_TYPE_PRODUCT, is_VALID, BRAND, IMAGE_SIG, ID_COLOR, ID_HARDWARE IMPORT_DATE, PRICE
	from PRODUCT
	JOIN product_detail on product_detail.ID_PRODUCT = PRODUCT.ID_PRODUCT
	where PRODUCT.ID_PRODUCT = @id
end

exec get_one_product_infor 1

-- END Get


-- UPDATE



-- UPDATE PRODUCT
ALTER PROC sp_update_product @id int, @name  nvarchar(max), @desc nvarchar(max), @idType int, @is_valid bit
as
	Update PRODUCT 
	SET PRODUCT_DESC = @desc, ID_TYPE_PRODUCT = @idType, is_valid = @is_valid, PRODUCT_NAME = @name
	WHERE ID_PRODUCT = @id



-- UPdate HARDWARE
ALTER PROC sp_update_hardware @id int, @cpu nvarchar(max), @storage varchar(max), @extension nvarchar(max), @connect nvarchar(max), @screen nvarchar(100), @id_proc int, @price int
as
	Update HARDWARE_CONFIGURATION 
	SET CPU = @cpu, STORAGE = @storage, PRODUCT_EXTENSION = @extension, PRODUCT_CONNECT = @connect, PRODUCT_SCREEN = @screen, ID_PRODUCT = @id_proc, PRICE = @price
	WHERE ID_HARDWARE_CONFIGURATION = @id



select*
from hardware_configuration
exec sp_update_hardware 3, '123', '123', '1234', '1234', '', 1, 9999
-- END

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

-- UPDATE COLOR PRODUCT
create proc sp_update_color_product @idColor int , @idProduct int, @quantity int, @importDate date
as
begin 
	Update color_product
	set QUANTITY = @quantity, Import_date = @importDate
	where ID_COLOR = @idColor
	and ID_PRODUCT = @idProduct
end
 
 exec sp_update_color_product 4, 1, 12, '03/29/2023'
 
--END
 -- Update Image product
 select*
 from image_product
 create proc sp_update_image_product @id_image int, @imageLink text, @isValid bit, @desc text, @idProc int, @idColor int
 as
 begin
	update image_product
	set image_link = @imageLink, is_valid = @isValid, IMAGE_DESC = @desc, ID_PRODUCT = @idProc, ID_COLOR = @idColor
	where ID_IMAGE = @id_image
end

exec sp_update_image_product 6, '22', 1, '22', 1, 1
--end


-- Update Type product
 create proc sp_update_type_product @id int ,@typename nvarchar(1000), @desc nvarchar(1000)
 as
 begin
	update product_type
	set NAME_PRODUCT_TYPE = @typename, PRODUCT_TYPE_DESC = @desc
	where ID_PRODUCT_TYPE = @id
end

exec sp_update_type_product 
-- END

alter proc sp_update_rating_product @id int ,@point TINYINT, @cmt nvarchar(1000), @idproduct int
 as
 begin
	update RATING
	set RATING_POINT = @point, RATING_COMMENT = @cmt
	where ID_RATING = @id
end


exec sp_update_rating_product 1, 5, 'ngon bo re'


CREATE TABLE SLIDER(
	ID_SLIDER INT PRIMARY KEY,
	IMAGE_LINK TEXT,
	NAME_IMAGE NVARCHAR(100),
	IMAGE_STATUS BIT,
	CONTENT NVARCHAR(MAX)
);

-- update slider
create proc sp_update_slider @id int, @image_link text, @name_image nvarchar(100), @status bit
as
begin
	update SLIDER
	set IMAGE_LINK = @image_link, NAME_IMAGE = @name_image, IMAGE_STATUS = @status
	where ID_SLIDER = @id
end

exec sp_update_slider 1, 'https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/4bww7deichbrtmf8_1632729611.jpeg', '', 1



 --END UPDATE




---DELETE

 -- DELETE PRODCUT
 CREATE PROC sp_delete_product @id INT
AS
BEGIN
	DELETE FROM PRODUCT WHERE ID_PRODUCT = @id
END
-- END DELETE PRODUCT

-- DELETE HARDWARE
CREATE PROC sp_delete_hardware @id int
AS
BEGIN 
	DELETE FROM HARDWARE_CONFIGURATION WHERE ID_HARDWARE_CONFIGURATION = @id
END
-- END DELETE HARDWARE
EXEC sp_delete_product 4

--DELETE COLOR
create proc sp_delete_color @id int
as
begin 
	delete from color where id_color = @id
end

-- DELETE COLOR PRODUCT

select* 
from color_product
create proc sp_delete_color_product @idcolor int, @idproduct int
as
begin	
	delete from color_product where id_color = @idcolor and id_product = @idproduct
end

exec sp_delete_color_product 5, 1  

--DELTE IMAGE
create proc sp_delete_image_product @id int
as
begin
	delete from image_product where ID_IMAGE = @id
end

exec sp_delete_image_product 6
--END

--DELETE TYPPE

alter proc sp_delete_type_product @id int
as
begin
	delete from PRODUCT_TYPE where ID_PRODUCT_TYPE = @id
end

exec sp_delete_type_product 7
-- END


exec sp_get_product_rating
-- DELTE RATING

create proc sp_delete_rating_product @id int
as
begin
	delete from RATING where ID_RATING = @id
end

create proc sp_delete_slider @id int
as
begin	
	delete from SLIDER where ID_SLIDER = @id
end



alter proc sp_get_hardware_byId @id int
as
	select CPU, STORAGE, ID_HARDWARE_CONFIGURATION
	from hardware_configuration
	left join product on hardware_configuration.ID_PRODUCT = product.ID_Product
	where hardware_configuration.ID_PRODUCT = @id

exec sp_get_hardware_byId  7


select*
from PRODUCT_TYPE