<template>
	<div>
		<MoleculesUserListItem
			v-for="(item, index) in props.users"
			:key="index"
			v-bind="item"
		/>
	</div>
</template>

<script setup lang="ts">
import { UserListItemPropsType } from '../molecules/UserListItem.vue';

type UserListPropsType = {
	users: UserListItemPropsType[];
};

const props = defineProps<UserListPropsType>();
</script>
