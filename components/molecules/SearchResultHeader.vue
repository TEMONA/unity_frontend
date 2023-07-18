<template>
	<div>
		<v-subheader>
			検索結果
			<v-spacer />
			<div class="mr-2">
				{{ (currentPage - 1) * perPage + 1 }}
				-
				{{
					currentPage * perPage >= totalCount
						? totalCount
						: currentPage * perPage
				}}件 / {{ totalCount }}件
			</div>
			<!-- <v-icon>mdi-dots-vertical</v-icon> -->
		</v-subheader>

		<v-divider />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export interface SearchResultHeaderType {
	totalCount: number
	perPage: number
	currentPage: number
	totalPages: number
}

export default Vue.extend({
	name: 'SearchResultHeader',
	props: {
		totalCount: {
			type: Number,
			required: true,
		},
		perPage: {
			type: Number,
			required: true,
		},
		currentPage: {
			type: Number,
			required: true,
		},
	},
})
</script>
