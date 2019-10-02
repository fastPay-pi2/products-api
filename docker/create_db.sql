CREATE TABLE PRODUCT (
	id serial PRIMARY KEY,
	name varchar(200),
	brand varchar(100),
	image varchar(200),
	price float(2),
	category varchar(50),
	subcategory varchar(50)
);

CREATE TABLE ITEM (
	rfid integer PRIMARY KEY,
	expirationDate DATE,
	idProduct integer,

	CONSTRAINT ITEM_PRODUCT_FK FOREIGN KEY (idProduct) REFERENCES PRODUCT (id) ON DELETE CASCADE ON UPDATE CASCADE
);
