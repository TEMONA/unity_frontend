<template>
	<div>
		<UserListItem v-for="(item, index) in users" :key="index" v-bind="item" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export interface UserListItemType {
	image: string
	name: string
	department: string
	group: string
	role?: string
	detail: string
}

export default Vue.extend({
	name: 'UserList',
	props: {
		users: {
			type: Array,
			required: true,
		} as Vue.PropOptions<UserListItemType[]>,
	},
})
</script>
