<template>
	<v-app>
		<Header />
		<Sidebar />
		<v-main>
			<Breadcrumbs :items="breadcrumbs" />
			<v-container class="mb-16">
				<nuxt />
			</v-container>
			<Footer />
		</v-main>
		<Snackbar />
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			breadcrumbs: [
				{
					text: 'ダッシュボード',
					disabled: false,
					href: '/',
				},
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
}
</script>
