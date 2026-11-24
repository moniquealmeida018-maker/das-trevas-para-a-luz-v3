CREATE UNIQUE INDEX IF NOT EXISTS `attempt_student_game_number_idx` ON `attempts` (`student_id`,`game`,`attempt_number`);

