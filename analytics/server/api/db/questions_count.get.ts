import { getUsersQuestionsCount } from '~/utils/database';

export default defineEventHandler(async () => {
	const count = await getUsersQuestionsCount();
	return count;
});