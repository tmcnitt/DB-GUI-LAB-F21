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
create table `tags` (`id` int, `content` varchar(200));
alter table `tags`
modify column id int not null auto_increment primary key;
CREATE TABLE `articles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `is_opinion_piece` BOOLEAN NOT NULL,
  `is_verified` BOOLEAN,
  `summary` varchar(255) NOT NULL,
  `created_timestamp` DATETIME DEFAULT NOW(),
  `author_name` varchar(255) NOT NULL,
  `avg_political_bias` FLOAT,
  `num_political_votes` INT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
);
CREATE TABLE IF NOT EXISTS `sources` (
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `base_url` VARCHAR(255),
  `owner_name` VARCHAR(255),
  `average_political_bias` DECIMAL(5, 2),
  `num_political_votes` INT
);
CREATE TABLE IF NOT EXISTS `tagArticles` (
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `article_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  `num_likes` INT NOT NULL DEFAULT 0
);
