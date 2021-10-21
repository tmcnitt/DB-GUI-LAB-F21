-- create database db
CREATE DATABASE db;
-- use newly create database
USE db;

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `user_type` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`)
);
create table tag (id int, tag_content varchar(200));
alter table tag
modify column id int not null auto_increment primary key;

CREATE TABLE IF NOT EXISTS Source (
    source_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    source_name VARCHAR(255) NOT NULL,
    base_url VARCHAR(255),
    owner_name VARCHAR(255),
    average_political_bias DECIMAL(5, 2),
    num_political_votes INT
);
