<template>
	<v-row class="users">
		<v-col cols="12" md="4" class="users__sidebar">
			<v-text-field
				single-line
				solo
				outlined
				dense
				label="氏名から社員を検索"
				v-model="search.form.name.value"
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
						v-for="(item, index) in search.form"
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
			<UserSearchResult
				:meta="meta"
				:users="users"
				:is-loading="isLoading"
				@changeMeta="searchUsersByMeta"
			/>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { SearchResultHeaderType } from '~/components/molecules/SearchResultHeader.vue'
import { UserListItemType } from '~/components/molecules/UserListItem.vue'
import { SearchResultMetaType } from '~/components/organisms/UserSearchResult.vue'

interface searchItemType {
	title: string
	value: string
}

interface searchType {
	form: {
		name: searchItemType
		headquarters: searchItemType
		department: searchItemType
		group: searchItemType
		jobDescription: searchItemType
	}
	meta: SearchResultMetaType & { [key: string]: number }
}

interface dataType {
	isLoading: boolean
	toggleSearchCard: boolean
	search: searchType
	meta: SearchResultHeaderType
	users: UserListItemType[]
}

export default Vue.extend({
	head() {
		return {
			title: '社員一覧',
		}
	},
	fetch({ store }) {
		const breadcrumbs: [] = []
		store.commit('updateBreadcrumbs', breadcrumbs)
	},
	data(): dataType {
		return {
			isLoading: true,
			toggleSearchCard: false,
			search: {
				form: {
					name: { title: '氏名', value: '' },
					headquarters: { title: '事業本部', value: '' },
					department: { title: '事業部', value: '' },
					group: { title: 'グループ', value: '' },
					jobDescription: { title: '業務内容', value: '' },
				},
				meta: {
					perPage: 30,
					page: 1,
				},
			},
			meta: {
				totalCount: 30,
				perPage: 3,
				currentPage: 1,
				totalPages: 1,
			},
			users: [],
		}
	},
	async mounted() {
		await this.searchUsers()
	},
	methods: {
		searchUsersByMeta(e: SearchResultMetaType) {
			Object.assign(this.search.meta, e, {})
			this.searchUsers()
		},
		async searchUsers() {
			this.isLoading = true
			const params: { [key: string]: string | number } = Object.entries(
				this.search.form,
			).reduce((object: { [key: string]: string }, item: any) => {
				object[item[0]] = item[1].value
				return object
			}, {})

			Object.keys(this.search.meta).forEach((key: string) => {
				params[key] = this.search.meta[key]
			})

			await this.$axios
				.get('/api/users/', { params: this.$toSnakeCaseObject(params) })
				.then(
					(res: {
						data: { records: UserListItemType[]; meta: SearchResultHeaderType }
					}) => {
						this.users.splice(
							0,
							this.users.length,
							...this.$toCamelCaseObjectArray(res.data.records),
						)
						Object.assign(this.meta, this.$toCamelCaseObject(res.data.meta), {})

						this.isLoading = false
					},
				)
				.catch((err: any) => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: err.response?.status || 500,
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
