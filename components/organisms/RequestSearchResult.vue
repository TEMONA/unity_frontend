<template>
	<div>
		<SearchResultHeader v-bind="meta" />
		<div v-if="!isLoading">
			<v-list v-if="requests.length" two-line class="pt-0">
				<RequestList :requests="requests" />
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
import { RequestListItemType } from '../molecules/RequestListItem.vue'

export interface SearchResultMetaType {
	perPage: number
	page: number
}

export default Vue.extend({
	name: 'RequestSearchResult',
	props: {
		meta: {
			type: Object,
			required: true,
		} as Vue.PropOptions<SearchResultHeaderType>,
		requests: {
			type: Array,
			required: true,
		} as Vue.PropOptions<RequestListItemType[]>,
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
