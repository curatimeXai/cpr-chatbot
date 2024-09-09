// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	compatibilityDate: '2024-07-07',

	modules: [
		'@nuxtjs/eslint-module',
		'@nuxt/fonts',
		'@nuxtjs/tailwindcss',
		'@nuxt/icon',
		'nuxt-security',
	],

	security: {
		headers: {
			crossOriginResourcePolicy: 'cross-origin',
		},
	},
});