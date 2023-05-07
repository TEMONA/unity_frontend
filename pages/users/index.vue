<template>
	<v-row class="users">
		<v-col cols="12" md="4" class="users__sidebar">
			<v-text-field
				single-line
				solo
				outlined
				dense
				label="氏名から社員を検索"
				v-model="search.name.value"
				hide-details="auto"
			>
				<template v-slot:prepend-inner>
					<v-btn icon @click="searchUsers">
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
						v-for="(item, index) in search"
						:key="index"
						v-model="item.value"
						:label="item.title"
						hide-details="auto"
						class="mt-2"
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

interface searchItemType {
	title: string
	value: string
}

interface searchType {
	name: searchItemType
	headquarters: searchItemType
	department: searchItemType
	group: searchItemType
	jobDescription: searchItemType
}

interface dataType {
	toggleSearchCard: boolean
	search: searchType
	meta: {
		total: number
		limit: number
		page: number
		limitPerPage: number
	}
	users: UserListType[]
}

export default Vue.extend({
	head() {
		return {
			title: '社員一覧',
		}
	},
	async asyncData({ app, store }) {
		const response = app.$axios
			.get(`/api/users`)
			.then((res: any) => {
				return {
					users: this.$toCamelCaseObjectArray(res.users),
					meta: this.$toCamelCaseObject(res.meta),
				}
			})
			.catch((err: any) => {
				store.commit('snackbar/displaySnackbar', {
					status: err.response?.status | 500,
				})
				return { users: [], meta: {} }
			})

		return { ...response }
	},
	data(): dataType {
		return {
			toggleSearchCard: false,
			search: {
				name: { title: '氏名', value: '' },
				headquarters: { title: '事業本部', value: '' },
				department: { title: '事業部', value: '' },
				group: { title: 'グループ', value: '' },
				jobDescription: { title: '業務内容', value: '' },
			},
			meta: {
				total: 30,
				limit: 3,
				page: 1,
				limitPerPage: 10,
			},
			users: [],
		}
	},
	methods: {
		searchUsers(): void {
			const params = Object.entries(this.search).reduce(
				(object: { [key: string]: string }, item: any) => {
					object[item[0]] = item[1].value
					return object
				},
				{},
			)
			this.$axios
				.get('/api/users', this.$toSnakeCaseObject(params))
				.then((res: UserListType[]) => {
					this.users.splice(
						0,
						this.users.length,
						...this.$toCamelCaseObjectArray(res),
					)
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
