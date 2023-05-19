<template>
	<v-row class="requests">
		<v-col cols="12" md="4" class="requests__sidebar">
			<FormCard title="リクエストを検索">
				<template v-slot:default>
					<v-text-field
						label="相手の氏名"
						hide-details="auto"
						v-model="search.name"
					/>
					<v-row no-gutters class="pt-3 mt-1">
						<v-col cols="12" class="text-subtitle-1">リクエストの方向</v-col>
						<v-col>
							<v-checkbox
								v-model="search.direction.from"
								label="相手から"
								hide-details="auto"
								class="mt-0"
							/>
						</v-col>
						<v-col>
							<v-checkbox
								v-model="search.direction.to"
								label="自分から"
								hide-details="auto"
								class="mt-0"
							/>
						</v-col>
					</v-row>
					<v-row no-gutters class="pt-3 mt-1">
						<v-col cols="12" class="text-subtitle-1">承認状況</v-col>
						<v-col cols="6">
							<v-checkbox
								v-model="search.status.waiting"
								label="未承認"
								hide-details="auto"
								class="mt-0"
							/>
						</v-col>
						<v-col cols="6">
							<v-checkbox
								v-model="search.status.approved"
								label="承認済"
								hide-details="auto"
								class="mt-0"
							/>
						</v-col>
						<v-col cols="6">
							<v-checkbox
								v-model="search.status.denied"
								label="拒否済"
								hide-details="auto"
								class="mt-0"
							/>
						</v-col>
					</v-row>
					<v-menu
						ref="menu"
						v-model="datePickerIsActive"
						:close-on-content-click="false"
						:return-value.sync="search.dates"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								:value="dateRangeText"
								label="リクエスト日時（範囲）"
								hide-details="auto"
								readonly
								v-bind="attrs"
								v-on="on"
								clear-icon="mdi-close-circle"
								clearable
								@click:clear="search.dates = []"
								class="mt-3"
							></v-text-field>
						</template>
						<v-date-picker v-model="search.dates" no-title scrollable range>
							<v-spacer></v-spacer>
							<v-btn text color="primary" @click="datePickerIsActive = false">
								Cancel
							</v-btn>
							<v-btn
								text
								color="primary"
								@click="$refs.menu.save(search.dates)"
							>
								OK
							</v-btn>
						</v-date-picker>
					</v-menu>
				</template>
				<template v-slot:action>
					<v-btn color="primary" @click="searchRequests">検索</v-btn>
				</template>
			</FormCard>
		</v-col>

		<v-col cols="12" md="8">
			<UserSearchResult :meta="meta" :users="users" />
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	head() {
		return {
			title: 'リクエスト一覧',
		}
	},
	fetch({ store, route }) {
		const breadcrumbs = [
			{
				text: 'リクエスト一覧',
				href: route.fullPath,
				disabled: true,
			},
		]
		store.commit('updateBreadcrumbs', breadcrumbs)
	},
	data() {
		return {
			datePickerIsActive: false,
			search: {
				name: '',
				direction: {
					from: true,
					to: false,
				},
				status: {
					waiting: true,
					approved: false,
					denied: false,
				},
				dates: [],
			},
			meta: {
				start: 1,
				end: 3,
				total: 30,
			},
			users: [
				{
					image: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
					name: '氏名',
					department: '事業部',
					group: 'グループ',
					role: '役職',
					status: '承認済',
					detail: '業務内容を２行だけ表示...',
					direction: 'from',
				},
				{
					image: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
					name: '氏名',
					department: '事業部',
					group: 'グループ',
					role: '役職',
					status: '未承認',
					detail: '業務内容を２行だけ表示...',
					direction: 'to',
				},
			],
		}
	},
	computed: {
		dateRangeText(): string {
			return this.search.dates.join(' ~ ')
		},
	},
	methods: {
		searchRequests(): void {
			console.log('search')
		},
	},
})
</script>

<style lang="scss">
.requests {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
