--POSTY

CREATE TABLE dbo.Post(
	Id int identity(1,1),
	Topic varchar(500),
	Content varchar(1000),
	Src varchar(150),
	UserId int NULL
)

INSERT INTO dbo.Post
VALUES (
	'Leki dla starszego pana',
	'Mój ojciec (lat 74) jest chory i potrzebuje medykamentów. Przyjmę pomoc kogoś, kto kupi i dostarczy leki, spis leków dostarczę w wiadmości prywatnej z adresem.',
	'assets/images/blok1.jpg'
)
--2.
Wyprowadzanie suczki na spacer
Mam mala suczke rasy shitsu, która potrzebuje wychodzic na spacer 3 razy w ciagu dnia. Potrzebuje pomocy, poniewaz przebywam na kwarantannie i nie mam jak zaspokojac psia potrzbe
assets/images/pies.jpg

--3.
Zrobienie zakupów
Jestem starszą Panią, która potrzebuje pomocy przy zrobieniu zakupów
assets/images/zakupy1.jpg

--4.
Odebranie dzieci ze szkoły
Jesteśmy rodzicami przebywającymi na kwarantannie. Potrzebujemy odebrać dzieci ze szkoły.
assets/images/bus.png

--UŻYTKOWNICY

UPDATE dbo.Users
SET firstName='Bartek', lastName='Strózik'
WHERE id=20

