CREATE TABLE users (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
username VARCHAR(255) UNIQUE NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
phone_number VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
bio TEXT,
location VARCHAR(255),
status boolean,
verified boolean,
verified_at TIMESTAMP,
reset_password_token VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP,
deleted_at TIMESTAMP
) 


CREATE TABLE roles (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP,
updated_at TIMESTAMP
) 

CREATE TABLE role_user (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
user_id INT UNSIGNED,
role_id INT UNSIGNED,
created_at TIMESTAMP,
updated_at TIMESTAMP,
FOREIGN KEY (role_id) REFERENCES roles(id),
FOREIGN KEY (user_id) REFERENCES users(id)
) 


CREATE TABLE permissions (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
description TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP
) 

CREATE TABLE permission_role (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
role_id INT UNSIGNED,
permission_id INT UNSIGNED,
status BOOLEAN ,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP,
FOREIGN KEY (permission_id) REFERENCES roles(id),
FOREIGN KEY (role_id) REFERENCES permissions(id)
) 

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'allyoucan#34T';

flush privileges;
