<template>
	<v-app>
		<v-app-bar app color="primary" class="white--text">
			<v-toolbar-title>Unity - Temona SNS</v-toolbar-title>
		</v-app-bar>
		<v-main>
			<v-container class="mb-16 fill-height">
				<nuxt />
			</v-container>
		</v-main>
		<Snackbar />
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
