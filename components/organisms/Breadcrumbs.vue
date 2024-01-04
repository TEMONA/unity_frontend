<template>
	<v-breadcrumbs :items="props.items" />
</template>

<script setup lang="ts">
interface BreadcrumbsPropsType {
	items: {
		text: String;
		disabled: boolean;
		href: String;
	}[];
}

const props = defineProps<BreadcrumbsPropsType>();
</script>
