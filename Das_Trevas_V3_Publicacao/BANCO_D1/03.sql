CREATE TABLE IF NOT EXISTS `answers` (
	`id` text PRIMARY KEY NOT NULL,
	`attempt_id` text NOT NULL,
	`question_index` integer NOT NULL,
	`question` text NOT NULL,
	`selected_answer` text NOT NULL,
	`correct_answer` text NOT NULL,
	`is_correct` integer NOT NULL,
	`answered_at` integer NOT NULL,
	FOREIGN KEY (`attempt_id`) REFERENCES `attempts`(`id`) ON UPDATE no action ON DELETE no action
);

