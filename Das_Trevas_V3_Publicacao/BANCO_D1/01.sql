CREATE TABLE IF NOT EXISTS `students` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`class_name` text NOT NULL,
	`grade` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);

