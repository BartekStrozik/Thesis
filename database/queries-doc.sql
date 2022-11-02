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
	id int identity(1,1) PRIMARY KEY,
	topic varchar(500),
	content varchar(1000),
	src varchar(1000),
	userId int,
	place varchar(100),
	date varchar(300)
)


--FOREIGN KEYS

ALTER TABLE dbo.Post
ADD FOREIGN KEY (userId) REFERENCES dbo.Users(id)

ALTER TABLE dbo.Comment
ADD FOREIGN KEY (postId) REFERENCES dbo.Post(id)

ALTER TABLE dbo.Comment
ADD FOREIGN KEY (userId) REFERENCES dbo.Users(id)

ALTER TABLE dbo.Message
ADD FOREIGN KEY (senderId) REFERENCES dbo.Users(id)

ALTER TABLE dbo.Message
ADD FOREIGN KEY (receiverId) REFERENCES dbo.Users(id)

--NOTIFICATIONS

--pola ogólne

sourceUserId int,
sourceFirstName varchar(200),
sourceLastName varc


CREATE TABLE dbo.Notification(
	id int identity(1,1) PRIMARY KEY,
	ownerId int,
	sourceUserId int,
	sourceUserSrc varchar(150),
	sourceFirstName varchar(200),
	sourceLastName varchar(150),
	isNewMessage bit,
	isNewComment bit,
	postId int NULL,
	isNewInvite bit
)


CREATE TABLE dbo.Friends(
	id int identity(1,1) PRIMARY KEY,
	userId int,
	invitedId int,
	accepted bit
)

