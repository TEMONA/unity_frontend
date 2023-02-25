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
						v-model="profile.jobDescription"
						label="業務内容"
						hide-details="auto"
						auto-grow
						rows="1"
						class="mt-3"
					/>
					<v-textarea
						v-model="profile.jobRole"
						label="仕事の役割"
						hide-details="auto"
						auto-grow
						rows="1"
						class="mt-3"
					/>
					<v-textarea
						v-model="profile.career"
						label="経歴"
						hide-details="auto"
						auto-grow
						rows="1"
						class="mt-3"
					/>
					<v-textarea
						v-model="profile.hobby"
						label="趣味"
						hide-details="auto"
						auto-grow
						rows="1"
						class="mt-3"
					/>
					<v-textarea
						v-model="profile.specialty"
						label="特技、強み"
						hide-details="auto"
						auto-grow
						rows="1"
						class="mt-3"
					/>
					<v-textarea
						v-model="profile.strengths"
						label="アピールポイント"
						hide-details="auto"
						auto-grow
						rows="1"
						class="mt-3"
					/>
					<v-text-field
						v-model="profile.message"
						label="最後にひとこと"
						hide-details="auto"
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

interface dataType {
	overview: UserOverviewType
	tags: string[]
	profile: {
		jobDescription: string
		jobRole: string
		career: string
		hobby: string
		specialty: string
		strengths: string
		message: string
	}
	request: any
}

export default Vue.extend({
	head() {
		return {
			title: 'プロフィール編集',
		}
	},
	async asyncData({ app, store, route }) {
		const response = app.$axios
			.get(`/api/users/${store.state.authorization.userId}`)
			.then((res: any) => {
				const { overview, tags, detail } = res
				const profile = Object.keys(detail).reduce((target: any, key) => {
					target[key] = detail[key].text
					return target
				}, {})

				return { overview, tags, profile }
			})
			.catch((err: any) => {
				this.$store.commit('snackbar/displaySnackbar', {
					status: err.response.status,
				})
			})

		return { ...response }
	},
	data(): dataType {
		return {
			overview: {
				image: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
				name: 'User Name',
				headquarters: '〇〇事業本部',
				department: '〇〇事業部',
				group: '〇〇グループ',
				role: 'グループ長',
				chatworkId: 'chatwork_id',
			},
			tags: [],
			profile: {
				jobDescription: '',
				jobRole: '',
				career: '',
				hobby: '',
				specialty: '',
				strengths: '',
				message: '',
			},
			request: {
				name: 'フルネーム',
				status: '未承認',
				dates: ['2023/1/1', '2023/1/2', '2023/1/3'],
				detail:
					'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
			},
		}
	},
	methods: {
		handleSubmit() {
			this.$axios
				.patch('/api/users/', {
					user_id: this.$store.state.authorization.userId,
					contents: { ...this.$toSnakeCaseObject(this.profile) },
				})
				.then(() => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: 200,
						message: '社員情報を更新しました',
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
