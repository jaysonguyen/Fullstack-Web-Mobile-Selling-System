create database mobilePhoneSystemDB
use mobilePhoneSystemDB;

CREATE TABLE PRODUCT_TYPE(
	ID_PRODUCT_TYPE INT constraint pk_product_type primary key,
	NAME_PRODUCT_TYPE NVARCHAR(1000) NOT NULL,
	PRODUCT_TYPE_DESC NVARCHAR(1000),
	type_status bit,
);

CREATE TABLE PRODUCT(
	ID_PRODUCT INT NOT NULL constraint pk_product PRIMARY KEY,
	ID_TYPE_PRODUCT INT constraint fk_product_productType FOREIGN KEY REFERENCES PRODUCT_TYPE(ID_PRODUCT_TYPE) ON DELETE cascade,
	PRODUCT_NAME NVARCHAR(1000) NOT NULL,
	PRODUCT_DESC NVARCHAR(1000),
	PRODUCT_MODEL_NO VARCHAR(20),
	BRAND nvarchar(100),
	IMAGE_SIG TEXT,
	proStatus bit
);	


CREATE TABLE COLOR(
	ID_COLOR INT constraint pk_color PRIMARY KEY NOT NULL,
	COLOR_NAME VARCHAR(100),
	COLOR_HEXA_CODE VARCHAR(8),
	colorStatus bit,
	ID_PRODUCT int constraint fk_color_product foreign key references PRODUCT(ID_PRODUCT) ON Delete cascade,
);


CREATE TABLE IMAGE_PRODUCT (
	ID_IMAGE INT constraint pk_image PRIMARY KEY,
	IMAGE_LINK TEXT,
	Image_desc nvarchar(100),
	ID_COLOR int constraint fk_color_image foreign key references COLOR(ID_COLOR),
	ID_PRODUCT int constraint fk_image_product foreign key references PRODUCT(ID_PRODUCT) on delete cascade
);

CREATE TABLE HARDWARE_CONFIGURATION(
	ID_HARDWARE_CONFIGURATION INT PRIMARY KEY NOT NULL,
	ID_PRODUCT INT CONSTRAINT FK_PRODUCT_HARDWARE FOREIGN KEY REFERENCES PRODUCT(ID_PRODUCT) on delete cascade,
	CPU NVARCHAR(100),
	PRODUCT_EXTENSION NVARCHAR(1000),
	PRODUCT_CONNECT NVARCHAR(1000),
	PRODUCT_SCREEN NVARCHAR(1000),
	STORAGE NVARCHAR(100),
);


CREATE TABLE PRODUCT_DETAIL(
	ID_DETAILS int constraint pk_product_detail primary key,
	ID_COLOR INT constraint fk_detail_color FOREIGN KEY REFERENCES COLOR(ID_COLOR),
	ID_PRODUCT INT constraint fk_detail_product FOREIGN KEY REFERENCES PRODUCT(ID_PRODUCT) on delete cascade,
	ID_HARDWARE int constraint fk_detail_hard foreign key references HARDWARE_CONFIGURATION(ID_HARDWARE_CONFIGURATION),
	ID_IMAGE INT CONSTRAINT FK_IMAGE_ID REFERENCES IMAGE_PRODUCT(ID_IMAGE),
	QUANTITY int,
	Import_date date,
	PRICE INT
);

CREATE TABLE ACCESSORY(
	ID_ACCESSORY INT constraint pk_accessory PRIMARY KEY NOT NULL,
	PRICE INT,
	ACCESSORY_NAME NVARCHAR(100),
);


CREATE TABLE CUSTOMER(
	ID_CUSTOMER INT PRIMARY KEY NOT NULL,
	CUSTOMER_NAME NVARCHAR(1000) NOT NULL,
	PHONE_NUMBER VARCHAR(15),
	cusAddress Nvarchar(1000),
	DATE_OF_BIRTH DATETIME,
	EMAIL VARCHAR(100),
	cusStatus bit,
	idAccount int constraint fk_customer_account foreign key references account(ID_ACCOUNT)
);


create table account(
	ID_ACCOUNT int constraint pk_account primary key,
	accountStatus bit,
	isCustomer bit,
	pass varchar(200),
);


CREATE TABLE BILL(
	ID_BILL INT constraint pk_bill PRIMARY KEY NOT NULL,
	TOTAL INT,
	cusAddress NVARCHAR(1000),
	phoneNumber varchar(10),
	EMAIL VARCHAR(200),
	billStatus nvarchar(30),
	nameCus nvarchar(100),
);


CREATE TABLE BILL_PRODUCT(
	ID_INVOCE INT constraint fk_product_bill FOREIGN KEY REFERENCES BILL(ID_BILL),
	AMOUNT INT,
	color varchar(10),
	hw varchar(10)
);


Create table cart (
	ID int constraint pk_cart primary key,
	[imageItem] text,
	nameItem nvarchar(100),
	priceItem int,
	hardware nvarchar(100),
	colorItem nvarchar(100),
	emailCus varchar(200),
);




CREATE TABLE SLIDER(
	ID_SLIDER INT PRIMARY KEY,
	IMAGE_LINK TEXT,
	IMAGE_STATUS BIT,
	CONTENT NVARCHAR(MAX)
);

CREATE TABLE PROMOTION(
	ID_PROMOTION INT PRIMARY KEY NOT NULL,
	CODE NVARCHAR(1000),
	EXP_DATE DATETIME,
	START_TIME DATETIME,
	PROMOTION_COST int,
	IS_VALID BIT
);


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



-- INSERT SLIDER
create PROC sp_insert_slider
(@image_link text)
as
begin
	declare @id_slider int;
	set @id_slider = 1;
	while exists (select ID_SLIDER from SLIDER where ID_SLIDER = @id_slider)
		set @id_slider = @id_slider + 1
		insert into SLIDER(ID_SLIDER, IMAGE_LINK, IMAGE_STATUS)
						values(@id_slider, @image_link, 0);
end

exec sp_insert_slider 'https://shopdunk.com/images/uploaded/banner/Banner%20Th%C3%A1ng%2005%202023/PC.png'


ALTER proc sp_get_slider
as
begin
	select image_link, id_slider, image_status
	from SLIDER
end

exec sp_get_slider


create proc sp_get_slider
as
begin
	select image_link, image_status
	from slider
end


-- update slider
create proc sp_update_slider @id int, @image_link text, @name_image nvarchar(100), @status bit
as
begin
	update SLIDER
	set IMAGE_LINK = @image_link, NAME_IMAGE = @name_image, IMAGE_STATUS = @status
	where ID_SLIDER = @id
end









