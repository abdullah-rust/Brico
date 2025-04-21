create table users (
id serial primary key,
username varchar(50) not null ,
useremail varchar(100) not null unique,
userpassword text not null
)


insert into users(username,useremail,userpassword)
values ('Abdullah','ariaz7556@gmail.com','de45jfh42354jqhd');

select * from users;


