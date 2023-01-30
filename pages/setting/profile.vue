<template>
	<v-row class="profile">
		<v-col cols="12" md="4" class="profile__sidebar">
			<v-avatar size="auto" width="100%" class="mb-2">
				<v-img :aspect-ratio="1" :src="user.image" alt="社員画像" />
			</v-avatar>

			<div class="text-center">
				<Heading :level="2" :text="user.name" class="font-weight-medium" />
				<Paragraph
					:text="`${user.department}事業部 ${user.group}グループ ${user.role}`"
					class="mb-1"
				/>
				<Paragraph :text="user.chatworkId" class="grey--text" />
				<v-chip-group>
					<v-chip v-for="tag in user.tags" :key="tag">
						{{ tag }}
					</v-chip>
				</v-chip-group>
			</div>
		</v-col>

		<v-col cols="12" md="8">
			<v-card class="align-end">
				<v-card-title>プロフィール編集</v-card-title>

				<v-card-text>
					<v-file-input accept="image/*" label="プロフィール画像" />
					<v-select
						:items="dates"
						hide-details="auto"
						label="出社曜日"
						v-model="profile.workDay"
						class="mt-3"
					/>
					<v-textarea
						v-model="profile.workDetail"
						label="業務内容"
						hide-details="auto"
						auto-grow
						rows="1"
						class="mt-3"
					/>
					<v-textarea
						v-model="profile.workRole"
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
					<v-text-field
						v-model="profile.birthplace"
						label="出身地"
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
						v-model="profile.point"
						label="アピールポイント"
						hide-details="auto"
						auto-grow
						rows="1"
						class="mt-3"
					/>
					<v-text-field
						v-model="profile.comment"
						label="最後にひとこと"
						hide-details="auto"
						class="mt-3"
					/>
				</v-card-text>
				<v-divider />
				<v-card-actions>
					<v-spacer />
					<v-btn color="primary" @click="handleSubmit">保存</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	head() {
		return {
			title: 'プロフィール編集',
		}
	},
	data() {
		return {
			dates: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日'],
			user: {
				image: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
				name: 'User Name',
				department: '〇〇',
				group: '〇〇',
				role: 'グループ長',
				chatworkId: '@chatwork_id',
				tags: ['エンジニア職', '勤続3年', 'Aグレード'],
			},
			profile: {
				image: '',
				birthplace: '',
				workDay: [],
				workDetail: '',
				workRole: '',
				career: '',
				hobby: '',
				specialty: '',
				point: '',
				comment: '',
			},
			datePickerIsActive: [false, false, false],
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
			console.log('submit')
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
