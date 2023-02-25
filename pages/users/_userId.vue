<template>
	<v-row class="user">
		<v-col cols="12" md="4" class="user__sidebar">
			<UserOverview v-bind="overview" />
			<v-row>
				<v-col cols="6">
					<v-btn
						:href="`https://www.chatwork.com/${user.chatworkId}`"
						outlined
						block
						color="primary"
						>チャットを開く</v-btn
					>
				</v-col>
				<v-col cols="6">
					<v-btn outlined block color="primary">meetsを依頼する</v-btn>
				</v-col>
				<v-col cols="12">
					<v-btn
						:href="`/requests/new?user_id=${user.user_id}`"
						block
						color="primary"
						>ランチを申請する</v-btn
					>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12" md="8">
			<v-chip-group class="mb-3">
				<v-chip v-for="tag in tags" :key="tag">
					{{ tag }}
				</v-chip>
			</v-chip-group>

			<v-row>
				<v-col cols="12" :key="index" v-for="(item, index) in user.details">
					<v-card>
						<v-card-title v-text="item.title" />

						<v-card-text v-text="item.text" />
					</v-card>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { UserOverviewType } from '~/components/organisms/UserOverview.vue'

interface dataType {
	overview: UserOverviewType
	tags: string[]
	user: any
}

export default Vue.extend({
	head() {
		return {
			title: '社員詳細',
		}
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
				chatworkId: '@chatwork_id',
			},
			tags: ['エンジニア職', '勤続3年', 'Aグレード'],
			user: {
				user_id: '',
				details: [
					{
						title: '業務内容',
						text: 'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
					},
					{
						title: '仕事の役割',
						text: 'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
					},
					{
						title: '経歴',
						text: 'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
					},
					{
						title: '趣味',
						text: 'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
					},
					{
						title: '特技、強み',
						text: 'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
					},
					{
						title: 'アピールポイント',
						text: 'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
					},
					{
						title: '最後にひとこと',
						text: 'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
					},
				],
			},
		}
	},
	created() {
		this.$axios
			.get('/api/users')
			.then((res: any) => {
				this.user = res
			})
			.catch((err: any) => {
				this.$store.commit('snackbar/displaySnackbar', {
					status: err.response.status,
				})
			})
	},
})
</script>

<style lang="scss">
.user {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
