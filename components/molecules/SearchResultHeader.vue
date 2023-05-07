<template>
	<div>
		<v-subheader>
			検索結果
			<v-spacer />
			<div class="mr-2">
				{{ (page - 1) * limitPerPage + 1 }}-{{
					page * limitPerPage >= total ? total : page * limitPerPage
				}}
				/ {{ total }}
			</div>
			<v-icon>mdi-dots-vertical</v-icon>
		</v-subheader>

		<v-divider />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export interface SearchResultHeaderType {
	start: number
	end: number
	total: number
}

export default Vue.extend({
	name: 'SearchResultHeader',
	props: {
		total: {
			type: Number,
			required: true,
		},
		limit: {
			type: Number,
			required: true,
		},
		page: {
			type: Number,
			required: true,
		},
		limitPerPage: {
			type: Number,
			required: true,
		},
	},
})
</script>
