create database `nodejs_raw`;
use `nodejs_raw`;

CREATE TABLE `nodejs_raw`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30),
  `first_name` VARCHAR(30),
  `last_name` VARCHAR(30),
  `password` VARCHAR(30),
  `email` VARCHAR(50),
  `organization_id` INT NOT NULL,
  PRIMARY KEY (`id`))
DEFAULT CHARACTER SET = utf8mb4;


CREATE TABLE `nodejs_raw`.`organization` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `type` VARCHAR(30),
  `pid` VARCHAR(30),
  PRIMARY KEY (`id`))
DEFAULT CHARACTER SET = utf8mb4;
