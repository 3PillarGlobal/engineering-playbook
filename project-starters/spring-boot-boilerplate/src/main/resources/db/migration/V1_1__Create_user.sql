CREATE TABLE `role` (
  `id` bigint primary key,
  `code` varchar(30) NOT NULL DEFAULT '',
  `name` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
);

INSERT INTO `role` (`id`, `name`)
VALUES
	(1,'ADMIN'),
	(2,'REGULAR_USER');

CREATE TABLE `user` (
  `id` bigint primary key,
  `username` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
);

CREATE TABLE `user_role` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  KEY `fk_userId` (`user_id`),
  KEY `fk_roleId` (`role_id`),
  CONSTRAINT `fk_roleId` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);