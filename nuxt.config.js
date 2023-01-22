import colors from 'vuetify/es5/util/colors'
import { Sass } from 'sass'
import { Fibers } from 'fibers'
import bodyParser from 'body-parser'
import session from 'cookie-session'

const authorizationTokenMaxAge = 1000 * 60 * 60 * 24 * 7

export default {
	publicRuntimeConfig: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3000',
		apiUrl: process.env.API_URL || 'http://localhost:3000',
	},
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - テモナ社内SNS「Unity」',
		title: 'unity_frontend',
		htmlAttrs: {
			lang: 'ja',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
			{ name: 'robots', content: 'noindex, nofollow' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: [
		'~/components',
		'~/components/atoms',
		'~/components/molecules',
		'~/components/organisms',
	],

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		// https://go.nuxtjs.dev/stylelint
		// '@nuxtjs/stylelint-module',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ['@nuxtjs/axios'],
	axios: {
		baseURL: process.env.API_URL || 'http://localhost:3000',
		timeout: 10000,
		headers: {
			'Cache-Control': 'no-cache',
			'Access-Control-Allow-Origin': process.env.BASE_URL,
		},
	},

	// ブラウザのセッションが閉じても認証情報を保持できるようにする
	serverMiddleware: [
		bodyParser.json(),
		session({
			secret: 'super-secret-key',
			resave: false,
			saveUninitialized: false,
			cookie: { maxAge: authorizationTokenMaxAge },
		}),
		{ path: '/api', handler: '~/api/index.ts' },
	],

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/scss/variables.scss'],
		theme: {
			dark: false,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		loaders: {
			scss: {
				implementation: Sass,
				// fibersをインストールした場合
				sassOptions: {
					fiber: Fibers,
				},
			},
		},
	},
}
