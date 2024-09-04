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


export async function addUserQuestion(question, answer_id) {
	const client = getDbClient();
	await client.connect();

	let res;
	try {
		res = await client.query(
			'INSERT INTO user_questions (content, answer_id) VALUES ($1, $2)',
			[question, answer_id]
		);
	}
	catch (err) {
		console.log(err);
		return false;
	}
	await client.end();
	return true;
}


export async function updateBotAnswerCount(answer) {
	const client = getDbClient();
	await client.connect();
	
	let res;
	try {
		res = await client.query('SELECT id FROM bot_answers WHERE content = $1', [answer]);

		if (res.rowCount === 0) {
			res = await client.query(
				'INSERT INTO bot_answers (content) VALUES ($1) RETURNING id',
				[answer]
			);
		} else {
			res = await client.query(
				'UPDATE bot_answers SET use_count = use_count + 1 WHERE content = $1 RETURNING id',
				[answer]
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