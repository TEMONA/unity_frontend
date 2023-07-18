<template>
	<v-app>
		<v-app-bar app color="primary" class="white--text">
			<v-app-bar-nav-icon @click="drawer = !drawer" class="white--text" />
			<v-toolbar-title>Unity - Temona SNS</v-toolbar-title>
			<v-spacer />
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" fixed temporary>
			<v-list>
				<v-list-item
					v-for="(item, index) in links"
					:key="index"
					:to="item.link"
					nuxt
				>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
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

interface dataType {
	drawer: boolean
	links: { icon: string; title: string; link: string }[]
}

export default Vue.extend({
	data(): dataType {
		return {
			drawer: false,

			links: [
				{ icon: 'mdi-account-group', title: '社員一覧', link: '/users' },
				{ icon: 'mdi-send', title: 'ランチリクエスト一覧', link: '/requests' },
				{
					icon: 'mdi-cog',
					title: 'プロフィール設定',
					link: '/setting/profile',
				},
				{
					icon: 'mdi-lock-reset',
					title: 'パスワード変更',
					link: '/setting/password',
				},
			],
		}
	},
	computed: {
		breadcrumbs() {
			return this.$store.getters.breadcrumbs
		}
	},
	head() {
		return {
			title: '社内SNS「Unity」',
			meta: [
				{
					hid: 'description',
					name: '社内SNS「Unity」',
					content: 'テモナ社内の交流を深めるためのSNSです',
				},
			],
		}
	},
})
</script>
