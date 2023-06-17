<template>
	<v-row class="profile">
		<v-col cols="12" md="4" class="profile__sidebar">
			<UserOverview v-bind="overview" />

			<v-chip-group>
				<v-chip v-for="tag in tags" :key="tag">
					{{ tag }}
				</v-chip>
			</v-chip-group>
		</v-col>

		<v-col cols="12" md="8">
			<FormCard title="プロフィール編集">
				<template v-slot:default>
					<v-textarea
						v-for="(detail, index) in details"
						:key="index"
						v-model="detail.value"
						:label="detail.title"
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

interface detailType {
	title: string
	value: string
}

interface dataType {
	overview: UserOverviewType
	tags: string[]
	details: {
		birthPlace: detailType
		jobDescription: detailType
		career: detailType
		hobby: detailType
		specialty: detailType
		strengths: detailType
		message: detailType
	}
}

export default Vue.extend({
	head() {
		return {
			title: 'プロフィール編集',
		}
	},
	async asyncData({ app, $auth, $toCamelCaseObject }) {
		const response = await app.$axios
			.get(`/api/users/${$auth.user?.id}/`)
			.then((res: any) => {
				return {
					...res.data,
					overview: $toCamelCaseObject(res.data.overview),
					details: $toCamelCaseObject(res.data.details),
				}
			})
			.catch((err: any) => {
				this.$store.commit('snackbar/displaySnackbar', {
					status: err.response?.status || 500,
				})
				return {
					overview: {},
					tags: [],
					details: [],
				}
			})

		return { ...response }
	},
	fetch({ store, route }) {
		const breadcrumbs = [
			{
				text: 'プロフィール変更',
				href: route.fullPath,
				disabled: true,
			},
		]
		store.commit('updateBreadcrumbs', breadcrumbs)
	},
	data(): dataType {
		return {
			overview: {
				image: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
				name: 'User Name',
				email: '',
				nameKana: 'ホゲ',
				headquarters: '〇〇事業本部',
				department: '〇〇事業部',
				group: '〇〇グループ',
				role: 'グループ長',
				chatworkId: 'chatwork_id',
			},
			tags: [],
			details: {
				birthPlace: { title: '出身地', value: '' },
				jobDescription: { title: '業務内容、役割', value: '' },
				career: { title: '経歴、職歴', value: '' },
				hobby: { title: '趣味', value: '' },
				specialty: { title: '特技', value: '' },
				strengths: { title: 'アピールポイント', value: '' },
				message: { title: '最後にひとこと', value: '' },
			},
		}
	},
	methods: {
		handleSubmit() {
			const params = Object.fromEntries(
				Object.entries(this.details).map(([key, val]) => [key, val.value]),
			)
			this.$axios
				.patch(`/api/users/${this.$auth.user?.id}/`, {
					contents: { ...this.$toSnakeCaseObject(params) },
				})
				.then(() => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: 200,
						message: '社員情報を更新しました',
					})
				})
				.catch((err: any) => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: err.response?.status || 500,
						message: err.response.data.errors.join(' '),
					})
				})
		},
	},
})
</script>

<style lang="scss">
.profile {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
