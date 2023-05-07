<template>
	<v-app>
		<v-app-bar app color="primary" class="white--text">
			<v-app-bar-nav-icon @click="drawer = !drawer" class="white--text" />
			<v-toolbar-title>Unity - Temona SNS</v-toolbar-title>
			<v-spacer />
			<v-btn icon class="white--text">
				<v-icon>mdi-account-circle</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" fixed temporary>
			<v-list>
				<v-list-item v-for="[icon, text] in links" :key="icon" link>
					<v-list-item-icon>
						<v-icon>{{ icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<v-container class="mb-16">
				<Breadcrumbs :items="breadcrumbs" />
				<nuxt />
			</v-container>
			<Footer />
		</v-main>
		<Snackbar />
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data() {
		return {
			breadcrumbs: [
				{
					text: 'ダッシュボード',
					disabled: false,
					href: '/',
				},
			],
			drawer: null,

			links: [
				['mdi-inbox-arrow-down', 'Inbox'],
				['mdi-send', 'Send'],
				['mdi-delete', 'Trash'],
				['mdi-alert-octagon', 'Spam'],
			],
		}
	},
	head() {
		return {
			title: 'Unity',
			meta: [
				{
					hid: 'description',
					name: 'NuxtJs UI kit',
					content: 'NuxtJs UI kit is the best way',
				},
			],
		}
	},
	methods: {},
})
</script>
