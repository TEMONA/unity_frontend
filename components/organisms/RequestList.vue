<template>
	<div>
		<RequestListItem
			v-for="(item, index) in props.requests"
			:key="index"
			v-bind="item"
		/>
	</div>
</template>

<script setup lang="ts">
import { RequestListItemPropsType } from '../molecules/RequestListItem.vue';

interface RequestListPropsType {
	requests: RequestListItemPropsType[];
}

const props = defineProps<RequestListPropsType>();
</script>
