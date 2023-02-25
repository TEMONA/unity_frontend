import { ActionTree, MutationTree } from 'vuex'
import { ActionContext } from 'vuex/types'

import get from 'lodash/get'

interface AuthorizationStateType {
	access: string | false
	refresh: string | false
	userId: string
}

interface configStateType {
	baseUrl: string
}

interface StateType {
	authorization: AuthorizationStateType
	config: configStateType
}

const initialAuthorizationState: AuthorizationStateType = {
	access: false,
	refresh: false,
	userId: '',
}

const initialconfigState: configStateType = {
	baseUrl: '',
}

const initialState: StateType = {
	authorization: initialAuthorizationState,
	config: initialconfigState,
}

export const state: () => StateType = () => Object.assign({}, initialState)

type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
	/**
	 * 必要なruntimeConfigとログインセッション（ある場合）をstateに渡す関数
	 *
	 * @param Context Vueのcontext
	 * @param Payload 処理したいデータ
	 */
	nuxtServerInit(
		{ commit }: ActionContext<RootState, RootState>,
		{ req, $config }: any,
	) {
		const { baseUrl } = $config
		commit('updateConfig', { baseUrl })
		if (get(req, 'session.authorization.access')) {
			commit('login', req.session.authorization)
		}
	},

	/**
	 * APIの認証情報（JWT）をstateに保存する関数
	 *
	 * @param Context Vueのcontext
	 * @param Payload.authoarization 認証情報（JWT）
	 * @param Payload.redirectTo ログイン後のリダイレクト先
	 */
	async login(
		{ state, commit }: ActionContext<RootState, RootState>,
		{
			authorization,
			redirectTo = '/',
		}: { authorization: AuthorizationStateType; redirectTo?: string },
	) {
		await this.$axios
			.$post(`${state.config.baseUrl}/api/login`, { authorization })
			.then(() => {
				commit('login', authorization)
				this.$axios.setToken(authorization.access, 'JWT')
				this.$router.push(redirectTo)
			})
			.catch(() => {
				commit('snackbar/displaySnackbar', {
					status: 404,
					message: '処理に失敗しました。時間をおいて再度お試しください。',
				})
			})
	},

	/**
	 * APIの認証情報（JWT）をstateから削除する関数
	 *
	 * @param Context Vueのcontext
	 * @param Payload.isRedirect ログアウト後にリダイレクトするかどうか
	 */
	async logout(
		{ state, commit }: ActionContext<RootState, RootState>,
		{ isRedirect = true }: { isRedirect?: boolean },
	) {
		await this.$axios
			.$delete(`${state.config.baseUrl}/api/logout`)
			.then(() => {
				commit('logout')
				this.$axios.setToken(false, 'JWT')
				if (isRedirect) {
					this.$router.push('/login')
				}
			})
			.catch(() => {
				commit('snackbar/displaySnackbar', {
					status: 404,
					message: '処理に失敗しました。時間をおいて再度お試しください。',
				})
			})
	},
}

export const mutations: MutationTree<RootState> = {
	/**
	 * stateにruntimeConfigを注入する関数
	 *
	 * @param state （変更前の）state
	 * @param configProps stateに注入するruntimeConfig
	 */
	updateConfig(state: RootState, configProps: configStateType) {
		state.config = Object.assign({}, state.config, configProps)
	},

	/**
	 * stateに認証情報を注入する関数
	 *
	 * @param state （変更前の）state
	 * @param authorizationProps stateに注入する認証情報（JWT）
	 */
	login(state: RootState, authorizationProps: AuthorizationStateType) {
		state.authorization = Object.assign(
			{},
			state.authorization,
			authorizationProps,
		)
	},

	/**
	 * stateの認証情報を空にする関数
	 *
	 * @param state （変更前の）state
	 */
	logout(state: RootState) {
		state.authorization = Object.assign(
			{},
			state.authorization,
			initialAuthorizationState,
		)
	},
}
