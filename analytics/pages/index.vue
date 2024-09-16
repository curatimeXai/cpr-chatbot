<script setup lang="ts">
// const questionsCount = ref(await getUsersQuestionsCount());
// const highestConvQuestionsCount = ref(0);

const questionsCount = ref(120);
const highestConvQuestionsCount = ref(12);
</script>

<template>
	<!--
		add cards at the top to display:
		- the chatbot's stats number of user's questions in total.
		- Highest number of question in conversation.

		Then add the user's questions in a grid below.
		When clicking a question, it opens a popup with the following informations:
		- the number of the question in the conversation
		- the chatbot's answer
	-->
	<div class="px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-12 mx-auto">
		<div class="max-w-5xl">
			<div class="space-y-5 md:space-y-8">
				<div class="space-y-3">
					<h1 class="text-4xl">Analytics</h1>

					<div class="max-w-[85rem] py-10 sm:px-6 lg:py-14 mx-auto">
						<div class="flex flex-row flex-wrap gap-4 sm:gap-6">
							<Card title="Questions asked">
								{{ questionsCount }}
							</Card>

							<Card title="Highest conversation length">
								{{ highestConvQuestionsCount }}
							</Card>
						</div>
					</div>

					<h2 class="text-2xl">Questions</h2>
				</div>
			</div>
		</div>
	</div>
</template>
