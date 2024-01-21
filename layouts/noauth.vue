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
				<slot />
			</v-container>
		</v-main>
		<Snackbar />
	</v-app>
</template>

<script setup>
definePageMeta({ auth: false });
</script>

<style lang="scss">
.noauth {
	&__logo {
		text-decoration: none;
	}
}
</style>
