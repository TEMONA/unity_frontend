<template>
	<v-breadcrumbs :items="items" />
</template>

<script lang="ts">
import Vue from 'vue'

export interface BreadcrumbType {
	text: String
	disabled: boolean
	href: String
}

export default Vue.extend({
	name: 'Breadcrumbs',
	props: {
		items: {
			type: Array,
			required: true,
		} as Vue.PropOptions<BreadcrumbType[]>,
	},
})
</script>
