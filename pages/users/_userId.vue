<template>
	<v-row class="user">
		<v-col cols="12" md="4" class="user__sidebar">
			<UserOverview v-bind="overview" />
			<v-row class="mt-3">
				<v-col v-if="overview.chatworkId" cols="6">
					<v-btn
						:href="`https://www.chatwork.com/${overview.chatworkId}`"
						outlined
						block
						color="primary"
						>チャットを開く</v-btn
					>
				</v-col>
				<v-col cols="6">
					<v-btn
						href="https://calendar.google.com/calendar/u/0/r/day"
						outlined
						block
						color="primary"
					>
						meetsを依頼する
					</v-btn>
				</v-col>
				<v-col cols="12">
					<v-btn
						:href="`/requests/new?users=${$route.params.userId}`"
						block
						color="primary"
					>
						ランチを申請する
					</v-btn>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12" md="8">
			<v-chip-group class="mb-3">
				<v-chip
					v-for="tag in tags"
					:key="tag"
					:ripple="false"
					color="secondary"
				>
					{{ tag }}
				</v-chip>
			</v-chip-group>

			<v-row>
				<template v-for="(item, index) in details">
					<v-col v-if="item.value" cols="12" :key="index">
						<v-card>
							<v-card-title v-text="item.title" />

							<v-card-text v-html="item.value" />
						</v-card>
					</v-col>
				</template>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { UserOverviewType } from '~/components/organisms/UserOverview.vue'

interface dataType {
	overview: UserOverviewType
	tags: string[]
	details: any
}

export default Vue.extend({
	head() {
		return {
			title: '社員詳細',
		}
	},
	async asyncData({ app, route }) {
		const response = app.$axios
			.get(`/api/users/${route.params.userId}`)
			.catch((err: any) => {
				this.$store.commit('snackbar/displaySnackbar', {
					status: err.response?.status | 500,
				})
				return {
					overview: {},
					tags: [],
					details: [],
				}
			})

		return { ...response }
	},
	fetch({ store, route }) {
		const breadcrumbs = [
			{
				text: '社員詳細',
				href: route.fullPath,
				disabled: true,
			},
		]
		store.commit('updateBreadcrumbs', breadcrumbs)
	},
	data(): dataType {
		return {
			overview: {
				image: '',
				name: '',
				email: '',
				nameKana: '',
				headquarters: '',
				department: '',
				group: '',
			},
			tags: [''],
			details: {
				jobDescription: {
					title: '',
					value: '',
				},
				birth_place: {
					title: '',
					value: '',
				},
				career: {
					title: '',
					value: '',
				},
				hobby: {
					title: '',
					value: '',
				},
				specialty: {
					title: '',
					value: '',
				},
				strengths: {
					title: '',
					value: '',
				},
				message: {
					title: '',
					value: '',
				},
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
