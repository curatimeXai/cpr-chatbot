/**
 * A simple middleware API that store the user's questions 
 * and the bot's answers in a database. The database can then be queried
 * to display analytics about the bot's use.
 */

import axios from 'axios';
import express from 'express';
import { addUserQuestion, updateBotAnswerCount } from './database.js';


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Chatbot API");
})

app.post('/ask_chatbot', async (req, res) => {
	try {
		const chatbotResponse = await axios.post("http://rasa:5005/webhooks/rest/webhook", req.body);
		
		let answer_id = await updateBotAnswerCount(chatbotResponse.data[0].text);
		await addUserQuestion(req.body.message, answer_id);

		return res.json(chatbotResponse.data);
	}
	catch (err) {
		res.status(500).json({
			message: "Error while sending request to chatbot.",
			error: err.message,
		})
	}
});

app.listen(process.env.API_PORT, () => {
	console.log("API started!");
});