<template>
	<v-card class="align-end">
		<slot name="header" />
		<v-divider v-if="$slots.header" />

		<v-card-title>{{ props.title }}</v-card-title>

		<v-card-text>
			<slot />
		</v-card-text>

		<v-divider />

		<v-card-actions>
			<v-spacer />
			<slot name="action" />
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
export interface FormCardPropsType {
	title: string;
}

const props = defineProps<FormCardPropsType>();
</script>
