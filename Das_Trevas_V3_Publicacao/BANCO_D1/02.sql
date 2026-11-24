CREATE TABLE IF NOT EXISTS `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`grade` text NOT NULL,
	`game` text NOT NULL,
	`attempt_number` integer NOT NULL,
	`total_questions` integer NOT NULL,
	`correct_answers` integer DEFAULT 0 NOT NULL,
	`wrong_answers` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'started' NOT NULL,
	`started_at` integer NOT NULL,
	`completed_at` integer,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action
);

