module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'@vue/prettier',
		'plugin:@typescript-eslint/recommended',
		'@nuxtjs/eslint-config-typescript',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'no-console': 'warn',
		indent: [2, 'tab'],
		'vue/no-v-html': 'off',
		'no-fallthrough': 'off',
		'node/handle-callback-err': 'off',
		'node/no-new-require': 'off',
		'node/no-path-concat': 'off',
		'array-bracket-spacing': ['error', 'never'],
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				trailingComma: 'all',
				useTabs: true,
			},
		],
		'vue/multi-word-component-names': 0,
	},
}
