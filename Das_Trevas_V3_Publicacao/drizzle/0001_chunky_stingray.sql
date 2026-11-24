CREATE TABLE `self_assessments` (
	`student_id` text NOT NULL,
	`grade` text NOT NULL,
	`responses` text NOT NULL,
	`submitted_at` integer NOT NULL,
	PRIMARY KEY(`student_id`, `grade`),
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action
);
