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
alter table `tags` modify column id bigint unsigned not null auto_increment primary key;

CREATE TABLE IF NOT EXISTS `sources` (
  `id` bigint unsigned AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `base_url` VARCHAR(255) NOT NULL,
  `owner_name` VARCHAR(255) NOT NULL,
  `avg_political_bias` DECIMAL(5, 2),
  `num_political_votes` INT NOT NULL DEFAULT 0,
  `bias` VARCHAR(255) NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
);

CREATE TABLE `articles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `source_id` bigint unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `is_opinion_piece` BOOLEAN NOT NULL,
  `is_verified` BOOLEAN,
  `summary` varchar(255) NOT NULL,
  `created_timestamp` DATETIME DEFAULT NOW(),
  `author_first_name` varchar(255) NOT NULL,
  `author_last_name` varchar(255) NOT NULL,
  `avg_political_bias` FLOAT,
  `num_political_votes` INT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),

  FOREIGN KEY (source_id) REFERENCES sources(id)
);

CREATE TABLE `comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `num_likes` int,
  `comment` varchar(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),

  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (user_id) REFERENCES users(id),

);


CREATE TABLE IF NOT EXISTS `tagArticles` (
  `id` bigint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `article_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  `num_likes` INT NOT NULL DEFAULT 0,
  `num_dislikes` INT NOT NULL DEFAULT 0

  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),

  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id),
);
