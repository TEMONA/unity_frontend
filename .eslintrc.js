module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
	plugins: ['prettier', 'vue'],
	rules: {
		'no-console': 'warn',
		indent: [2, 'tab'],
		'vue/no-v-html': 'off',
		'no-fallthrough': 'off',
		'space-before-function-paren': 'off',
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
	},
}
