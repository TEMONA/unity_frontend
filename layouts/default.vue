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
					<template v-slot:prepend>
						<v-icon>
							{{ item.icon }}
						</v-icon>
					</template>
					<v-list-item-title v-text="item.title" />
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<v-container class="mb-16">
				<OrganismsBreadcrumbs />
				<slot />
			</v-container>
			<OrganismsFooter />
			<OrganismsSnackbar />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import { mdiAccountGroup, mdiSend, mdiCog, mdiLockReset } from '@mdi/js'; // todo.VSCodeが型定義ないってエラー吐くけどめんどいから放置

const drawer = ref(false);
const links = [
	{ icon: mdiAccountGroup, title: '社員一覧', link: '/users' },
	{
		icon: mdiSend,
		title: 'ランチリクエスト一覧',
		link: '/requests',
	},
	{
		icon: mdiCog,
		title: 'プロフィール設定',
		link: '/setting/profile',
	},
	{
		icon: mdiLockReset,
		title: 'パスワード変更',
		link: '/setting/password',
	},
];
</script>
