import { ActionTree, MutationTree } from 'vuex'

import get from 'lodash/get'

interface AuthorizationStateType {
	access: string | null
	refresh: string | null
}

interface StateType {
	authorization: AuthorizationStateType
	config: {
		baseUrl: string
	}
}

const initialAuthorizationState: AuthorizationStateType = {
	access: null,
	refresh: null,
}

const initialState: StateType = {
	authorization: initialAuthorizationState,
	config: {
		baseUrl: '',
	},
}

export const state: () => StateType = () => Object.assign({}, initialState)

type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
	// 必要なruntimeConfigとログインセッション（ある場合）をstateに渡す
	nuxtServerInit({ commit }, { req, $config }) {
		const { baseUrl } = $config
		commit('updateConfig', { baseUrl })
		if (get(req, 'session.authorization.access')) {
			commit('login', req.session.authorization)
		}
	},
	// ログイン用関数
	async login({ state, commit }, { authorization, redirectTo = '/' }) {
		await this.$axios
			.$post(`${state.config.baseUrl}/api/login`, { authorization })
			.then(() => {
				commit('login', authorization)
				this.$router.push(redirectTo)
			})
	},
	// ログアウト用関数。apiにリクエストを送ってstoreを綺麗にする
	async logout({ state, commit }, { isRedirect = true }) {
		await this.$axios.$delete(`${state.config.baseUrl}/api/logout`).then(() => {
			commit('logout')
			if (isRedirect) {
				this.$router.push('/login')
			}
		})
	},
}

export const mutations: MutationTree<RootState> = {
	updateConfig(state, configProps) {
		state.config = Object.assign({}, state.config, configProps)
	},
	login(state, authorizationProps) {
		state.authorization = Object.assign(
			{},
			state.authorization,
			authorizationProps,
		)
	},
	logout(state) {
		state.authorization = Object.assign(
			{},
			state.authorization,
			initialAuthorizationState,
		)
	},
}
