<template>
	<div>
		<SearchResultHeader v-bind="meta" />
		<div v-if="!isLoading">
			<v-list v-if="users.length" two-line class="pt-0">
				<UserList :users="users" />
			</v-list>
			<Paragraph v-else text="検索結果はありません" />
		</div>
		<Paragraph v-else text="読み込み中です" class="m-3" />
		<div v-if="meta.totalPages > 1" class="text-center">
			<v-pagination
				:value="meta.currentPage"
				:length="meta.totalPages"
				:total-visible="7"
				@input="changeCurrentPage"
			></v-pagination>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SearchResultHeaderType } from '../molecules/SearchResultHeader.vue'
import { UserListType } from './UserList.vue'

export interface SearchResultMetaType {
	perPage: number
	page: number
}

export default Vue.extend({
	name: 'UserSearchResult',
	props: {
		meta: {
			type: Object,
			required: true,
		} as Vue.PropOptions<SearchResultHeaderType>,
		users: {
			type: Array,
			required: true,
		} as Vue.PropOptions<UserListType[]>,
		isLoading: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		changeCurrentPage(e: number) {
			this.$emit('changeMeta', { perPage: this.meta.perPage, page: e })
		},
	},
})
</script>
