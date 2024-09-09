import { addUserQuestion, updateBotAnswerCount } from '~/utils/database';


export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const chatbotResponse = await $fetch('http://rasa:5005/webhooks/rest/webhook', {
			method: 'POST',
			body: body,
		}) as { recipient_id: string, text: string}[];


		const answer_id = await updateBotAnswerCount(chatbotResponse[0].text);
		await addUserQuestion(body.message, answer_id);

		return chatbotResponse[0];
	}
	catch (err) {
		setResponseStatus(event, 500);
		return {
			message: 'Error while sending request to chatbot.',
			error: (err as { message: string }).message,
		};
	}
});