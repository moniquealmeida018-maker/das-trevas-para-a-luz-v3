CREATE UNIQUE INDEX IF NOT EXISTS `answer_attempt_question_idx` ON `answers` (`attempt_id`,`question_index`);

