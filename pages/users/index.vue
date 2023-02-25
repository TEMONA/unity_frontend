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

			<FormCard v-if="toggleSearchCard" title="詳細検索">
				<template v-slot:default>
					<v-text-field
						label="氏名"
						hide-details="auto"
						v-model="search.name"
					/>
					<v-text-field
						label="事業部"
						hide-details="auto"
						v-model="search.department"
						class="mt-3"
					/>
					<v-text-field
						label="グループ"
						hide-details="auto"
						v-model="search.group"
						class="mt-3"
					/>
					<v-select
						:items="selectItems.role"
						hide-details="auto"
						label="役職"
						v-model="search.role"
						class="mt-3"
					/>
					<v-select
						:items="selectItems.type"
						hide-details="auto"
						label="職種"
						v-model="search.type"
						class="mt-3"
					/>
					<v-select
						:items="selectItems.grade"
						hide-details="auto"
						label="グレード"
						v-model="search.grade"
						class="mt-3"
					/>
					<v-select
						:items="selectItems.workLength"
						hide-details="auto"
						label="勤続年数"
						v-model="search.workLength"
						class="mt-3"
					/>
					<v-text-field
						label="業務内容"
						hide-details="auto"
						v-model="search.workDetail"
						class="mt-3"
					/>
				</template>
				<template v-slot:action>
					<v-btn color="primary" @click="searchUsers">検索</v-btn>
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
import { UserListType } from '~/components/organisms/UserList.vue'

interface dataType {
	toggleSearchCard: boolean
	selectItems: any
	search: any
	meta: {
		start: number
		end: number
		total: number
	}
	users: UserListType[]
}

export default Vue.extend({
	head() {
		return {
			title: '社員一覧',
		}
	},
	data(): dataType {
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
				headquarters: '',
				department: '',
				group: '',
				role: '',
				type: '',
				grade: '',
				workLength: '',
				workDetail: '',
			},
			meta: {
				start: 1,
				end: 3,
				total: 30,
			},
			users: [],
		}
	},
	methods: {
		searchUsers(): void {
			this.$axios
				.get('/api/users')
				.then((res: UserListType[]) => {
					this.users.splice(0, this.users.length, ...res)
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
.users {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
