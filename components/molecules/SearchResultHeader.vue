<template>
	<div>
		<v-subheader>
			検索結果
			<v-spacer />
			<div class="mr-2">{{ start }}-{{ end }} / {{ total }}</div>
			<v-icon>mdi-dots-vertical</v-icon>
		</v-subheader>

		<v-divider />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'SearchResultHeader',
	props: {
		start: {
			type: Number,
			required: true,
		},
		end: {
			type: Number,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
	},
})
</script>
