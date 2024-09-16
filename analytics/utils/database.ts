import pg from 'pg';

const { Client } = pg;


function getDbClient() {
	return new Client({
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_USER,
	});
}

export async function getUsersQuestionsCount(): Promise<number> {
	const client = getDbClient();
	await client.connect();

	try {
		const res = await client.query('SELECT COUNT(*) FROM user_questions;');
		if (res.rowCount !== 0) {
			console.log(res.rows);
			console.log(res.rows[0]);
		}
	}
	catch (err) {
		console.log(err);
		return 0;
	}
	await client.end();
	return 0;
}


export async function addUserQuestion(question: string, conv_position: number, answer_id: number) {
	const client = getDbClient();
	await client.connect();

	try {
		await client.query(
			'INSERT INTO user_questions (content, conv_position, answer_id) VALUES ($1, $2, $3)',
			[question, conv_position, answer_id],
		);
	}
	catch (err) {
		console.log(err);
		return false;
	}
	await client.end();
	return true;
}


export async function updateBotAnswerCount(answer: string) {
	const client = getDbClient();
	await client.connect();

	let res;
	try {
		res = await client.query('SELECT id FROM bot_answers WHERE content = $1', [answer]);

		if (res.rowCount === 0) {
			res = await client.query(
				'INSERT INTO bot_answers (content) VALUES ($1) RETURNING id',
				[answer],
			);
		}
		else {
			res = await client.query(
				'UPDATE bot_answers SET use_count = use_count + 1 WHERE content = $1 RETURNING id',
				[answer],
			);
		}
	}
	catch (err) {
		console.log(err);
		return false;
	}
	await client.end();
	return res.rows[0].id;
}