<template>
	<v-breadcrumbs :items="items">
		<template v-slot:item="props">
			<v-breadcrumbs-item
				exact
				:disabled="props.item.disabled"
				:to="props.item.href"
				nuxt
			>
				{{ props.item.text }}
			</v-breadcrumbs-item>
		</template>
	</v-breadcrumbs>
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
