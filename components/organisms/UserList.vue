<template>
	<div>
		<UserListItem v-for="(item, index) in users" :key="index" v-bind="item">
			<template v-if="item.direction" v-slot:prepend>
				{{
					item.direction === 'from'
						? 'この人からのリクエスト：'
						: 'この人へのリクエスト　：'
				}}
			</template>
		</UserListItem>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { UserListItemType } from '../molecules/UserListItem.vue'

export interface UserListType extends UserListItemType {
	direction?: 'from' | 'to' | undefined
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
		} as Vue.PropOptions<UserListType[]>,
	},
})
</script>
