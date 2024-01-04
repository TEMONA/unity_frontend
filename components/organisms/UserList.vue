<template>
	<div>
		<UserListItem
			v-for="(item, index) in props.users"
			:key="index"
			v-bind="item"
		/>
	</div>
</template>

<script setup lang="ts">
import { UserListItemPropsType } from '../molecules/UserListItem.vue'

interface UserListPropsType {
	users: UserListItemPropsType[]
}

const props = defineProps<UserListPropsType>()
</script>
