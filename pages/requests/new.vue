<template>
	<v-row class="request">
		<v-col cols="12" md="4" class="request__sidebar">
			<UserOverview v-bind="user" />

			<v-chip-group>
				<v-chip v-for="tag in user.tags" :key="tag">
					{{ tag }}
				</v-chip>
			</v-chip-group>
		</v-col>

		<v-col cols="12" md="8">
			<FormCard title="新規リクエスト作成">
				<template v-slot:default>
					<v-select
						:items="users"
						hide-details="auto"
						label="氏名"
						v-model="request.name"
						disabled
						hint="選択済みです"
						persistent-hint
						class="mt-3"
					/>

					<v-row no-gutters class="pt-3 mt-1">
						<v-col cols="12" class="text-subtitle-1">希望日時</v-col>
						<v-col cols="12" md="4" class="pa-2">
							<v-menu
								ref="menu1"
								v-model="datePickerIsActive[0]"
								:close-on-content-click="false"
								:return-value.sync="request.dates[0]"
								transition="scale-transition"
								offset-y
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										:value="request.dates[0]"
										label="第一希望"
										hide-details="auto"
										readonly
										v-bind="attrs"
										v-on="on"
										clear-icon="mdi-close-circle"
										clearable
										@click:clear="request.dates[0] = ''"
										class="mt-3"
									></v-text-field>
								</template>
								<v-date-picker v-model="request.dates[0]" no-title scrollable>
									<v-spacer></v-spacer>
									<v-btn
										text
										color="primary"
										@click="datePickerIsActive[0] = false"
									>
										Cancel
									</v-btn>
									<v-btn
										text
										color="primary"
										@click="$refs.menu1.save(request.dates[0])"
									>
										OK
									</v-btn>
								</v-date-picker>
							</v-menu>
						</v-col>
						<v-col cols="12" md="4" class="pa-2">
							<v-menu
								ref="menu2"
								v-model="datePickerIsActive[1]"
								:close-on-content-click="false"
								:return-value.sync="request.dates[1]"
								transition="scale-transition"
								offset-y
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										:value="request.dates[1]"
										label="第二希望"
										hide-details="auto"
										readonly
										v-bind="attrs"
										v-on="on"
										clear-icon="mdi-close-circle"
										clearable
										@click:clear="request.dates[1] = ''"
										class="mt-3"
									></v-text-field>
								</template>
								<v-date-picker v-model="request.dates[1]" no-title scrollable>
									<v-spacer></v-spacer>
									<v-btn
										text
										color="primary"
										@click="datePickerIsActive[1] = false"
									>
										Cancel
									</v-btn>
									<v-btn
										text
										color="primary"
										@click="$refs.menu2.save(request.dates[1])"
									>
										OK
									</v-btn>
								</v-date-picker>
							</v-menu>
						</v-col>
						<v-col cols="12" md="4" class="pa-2">
							<v-menu
								ref="menu3"
								v-model="datePickerIsActive[1]"
								:close-on-content-click="false"
								:return-value.sync="request.dates[2]"
								transition="scale-transition"
								offset-y
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										:value="request.dates[2]"
										label="第３希望"
										hide-details="auto"
										readonly
										v-bind="attrs"
										v-on="on"
										clear-icon="mdi-close-circle"
										clearable
										@click:clear="request.dates[2] = ''"
										class="mt-3"
									></v-text-field>
								</template>
								<v-date-picker v-model="request.dates[2]" no-title scrollable>
									<v-spacer></v-spacer>
									<v-btn
										text
										color="primary"
										@click="datePickerIsActive[2] = false"
									>
										Cancel
									</v-btn>
									<v-btn
										text
										color="primary"
										@click="$refs.menu3.save(request.dates[2])"
									>
										OK
									</v-btn>
								</v-date-picker>
							</v-menu>
						</v-col>
					</v-row>

					<v-textarea
						v-model="request.detail"
						name="detail"
						label="リクエスト詳細"
						auto-grow
						rows="1"
						class="mt-2"
					/>
				</template>
				<template v-slot:action>
					<v-btn color="primary" @click="handleSearch">申請</v-btn>
				</template>
			</FormCard>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	head() {
		return {
			title: 'リクエスト作成',
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
			users: ['フルネーム'],
			datePickerIsActive: [false, false, false],
			request: {
				name: 'フルネーム',
				status: '未承認',
				dates: ['', '', ''],
				detail:
					'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
			},
		}
	},
	methods: {
		handleSearch() {
			console.log('search')
		},
	},
})
</script>

<style lang="scss">
.request {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
