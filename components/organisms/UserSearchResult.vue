<template>
	<div>
		<SearchResultHeader v-bind="props.meta" />
		<div v-if="!props.isLoading">
			<v-list v-if="props.users.length" two-line class="pt-0">
				<UserList :users="props.users" />
			</v-list>
			<Paragraph v-else text="検索結果はありません" />
		</div>
		<Paragraph v-else text="読み込み中です" class="m-3" />
		<div v-if="props.meta.totalCount > 1" class="text-center">
			<v-pagination
				:value="props.meta.currentPage"
				:length="props.meta.totalCount"
				:total-visible="7"
				@input="changeCurrentPage"
			></v-pagination>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	SearchResultHeaderPropsType,
	SearchResultEmitsParamsType,
} from '../molecules/SearchResultHeader.vue';
import { UserListItemPropsType } from '../molecules/UserListItem.vue';

interface UserSearchResultPropsType {
	meta: SearchResultHeaderPropsType;
	users: UserListItemPropsType[];
	isLoading: Boolean;
}
const props = defineProps<UserSearchResultPropsType>();

interface UserSearchResultEmitsType {
	// 関数名, 引数の型, 返り値の型
	(e: 'changeMeta', v: SearchResultEmitsParamsType): void;
}
const emits = defineEmits<UserSearchResultEmitsType>();
const changeCurrentPage = (e: any): void => {
	emits('changeMeta', { perPage: props.meta.perPage, page: e });
};
</script>
