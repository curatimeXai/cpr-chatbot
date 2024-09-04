CREATE TABLE bot_answers(
	id SERIAL PRIMARY KEY,
	content TEXT NOT NULL,
	use_count INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE user_questions(
	id SERIAL PRIMARY KEY,
	content TEXT NOT NULL,
	answer_id INTEGER NOT NULL REFERENCES bot_answers(id)
);