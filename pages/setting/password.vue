<template>
	<v-row class="password">
		<v-col cols="12" md="4" class="password__sidebar">
			<UserOverview v-bind="overview" />

			<v-chip-group>
				<v-chip v-for="tag in tags" :key="tag">
					{{ tag }}
				</v-chip>
			</v-chip-group>
		</v-col>

		<v-col cols="12" md="8">
			<FormCard title="パスワード変更">
				<template v-slot:default>
					<v-text-field
						v-for="(item, index) in items"
						:key="index"
						v-model="item.value"
						:label="item.title"
						type="password"
						:autocomplete="item.autocomplete"
						hide-details="auto"
						auto-grow
						rows="1"
						class="mt-3"
					/>
				</template>
				<template v-slot:action>
					<v-btn color="primary" @click="handleSubmit">保存</v-btn>
				</template>
			</FormCard>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { UserOverviewType } from '~/components/organisms/UserOverview.vue'

interface itemType {
	title: string
	autocomplete: string
	value: string
}

interface dataType {
	overview: UserOverviewType
	tags: string[]
	items: {
		currentPassword: itemType
		newPassword: itemType
		newPasswordConfirm: itemType
	}
}

export default Vue.extend({
	head() {
		return {
			title: 'プロフィール編集',
		}
	},
	async asyncData({ app, store }) {
		const response = app.$axios
			.get(`/api/users/${store.state.authorization.userId}`)
			.catch((err: any) => {
				this.$store.commit('snackbar/displaySnackbar', {
					status: err.response.status,
				})
				return {
					overview: {},
					tags: [],
				}
			})

		return { ...response }
	},
	data(): dataType {
		return {
			overview: {
				image: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
				name: 'User Name',
				nameKana: 'ホゲ',
				headquarters: '〇〇事業本部',
				department: '〇〇事業部',
				group: '〇〇グループ',
				role: 'グループ長',
				chatworkId: 'chatwork_id',
			},
			tags: [],
			items: {
				currentPassword: {
					title: '現在のパスワード',
					autocomplete: 'current-password',
					value: '',
				},
				newPassword: {
					title: '新しいパスワード',
					autocomplete: 'new-password',
					value: '',
				},
				newPasswordConfirm: {
					title: '新しいパスワード（確認）',
					autocomplete: 'off',
					value: '',
				},
			},
		}
	},
	methods: {
		handleSubmit() {
			const params = Object.fromEntries(
				Object.entries(this.items).map(([key, value]) => [key, value.value]),
			)
			this.$axios
				.patch('/authen/users/set_password', {
					...this.$toSnakeCaseObject(params),
				})
				.then(() => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: 200,
						message: 'パスワードを更新しました',
					})
				})
				.catch((err: any) => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: err.response.status,
					})
				})
		},
	},
})
</script>

<style lang="scss">
.password {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
