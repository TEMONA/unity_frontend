<template>
	<div>
		<SearchResultHeader v-bind="meta" />
		<v-list v-if="users.length" two-line class="pt-0">
			<!-- <SearchResultHeader v-bind="meta" /> -->

			<UserList :users="users" />
		</v-list>
		<Paragraph v-else text="検索結果はありません" />
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
	},
	methods: {
		changeCurrentPage(e: number) {
			this.$emit('changeMeta', { perPage: this.meta.perPage, page: e })
		},
	},
})
</script>
