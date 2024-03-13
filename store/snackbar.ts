import { ref } from 'vue';
import { defineStore } from 'pinia';

const colors = {
	error: '#A04747',
	success: '#23A39C',
};

interface Payload {
	status: number;
	messageText?: string;
}

interface StatusCodeMap {
	[key: number]: string;
}

const statusCodeMap: StatusCodeMap = {
	200: '',
	201: '',
	400: 'パラメータが不正です',
	401: 'ログイン情報が正しくありません',
	403: '閲覧権限がありません',
	404: 'ページが見つかりません',
	500: '時間をおいて再度お試しください',
};

export const useSnackbarStore = defineStore('snackbar', () => {
	const isShow = ref(false);
	const message = ref('');
	const color = ref(colors.error);

	function displaySnackbar({ status, messageText = '' }: Payload) {
		isShow.value = true;
		message.value = messageText || statusCodeMap[status] || '';
		color.value = status === 200 ? colors.success : colors.error;
	}

	function closeSnackbar() {
		isShow.value = false;
	}

	return { isShow, message, color, displaySnackbar, closeSnackbar };
});
