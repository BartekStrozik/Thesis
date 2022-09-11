CREATE DATABASE QuarantineDB;

USE QuarantineDB;

CREATE TABLE dbo.Post(
	Id int identity(1,1),
	Topic varchar(500),
	Content varchar(1000),
	Src varchar(150)
)

INSERT INTO dbo.Post VALUES
('Ziemniak', 'Buraki', 'cytryna.jpg')

SELECT * FROM dbo.Post

DELETE FROM dbo.Post

ALTER TABLE dbo.Post
ADD CONSTRAINT PK_Post PRIMARY KEY (Id);

CREATE TABLE dbo.Member (
	Id int identity(1,1) PRIMARY KEY,
	Nick varchar(150),
	Mail varchar(250),
	Password varchar(200),,
	Src varchar(150)
)

USE QuarantineDB

CREATE TABLE Users(
	id int identity(1,1) PRIMARY KEY,
	username varchar(150),
	password varchar(250),
	firstName varchar(200),
	lastName varchar(150),
	token varchar(150)
)

INSERT INTO dbo.Users VALUES
('Bartek', 'test', 'Bartek', 'Strozik', '')


ALTER TABLE dbo.Post
ADD FOREIGN KEY (UserId) REFERENCES Users(id)

USE QuarantineDB
ALTER TABLE dbo.Post
ADD [UserSrc] VARCHAR(150)

USE QuarantineDB
UPDATE dbo.Post
SET UserId = 12
WHERE Id = 31 OR Id = 32


USE QuarantineDB
ALTER TABLE dbo.Users
ADD src VARCHAR(150)

/* Comment */

CREATE TABLE Comment(
	id int identity(1,1) PRIMARY KEY,
    body varchar(150),
	postId int,
    username varchar(200),
    userId int,
    createdAt varchar(200),
)

SELECT C.id, C.body, C.postId, C.username, C.userId, C.createdAt
                   FROM dbo.Comment C
                   JOIN dbo.Post P ON C.postId = P.Id
                   WHERE C.postId = '" + id + @"' AND P.UserId = '" + userId + @"'

-------------------------------------------------------------------------------------------------------------
				   
CREATE TABLE dbo.Post(
	id int identity(1,1),
	topic varchar(500),
	content varchar(1000),
	src varchar(150),
	userId int,
	place varchar(100),
	date varchar(300)
)


CREATE TABLE Message(
	id int identity(1,1) PRIMARY KEY,
    senderId int,
	receiverId int,
    content varchar(1200),
    receivedAt datetime
)


ALTER TABLE Message
ADD FOREIGN KEY (senderId) REFERENCES Users(id); 

ALTER TABLE Message
ADD FOREIGN KEY (receiverId) REFERENCES Users(id);

INSERT INTO dbo.Message VALUES
( 20, 21, 'siemka', '2020' ),
( 20, 22, 'elo', '2020' ),
( 20, 23, 'czesc', '2020' )

INSERT INTO dbo.Post VALUES
('Testowy1', 'test test test', '', 21, 'Kraków', '17 lipca 2020'),
('Testowy2', 'test test test', '', 22, 'Lubin', '17 lipca 2020'),
('Testowy3', 'test test test', '', 24, 'Wejherowo', '17 lipca 2020'),
('Testowy4', 'test test test', '', 22, 'Lubin', '17 lipca 2020')