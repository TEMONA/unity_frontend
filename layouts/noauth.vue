<template>
	<v-app class="noauth">
		<v-app-bar app color="primary" class="white--text">
			<v-toolbar-title>Unity - Temona SNS</v-toolbar-title>
		</v-app-bar>
		<v-main>
			<v-container class="mb-16 fill-height">
				<slot />
			</v-container>
		</v-main>
		<OrganismsSnackbar />
	</v-app>
</template>

<script setup></script>

<style lang="scss">
.noauth {
	&__logo {
		text-decoration: none;
	}
}
</style>
