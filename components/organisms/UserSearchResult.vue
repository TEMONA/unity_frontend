<template>
	<v-list two-line class="pt-0">
		<!-- <SearchResultHeader v-bind="meta" /> -->

		<UserList :users="users" />
	</v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { SearchResultHeaderType } from '../molecules/SearchResultHeader.vue'
import { UserListType } from './UserList.vue'

export default Vue.extend({
	name: 'UserSearchResult',
	props: {
		// meta: {
		// 	type: Object,
		// 	required: true,
		// } as Vue.PropOptions<SearchResultHeaderType>,
		users: {
			type: Array,
			required: true,
		} as Vue.PropOptions<UserListType[]>,
	},
})
</script>
