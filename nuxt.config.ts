import vuetify from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	runtimeConfig: {
		googleClientId: '',
		googleApiKey: '',
		public: {
			baseURL: process.env.BASE_URL || '',
		},
	},
	plugins: [],
	modules: ['@pinia/nuxt', '@sidebase/nuxt-auth'],
	auth: {
		globalAppMiddleware: true,
		baseURL: 'https://unity-backend.temona.co.jp/authen',
		provider: {
			type: 'refresh', // localに加えトークンリフレッシュが可能
			endpoints: {
				signIn: {
					path: '/jwt/create',
					method: 'post',
				},
				signOut: false,
				signUp: false,
				refresh: { path: '/jwt/refresh', method: 'post' },
				getSession: {
					path: '/users/me/',
					method: 'get',
				},
			},
			pages: {
				login: '/login',
			},
			token: {
				signInResponseTokenPointer: '/access',
				type: 'JWT',
				headerName: 'Authorization',
				maxAgeInSeconds: 60 * 60 * 24,
				sameSiteAttribute: 'none',
			},
			refreshToken: { signInResponseRefreshTokenPointer: '/refresh' },
			sessionDataType: { id: 'string', email: 'string' },
		},
	},
	alias: {
		'*': './types/*',
	},
	build: {
		transpile: ['vuetify'],
	},
	hooks: {
		'vite:extendConfig': (config) => {
			config.plugins!.push(vuetify());
		},
	},
	vite: {
		ssr: {
			noExternal: ['vuetify'],
		},
		define: {
			'process.env.DEBUG': false,
		},
	},
	css: ['@/assets/main.scss', 'vuetify/lib/styles/main.sass'],
});
