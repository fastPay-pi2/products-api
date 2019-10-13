select p.name, p.brand, p.image, p.price, c.name, s.name, i.rfid
from product p, category c, subcategory s, item i
where i.rfid != '11-11-11-11-11-11-11' and p.id = i.idproduct and c.id = s.idcategory and s.id = p.idsubcategory;