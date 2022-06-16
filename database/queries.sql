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