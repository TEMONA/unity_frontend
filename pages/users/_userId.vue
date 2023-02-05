<template>
	<v-row class="user">
		<v-col cols="12" md="4" class="user__sidebar">
			<UserOverview v-bind="user" />
			<v-row>
				<v-col cols="6">
					<v-btn outlined block color="primary">チャットを開く</v-btn>
				</v-col>
				<v-col cols="6">
					<v-btn outlined block color="primary">meetsを依頼する</v-btn>
				</v-col>
				<v-col cols="12">
					<v-btn block color="primary">ランチを申請する</v-btn>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12" md="8">
			<v-chip-group class="mb-3">
				<v-chip v-for="tag in user.tags" :key="tag">
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

export default Vue.extend({
	head() {
		return {
			title: '社員詳細',
		}
	},
	data() {
		return {
			user: {
				image: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
				name: 'User Name',
				department: '〇〇',
				group: '〇〇',
				role: 'グループ長',
				chatworkId: '@chatwork_id',
				tags: ['エンジニア職', '勤続3年', 'Aグレード'],
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
