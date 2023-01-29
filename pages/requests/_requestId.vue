<template>
	<v-row class="request">
		<v-col cols="12" md="4" class="request__sidebar">
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
				<v-row>
					<v-col cols="6">
						<v-btn outlined block color="primary">チャットを開く</v-btn>
					</v-col>
					<v-col cols="6">
						<v-btn outlined block color="primary">プロフィールを見る</v-btn>
					</v-col>
					<v-col v-if="request.direction === 'from'" cols="12">
						<v-btn block color="primary">日時を選択して申請を承認する</v-btn>
					</v-col>
					<v-col v-if="request.direction === 'to'" cols="6">
						<v-btn block color="primary">申請を編集する</v-btn>
					</v-col>
					<v-col v-if="request.direction === 'to'" cols="6">
						<v-btn block color="error">申請を削除する</v-btn>
					</v-col>
				</v-row>
			</div>
		</v-col>
		<v-col cols="12" md="8">
			<v-chip-group class="mb-3">
				<v-chip v-for="tag in user.tags" :key="tag">
					{{ tag }}
				</v-chip>
			</v-chip-group>

			<Paragraph class="text-h6">
				この人{{ request.direction === 'from' ? 'から' : 'へ' }}送られた
				<v-chip v-if="request.status" :color="chipColor">
					{{ request.status }}
				</v-chip>
				のリクエスト
			</Paragraph>

			<v-row>
				<v-col cols="12">
					<v-card>
						<v-card-title> 依頼日時 </v-card-title>

						<v-card-text>
							<Paragraph
								:key="index"
								v-for="(date, index) in request.dates"
								class="mb-2"
							>
								第{{ index + 1 }}希望：{{ date }}
							</Paragraph>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="12">
					<v-card>
						<v-card-title> 依頼詳細 </v-card-title>

						<v-card-text v-text="request.detail" />
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
			title: 'リクエスト詳細',
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
			},
			request: {
				direction: 'from',
				status: '未承認',
				dates: ['2023/1/1', '2023/1/2', '2023/1/3'],
				detail:
					'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
			},
		}
	},
	computed: {
		chipColor(): string {
			let color = ''
			switch (this.request.status) {
				case '承認済':
					color = 'primary'
					break

				case '未承認':
					color = 'warning'
					break

				case '拒否済':
					color = 'accent'
					break

				default:
					break
			}
			return color
		},
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
