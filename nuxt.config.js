import colors from 'vuetify/es5/util/colors'
import { Sass } from 'sass'

export default {
	publicRuntimeConfig: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3000',
		apiUrl: process.env.API_URL || 'http://localhost:3000',
		googleClientId: process.env.GOOGLE_CLIENT_ID || 'hoge',
		googleApiKey: process.env.GOOGLE_API_KEY,
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
	plugins: ['~/plugins/axios', '~/plugins/functions'],

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
	modules: ['@nuxtjs/auth-next', '@nuxtjs/axios'],

	// authを追加
	auth: {
		localStorage: false,
		strategies: {
			local: {
				tokenType: 'jwt',
				token: {
					property: 'access_token',
					maxAge: 60 * 60 * 24,
				},
				refreshToken: {
					property: 'access_token',
					maxAge: 60 * 60 * 24 * 7,
				},
				endpoints: {
					login: {
						url: '/authen/jwt/create',
						method: 'post',
						propertyName: 'access_token',
					},
					refresh: {
						url: '/authen/jwt/refresh/',
						method: 'post',
						propertyName: 'access_token',
					},
					user: {
						url: '/authen/users/me/',
						method: 'get',
					},
				},
			},
		},
	},

	axios: {
		baseURL: process.env.API_URL,
		timeout: 10000,
		headers: {
			'Access-Control-Allow-Origin': process.env.BASE_URL,
		},
	},

	router: {
		// See https://auth.nuxtjs.org/guide/middleware.html
		middleware: ['auth'],
	},

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
			},
		},
	},
}
