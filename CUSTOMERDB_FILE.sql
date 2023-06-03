-- INSERT CUSTOMER

CREATE TABLE CUSTOMER(
	ID_CUSTOMER INT PRIMARY KEY NOT NULL,
	CUSTOMER_NAME NVARCHAR(1000) NOT NULL,
	PHONE_NUMBER VARCHAR(15),
	cusAddress Nvarchar(1000),
	DATE_OF_BIRTH DATETIME,
	EMAIL VARCHAR(100),
	cusStatus bit,
	pass varchar(200),
	dateJoin date
);


alter table bill 
add orderStatus nvarchar(200);

select*
from bill

alter PROC sp_insert_customer
(
@customer_name nvarchar(1000), 
@phone_number VARCHAR(15),
@dob DATETIME, @email varchar(100), @pass varchar(200), @cusAddress nvarchar(1000))
as
begin
	declare @cus_id int;
	set @cus_id = 1;
	while exists (select ID_CUSTOMER from CUSTOMER where ID_CUSTOMER = @cus_id)
		set @cus_id = @cus_id + 1
	insert into CUSTOMER(ID_CUSTOMER, CUSTOMER_NAME, PHONE_NUMBER, DATE_OF_BIRTH, EMAIL, pass, cusStatus, cusAddress, dateJoin)
		values(@cus_id, @customer_name, @phone_number, @dob, @email, @pass, 1, @cusAddress, GETDATE());
end


CREATE TABLE PRODUCT_ORDER_DETAIL (
	ID_ORDER int constraint fk_order foreign key references ORDER_PRODUCT(ID_ORDER),
	ID_PRODUCT int constraint fk_product foreign key references PRODUCT(ID_PRODUCT),
	DATE_ORDER date,
	HW varchar(10),
	ID_ODER_PRODUCT_DETAIL int primary key,
	 COLOR varchar(10),
	 isPay bit
);




create or alter proc sp_insert_cart 
	@image text,
	@name nvarchar(1000),
	@price int,
	@hw nvarchar(100),
	@cl nvarchar(100),
	@emailCus varchar(200)
AS
BEGIN
	declare @id int;
	set @id = 1;
	while exists (select ID from Cart where ID = @id )
		set @id = @id + 1 
	insert into cart (ID, [imageItem], nameItem, priceItem, hardware, colorItem, emailCus)
		values (@id, @image, @name, @price, @hw, @cl, @emailCus)
END;





create or alter proc sp_delete_cart @id int
as
begin
	delete from cart
	where ID = @id
end

exec sp_delete_cart 1

create or alter proc sp_delete_all_cart @email varchar(200)
as
begin
	delete from cart
	where emailCus = @email
end



create or alter proc sp_get_all_item_cart @email varchar(200)
as
begin
	select*
	from cart 
	where emailCus = @email
end

exec sp_get_all_item_cart '202306020.7086432557760984'




update HARDWARE_CONFIGURATION
set priceStorage = 100000


-- INSERT ORDER

orderStatus

select*
from BILL

--IDDH, 

create or alter proc sp_get_order_customer

select*
from BILL_PRODUCT


alter PROC sp_insert_order
(
@idOrder varchar(200),
@name nvarchar(100),
@phone varchar(10),
@email varchar(200),
@address nvarchar(max),
@total int,
@pay bit
)
as
begin
	insert into BILL(ID_BILL, TOTAL, cusAddress, phoneNumber, email, billStatus, nameCus, paymemtMethod, dateOrder, orderStatus)
			values(@idOrder, @total, @address, @phone, @email, N'Chờ', @name, @pay, getdate(), N'Soạn hàng');
end

create or alter proc c @idCart varchar(100)
as
begin
	update BILL
	set billStatus = N'Đã thanh toán'
	where ID_BILL = @idCart
end

exec sp_update_bill_status '202306010.4180744602225166'

--Image, ID_BILL, PRODUCT, COLOR, HARD, AMOUNT, billStatus, paymentMethod, orderStatus, address



create or alter proc sp_get_order_by_email @email varchar(200)
as
begin
	select ID_BILL, imagePro, namePro, color, hw, AMOUNT, billStatus, paymemtMethod, orderStatus, cusAddress, TOTAL
	from BILL
	join BILL_PRODUCT on ID_INVOCE = ID_BILL
	where EMAIL = @email
end

exec sp_get_order_by_email 'bu@gmail.com'


update BILL_PRODUCT
set imagePro = 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-yellow?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1676505836714'


update bill
set cusAddress = 'Phuoc Tan Bien Hoa'


alter PROC sp_insert_order_detail
(@ID_ORDER NVARCHAR(100), 
@amount int, @hw varchar(10), @color varchar(10), @namePro nvarchar(200), @image text)
as
begin
	declare @id int;
	set @id = 1;
	while exists (select ID from BILL_PRODUCT where ID = @id )
		set @id = @id + 1 
		insert into BILL_PRODUCT(ID_INVOCE, AMOUNT, hw, color, ID, namePro, imagePro)
						values(@ID_ORDER, @amount, @hw, @color, @id, @namePro, @image);
end


CREATE TABLE BILL_PRODUCT(
	ID_INVOCE varchar(200) constraint fk_product_bill FOREIGN KEY REFERENCES BILL(ID_BILL),
	AMOUNT INT,
	color varchar(10),
	hw varchar(10),
	ID int constraint pk_bill_product primary key
);




create PROC sp_insert_account
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
		insert into ACCOUNT(ID_ACCOUNT, accountStatus, isCustomer, PASS)
						values(@idAcc, 0, @is_customer, @pass);
end

select*
from CUSTOMER



create proc sp_insert_account_customer
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
		raiserror('Tai khoan da ton tai', 16, 1);
	else
		insert into ACCOUNT(ID_ACCOUNT, accountStatus, isCustomer, PASS)
			values(@idAcc, 1, 1, @pass);
end


--GET
--GET CUSTOMER
create proc sp_get_customer_by_email @email varchar(max)
as
begin
	select*
	from customer where email = @email
end

exec sp_get_customer_by_email 'bu@gmail.com'

select*
from CUSTOMER

alter proc sp_get_infor_login
as
begin
	select email, cusStatus, pass
	from customer
end
exec sp_get_infor_login


create or alter proc sp_update_password @email varchar(200), @password varchar(200)
as
begin
	update CUSTOMER
	set pass = @password
	where EMAIL = @email
end



select*
from CUSTOMER