<template>
	<v-row class="requests">
		<v-col cols="12" md="4" class="requests__sidebar">
			<v-row>
				<v-col cols="12">
					<FormCard title="リクエストを検索">
						<template v-slot:default>
							<v-text-field
								label="相手の氏名"
								hide-details="auto"
								v-model="search.name"
							/>
							<v-row no-gutters class="pt-3 mt-1">
								<v-col cols="12" class="text-subtitle-1"
									>リクエストの方向</v-col
								>
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
									<v-btn
										text
										color="primary"
										@click="datePickerIsActive = false"
									>
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
				<v-col cols="12">
					<v-btn to="/requests/new" nuxt block color="primary">
						新しくランチを申請する
					</v-btn>
				</v-col>
			</v-row>
		</v-col>

		<v-col cols="12" md="8">
			<RequestSearchResult :meta="meta" :requests="requests" />
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { SearchResultHeaderType } from '~/components/molecules/SearchResultHeader.vue'
import { RequestListItemType } from '~/components/molecules/RequestListItem.vue'
import { SearchResultMetaType } from '~/components/organisms/UserSearchResult.vue'

interface searchItemType {
	title: string
	value: string
}

interface searchType {
	name: string
	direction: {
		from: boolean
		to: boolean
	}
	dates: string[]
	meta: SearchResultMetaType & { [key: string]: number }
}

interface dataType {
	isLoading: boolean
	datePickerIsActive: boolean
	search: searchType
	meta: SearchResultHeaderType
	requests: RequestListItemType[]
}

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
	data(): dataType {
		return {
			isLoading: true,
			datePickerIsActive: false,
			search: {
				name: '',
				direction: {
					from: true,
					to: false,
				},
				dates: [],
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
			requests: [],
		}
	},
	async mounted() {
		await this.searchRequests()
	},
	computed: {
		dateRangeText(): string {
			return this.search.dates.join(' ~ ')
		},
	},
	methods: {
		async searchRequests() {
			this.isLoading = true
			const params: { [key: string]: string | number } = Object.entries(
				this.search,
			).reduce((object: { [key: string]: string }, item: any) => {
				object[item[0]] = item[1].value
				return object
			}, {})

			Object.keys(this.search.meta).forEach((key: string) => {
				params[key] = this.search.meta[key]
			})

			await this.$axios
				.get('/api/lunch-requests/', {
					params: this.$toSnakeCaseObject(params),
				})
				.then(
					(res: {
						data: {
							records: RequestListItemType[]
							meta: SearchResultHeaderType
						}
					}) => {
						this.requests.splice(
							0,
							this.requests.length,
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
.requests {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
