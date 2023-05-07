import { ActionTree, MutationTree } from 'vuex'

interface AuthorizationStateType {
	access: string
	refresh: string
}

interface configStateType {
	baseUrl: string
}

interface StateType {
	authorization: AuthorizationStateType
	config: configStateType
}

const initialAuthorizationState: AuthorizationStateType = {
	access: '',
	refresh: '',
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

export const actions: ActionTree<RootState, RootState> = {}

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
}
