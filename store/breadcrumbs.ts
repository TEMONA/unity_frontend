import { ref } from 'vue';
import { defineStore } from 'pinia';

interface breadcrumbsType {
	text: string
	disabled?: boolean
	href: string
}

const initialBreadcrumbsState: breadcrumbsType[] = [
	{
		text: '社員一覧',
		href: '/users',
	},
]

export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
	const items = ref<breadcrumbsType[]>(initialBreadcrumbsState);

	/**
	 * stateのbreadcrumbsを更新する関数
	 *
	 * @param state （変更前の）state
	 * @param breadcrumbsProps stateに上書きするパンクズリスト
	 */
	function updateBreadcrumbs(breadcrumbsProps: breadcrumbsType[]) {
		const breadcrumbs: breadcrumbsType[] = initialBreadcrumbsState
		breadcrumbs.push(...breadcrumbsProps)
		items.value.splice(0, items.value.length, ...breadcrumbs)
	}

	return { items, updateBreadcrumbs };
});
