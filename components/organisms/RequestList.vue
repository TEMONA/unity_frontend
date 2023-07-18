<template>
	<div>
		<RequestListItem
			v-for="(item, index) in requests"
			:key="index"
			v-bind="item"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RequestListItemType } from '../molecules/RequestListItem.vue'

export default Vue.extend({
	name: 'RequestList',
	props: {
		requests: {
			type: Array,
			required: true,
		} as Vue.PropOptions<RequestListItemType[]>,
	},
})
</script>
