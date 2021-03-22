create database dashboard;

use dashboard;

CREATE TABLE users(
    id int(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    PRIMARY KEY(id)
)

INSERT INTO users VALUE ("","jhonnatan", "123456", "jjhoncv@gmail.com");
