<template>
	<v-row class="users">
		<v-col cols="12" md="4" class="users__sidebar">
			<v-text-field
				single-line
				solo
				outlined
				dense
				label="氏名・所属から社員を検索"
				hide-details="auto"
			>
				<template v-slot:prepend-inner>
					<v-btn icon>
						<v-icon>mdi-magnify</v-icon>
					</v-btn>
				</template>
				<template v-slot:append>
					<v-btn icon @click="toggleSearchCard = !toggleSearchCard">
						<v-icon>
							{{ toggleSearchCard ? 'mdi-close' : 'mdi-menu-open' }}
						</v-icon>
					</v-btn>
				</template>
			</v-text-field>

			<v-card v-if="toggleSearchCard">
				<v-card-text>
					<v-text-field
						label="氏名"
						hide-details="auto"
						v-model="search.name"
					/>
					<v-text-field
						label="事業部"
						hide-details="auto"
						v-model="search.department"
					/>
					<v-text-field
						label="グループ"
						hide-details="auto"
						v-model="search.group"
					/>
					<v-select
						:items="selectItems.role"
						hide-details="auto"
						label="役職"
						v-model="search.role"
					/>
					<v-select
						:items="selectItems.type"
						hide-details="auto"
						label="職種"
						v-model="search.type"
					/>
					<v-select
						:items="selectItems.grade"
						hide-details="auto"
						label="グレード"
						v-model="search.grade"
					/>
					<v-select
						:items="selectItems.workLength"
						hide-details="auto"
						label="勤続年数"
						v-model="search.workLength"
					/>
					<v-text-field
						label="業務内容"
						hide-details="auto"
						v-model="search.workDetail"
					/>
				</v-card-text>
				<v-divider />
				<v-card-actions>
					<v-spacer />
					<v-btn color="primary" @click="searchUsers">検索</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
		<v-col cols="12" md="8">
			<v-list two-line>
				<v-subheader>
					検索結果
					<v-spacer />
					<div class="mr-2">1-3 / 30</div>
					<v-icon>mdi-dots-vertical</v-icon>
				</v-subheader>

				<v-divider />

				<template v-for="(item, index) in users">
					<v-list-item :key="index" link>
						<v-list-item-avatar color="grey darken-1" />

						<v-list-item-content>
							<v-list-item-title>
								{{ item.name }}
								<span class="grey--text text-caption">
									{{ item.department }} {{ item.group }}
									{{ item.role }}
								</span>
							</v-list-item-title>

							<v-list-item-subtitle>
								{{ item.work }}
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	head() {
		return {
			title: '社員一覧',
		}
	},
	data() {
		return {
			toggleSearchCard: false,
			selectItems: {
				role: ['Foo', 'Bar', 'Fizz', 'Buzz'],
				type: ['Foo', 'Bar', 'Fizz', 'Buzz'],
				grade: ['Foo', 'Bar', 'Fizz', 'Buzz'],
				workLength: ['Foo', 'Bar', 'Fizz', 'Buzz'],
			},
			search: {
				name: '',
				department: '',
				group: '',
				role: '',
				type: '',
				grade: '',
				workLength: '',
				workDetail: '',
			},
			users: [
				{
					name: '氏名',
					department: '事業部',
					group: 'グループ',
					role: '役職',
					work: '業務内容を２行だけ表示...',
				},
			],
		}
	},
	methods: {
		searchUsers(): void {
			console.log('search')
		},
	},
})
</script>

<style lang="scss">
.users {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
