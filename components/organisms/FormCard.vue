<template>
	<v-card class="align-end">
		<v-card-title>{{ title }}</v-card-title>

		<v-card-text>
			<slot />
		</v-card-text>
		<v-divider />
		<v-card-actions>
			<v-spacer />
			<slot name="action" />
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'FormCard',
	props: {
		title: {
			type: String,
			required: true,
		},
	},
})
</script>
