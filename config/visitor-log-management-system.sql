CREATE DATABASE  IF NOT EXISTS `visitor-log-management-system`;
USE `visitor-log-management-system`;

DROP TABLE IF EXISTS `covid`;
CREATE TABLE `covid` (
  `covid_id` int NOT NULL AUTO_INCREMENT,
  `temperature` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `fever` varchar(45) DEFAULT NULL,
  `cough` varchar(45) DEFAULT NULL,
  `colds` varchar(45) DEFAULT NULL,
  `shortness_of_breath` varchar(45) DEFAULT NULL,
  `diarrhea` varchar(45) DEFAULT NULL,
  `other_symptoms` varchar(45) DEFAULT NULL,
  `travel` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `close_contact` varchar(45) DEFAULT NULL,
  `care_woppe` varchar(45) DEFAULT NULL,
  `close_env` varchar(45) DEFAULT NULL,
  `travel_together` varchar(45) DEFAULT NULL,
  `agree` varchar(45) DEFAULT NULL,
  `visit_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`covid_id`)
);

DROP TABLE IF EXISTS `office_log`;
CREATE TABLE `office_log` (
  `office_log_id` int NOT NULL AUTO_INCREMENT,
  `visit_id` varchar(45) DEFAULT NULL,
  `office_id` varchar(45) DEFAULT NULL,
  `timestamp` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`office_log_id`)
);

DROP TABLE IF EXISTS `offices`;
CREATE TABLE `offices` (
  `office_id` int NOT NULL AUTO_INCREMENT,
  `office_name` varchar(255) DEFAULT NULL,
  `incharge` varchar(255) DEFAULT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`office_id`)
);


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);

DROP TABLE IF EXISTS `visits`;
CREATE TABLE `visits` (
  `visit_id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_number` varchar(45) DEFAULT NULL,
  `purpose` varchar(225) DEFAULT NULL,
  `timein` varchar(45) DEFAULT NULL,
  `timeout` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`visit_id`)
);