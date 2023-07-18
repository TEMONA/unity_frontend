<template>
	<v-navigation-drawer v-model="drawer" app :clipped="true">
		<v-sheet color="light-blue lighten-5">
			<v-container>
				<v-row align="center">
					<v-col cols="4">
						<v-avatar color="light-blue darken-1">
							<v-avatar color="amber">
								<span class="black--text text-h5">HK</span>
							</v-avatar>
						</v-avatar>
					</v-col>
					<v-col cols="8">
						<div class="black--text">川下 治城</div>
					</v-col>
				</v-row>
			</v-container>
		</v-sheet>

		<v-divider></v-divider>

		<v-list>
			<v-list-item
				v-for="[icon, text, link] in links"
				:key="icon"
				:to="link"
				:exact-path="true"
				exact-active-class="light-blue lighten-5"
				nuxt
			>
				<v-list-item-icon>
					<v-icon class="black--text">{{ icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title class="black--text">{{ text }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'Sidebar',
	data() {
		return {
			drawer: null,
			links: [
				['mdi-home-outline', 'ダッシュボード', '/'],
				['mdi-briefcase-outline', 'ジョブ', '/jobs'],
				['mdi-sitemap-outline', 'スキル', '/skills'],
				['mdi-account-cog-outline', 'アカウント情報', '/settings'],
			],
		}
	},
})
</script>
