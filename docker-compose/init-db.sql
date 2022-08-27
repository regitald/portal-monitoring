CREATE TABLE users (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
phone_number VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
bio TEXT,
location VARCHAR(255),
status boolean,
verified boolean,
verified_at TIMESTAMP,
reset_password_token VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP,
deleted_at TIMESTAMP,
) 


CREATE TABLE roles (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
is_active BOOLEAN,
created_at TIMESTAMP,
updated_at TIMESTAMP
) 

CREATE TABLE role_user (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
user_id INT,
role_id INT
) 

ALTER TABLE `portal-auth`.role_user ADD CONSTRAINT role_user_FK FOREIGN KEY (id) REFERENCES `portal-auth`.users(id);
ALTER TABLE `portal-auth`.role_user ADD CONSTRAINT role_user_FK_1 FOREIGN KEY (id) REFERENCES `portal-auth`.roles(id);


CREATE TABLE permissions (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
description TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP
) 

CREATE TABLE permission_role (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
role_id INT,
permission_id INT,
status BOOLEAN ,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP,
FOREIGN KEY (id) REFERENCES roles(id),
FOREIGN KEY (id) REFERENCES permissions(id)
) 

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'allyoucan#34T';

flush privileges;