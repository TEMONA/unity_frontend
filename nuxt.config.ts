import vuetify from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	runtimeConfig: {
		googleClientId: '',
		googleApiKey: '',
		public: {
			baseURL: '',
			apiUrl: '',
		},
	},
	plugins: ['utils'],
	modules: ['@pinia/nuxt', '@sidebase/nuxt-auth'],
	auth: {
		globalAppMiddleware: true,
		provider: {
			type: 'refresh',
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
			token: {
				signInResponseTokenPointer: '/token/access',
				type: 'jwt',
				headerName: 'Authorization',
				maxAgeInSeconds: 60 * 60 * 24,
				sameSiteAttribute: 'none',
				// 5 minutes
			},
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
