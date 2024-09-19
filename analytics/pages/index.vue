<script setup lang="ts">
const { data: questionsCount } = await useFetch('/api/db/questions_count');
// const questionsCount = ref(120);
const highestConvQuestionsCount = ref(0);

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
	<div class="px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-80 mx-auto">
		<div class="space-y-5 md:space-y-8">
			<div class="space-y-3">
				<h1 class="text-4xl">Analytics</h1>

				<div class="w-full py-10 sm:px-6 lg:py-14 mx-auto">
					<div class="flex flex-row flex-wrap justify-center gap-4 sm:gap-6">
						<StatCard title="Questions asked">
							{{ questionsCount }}
						</StatCard>

						<StatCard title="Highest conversation length">
							{{ highestConvQuestionsCount }}
						</StatCard>
					</div>
				</div>

				<h2 class="text-2xl">Questions</h2>
			</div>
		</div>
	</div>
</template>
