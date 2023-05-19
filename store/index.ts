import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface AuthorizationStateType {
	access: string
	refresh: string
}

interface configStateType {
	baseUrl: string
}

interface breadcrumbsType {
	text: string
	disabled?: boolean
	href: string
}

interface StateType {
	authorization: AuthorizationStateType
	config: configStateType
	breadcrumbs: breadcrumbsType[]
}

const initialAuthorizationState: AuthorizationStateType = {
	access: '',
	refresh: '',
}

const initialConfigState: configStateType = {
	baseUrl: '',
}

const initialBreadcrumbsState: breadcrumbsType[] = [
	{
		text: '社員一覧',
		href: '/users',
	},
]

const initialState: StateType = {
	authorization: initialAuthorizationState,
	config: initialConfigState,
	breadcrumbs: initialBreadcrumbsState,
}

export const state: () => StateType = () => Object.assign({}, initialState)

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
	/**
	 * stateからbreadcrumbsを取得する関数
	 *
	 * @param state state
	 */
	breadcrumbs(state) {
		return state.breadcrumbs
	},
}

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

	/**
	 * stateのbreadcrumbsを更新する関数
	 *
	 * @param state （変更前の）state
	 * @param breadcrumbsProps stateに上書きするパンクズリスト
	 */
	updateBreadcrumbs(state: RootState, breadcrumbsProps: breadcrumbsType[]) {
		const breadcrumbs: breadcrumbsType[] = [
			{
				text: '社員一覧',
				href: '/users',
			},
		]
		breadcrumbs.push(...breadcrumbsProps)
		state.breadcrumbs.splice(0, state.breadcrumbs.length, ...breadcrumbs)
	},
}
