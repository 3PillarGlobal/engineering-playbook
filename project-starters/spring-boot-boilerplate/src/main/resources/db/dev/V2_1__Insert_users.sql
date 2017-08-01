INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`)
VALUES
	(1, 'admin', 'secret', 'Admin', 'Admin');

INSERT INTO `user_role` (`user_id`, `role_id`)
VALUES
	(1, 1);