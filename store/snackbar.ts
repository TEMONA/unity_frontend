import { MutationTree } from 'vuex'

const colors = {
	error: '#A04747',
	success: '#23A39C',
}

interface Payload {
	status: number
	message?: string
}

interface StatusCodeMap {
	[key: number]: string
}

const statusCodeMap: StatusCodeMap = {
	200: '',
	400: 'パラメータが不正です',
	401: 'ログイン情報が正しくありません',
	403: '閲覧権限がありません',
	404: 'ページが見つかりません',
	500: '時間をおいて再度お試しください',
}

export const state = () => ({
	isShow: false,
	message: '',
	color: colors.error,
})

type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
	displaySnackbar(state: RootState, { status, message = '' }: Payload) {
		state.isShow = true
		state.message = message || statusCodeMap[status] || ''
		state.color = status === 200 ? colors.success : colors.error
	},
	closeSnackbar(state: RootState) {
		state.isShow = false
	},
}
