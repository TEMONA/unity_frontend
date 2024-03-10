import vuetify from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	runtimeConfig: {
		googleClientId: '',
		googleApiKey: '',
		public: {
			baseURL: '',
		},
	},
	plugins: ['utils'],
	modules: ['@pinia/nuxt', '@sidebase/nuxt-auth'],
	auth: {
		provider: {
			type: 'refresh', // localに加えトークンリフレッシュが可能
			baseURL: '/api/authen',
			refreshOnlyToken: true,
			endpoints: {
				signIn: {
					url: '/jwt/create',
					method: 'post',
				},
				refresh: {
					url: '/jwt/refresh/',
					method: 'post',
				},
				getSession: {
					url: '/users/me/',
					method: 'get',
				},
			},
			pages: {
				login: '/login',
			},
			token: {
				signInResponseTokenPointer: '/token/access',
				type: 'JWT',
				headerName: 'Authorization',
				maxAgeInSeconds: 60 * 60 * 24,
				sameSiteAttribute: 'none',
				// 5 minutes
			},
			refreshToken: { signInResponseRefreshTokenPointer: '/refresh' },
			sessionDataType: {
				code: 'number',
				success: 'boolean',
				detail: {
					user: {
						_id: 'string',
						email: 'string',
						name: 'string',
						user_roles: 'string[]',
					},
				},
				globalAppMiddleware: {
					isEnabled: true,
				},
			},
		},
		baseURL: 'http://127.0.0.1:3001/',
		globalAppMiddleware: {
			isEnabled: false,
		},
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
	css: ['@/assets/main.scss'],
});
