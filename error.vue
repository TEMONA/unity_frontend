<template>
	<v-app>
		<h1>
			{{ error.message }}
		</h1>
		<NuxtLink to="/"> Home page </NuxtLink>
		<Snackbar />
	</v-app>
</template>

<script setup lang="ts">
interface Props {
  error: Error;
}
const props = defineProps<Props>();

useHead({title: props.error.message});

definePageMeta({ auth: false });
</script>

<style scoped>
h1 {
	font-size: 20px;
}
</style>
