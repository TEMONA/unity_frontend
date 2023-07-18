import { Context } from '@nuxt/types'

export default ({ app, store }: Context) => {
	app.$axios.onRequest((config: any) => {
		config.headers['Content-Type'] = 'application/json'
	})
}
