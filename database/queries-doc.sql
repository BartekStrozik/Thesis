CREATE TABLE Message(
	id int identity(1,1) PRIMARY KEY,
    senderId int,
	receiverId int,
    content varchar(1200),
    receivedAt datetime
)


CREATE TABLE Comment(
	id int identity(1,1) PRIMARY KEY,
    body varchar(150),
	postId int,
    username varchar(200),
    userId int,
    createdAt varchar(200),
)


CREATE TABLE Users(
	id int identity(1,1) PRIMARY KEY,
	username varchar(150),
	password varchar(250),
	firstName varchar(200),
	lastName varchar(150),
	token varchar(150),
	src varchar(150)
)


CREATE TABLE dbo.Post(
	id int identity(1,1),
	topic varchar(500),
	content varchar(1000),
	src varchar(150),
	userId int,
	place varchar(100),
	date varchar(300)
)

--UPLOAD

CREATE TABLE dbo.Post(
	id int identity(1,1),
	topic varchar(500),
	content varchar(1000),
	src varbinary(max),
	userId int,
	place varchar(100),
	date varchar(300)
)

