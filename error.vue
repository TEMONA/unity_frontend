<template>
	<NuxtLayout name="noauth">
		<v-app>
			<AtomsHeading :level="1" text="エラーが発生しました" class="mb-3" />
			<AtomsParagraph :text="error?.message" class="mb-2" />
			<div v-html="error?.stack" class="mb-3" />
			<div>
				<NuxtLink to="/users"> 社員一覧に戻る </NuxtLink>
			</div>
			<OrganismsSnackbar />
		</v-app>
	</NuxtLayout>
</template>

<script setup lang="ts">
useHead({ title: 'エラーが発生しました' });

import type { NuxtError } from '#app';

const props = defineProps({
	error: Object as () => NuxtError,
});
</script>

<style scoped>
h1 {
	font-size: 20px;
}
</style>
