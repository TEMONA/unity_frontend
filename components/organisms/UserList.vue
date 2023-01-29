<template>
	<div>
		<UserListItem v-for="(item, index) in users" :key="index" v-bind="item">
			<template v-if="prepend" v-slot:prepend>
				{{ prepend }}
			</template>
		</UserListItem>
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
	status?: string
	detail: string
}

export default Vue.extend({
	name: 'UserList',
	props: {
		prepend: {
			type: String,
			required: false,
			default: '',
		},
		users: {
			type: Array,
			required: true,
		} as Vue.PropOptions<UserListItemType[]>,
	},
})
</script>
