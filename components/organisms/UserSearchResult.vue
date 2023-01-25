<template>
	<v-list two-line class="pt-0">
		<SearchResultHeader v-bind="meta" />

		<UserList :users="users" />
	</v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { UserListItemType } from './UserList.vue'

export default Vue.extend({
	name: 'UserSearchResult',
	props: {
		meta: {
			type: Object,
			required: true,
		},
		users: {
			type: Array,
			required: true,
		} as Vue.PropOptions<UserListItemType[]>,
	},
})
</script>
