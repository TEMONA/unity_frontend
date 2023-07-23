<template>
	<v-app class="noauth">
		<v-app-bar app color="primary" class="white--text">
			<v-toolbar-title
				><nuxt-link to="/login" class="white--text noauth__logo">
					Unity - Temona SNS
				</nuxt-link>
			</v-toolbar-title>
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

<style lang="scss">
.noauth {
	&__logo {
		text-decoration: none;
	}
}
</style>
