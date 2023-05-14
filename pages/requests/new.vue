<template>
	<v-row class="request">
		<v-col cols="12" md="4" class="request__sidebar">
			<UserOverview v-if="$route.query.users" v-bind="overview" />
			<Paragraph v-else text="リクエストを送る相手を選んでください" />

			<v-chip-group v-if="tags.length">
				<v-chip v-for="tag in tags" :key="tag">
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
						:disabled="$route.query.users ? true : false"
						hint="選択済みです"
						persistent-hint
						class="mt-3"
					/>

					<v-row no-gutters class="pt-3 mt-1">
						<v-col cols="12" class="text-subtitle-1">希望日時</v-col>
						<v-col cols="12" class="pa-2">
							<v-text-field
								v-model="request.dates[0]"
								label="第１希望"
								type="datetime-local"
								clear-icon="mdi-close-circle"
								clearable
								@click:clear="request.dates[0] = ''"
								suffix="から１時間"
								class="mt-3"
							/>
						</v-col>
						<v-col cols="12" class="pa-2">
							<v-text-field
								v-model="request.dates[1]"
								label="第２希望"
								type="datetime-local"
								clear-icon="mdi-close-circle"
								clearable
								@click:clear="request.dates[1] = ''"
								suffix="から１時間"
								class="mt-3"
							/>
						</v-col>
						<v-col cols="12" class="pa-2">
							<v-text-field
								v-model="request.dates[2]"
								label="第３希望"
								type="datetime-local"
								clear-icon="mdi-close-circle"
								clearable
								@click:clear="request.dates[2] = ''"
								suffix="から１時間"
								class="mt-3"
							/>
						</v-col>
					</v-row>

					<v-textarea
						v-model="request.detail"
						name="detail"
						label="依頼文"
						auto-grow
						rows="1"
						class="mt-2"
					/>
				</template>
				<template v-slot:action>
					<v-btn color="primary" @click="handleInsertCalendar">申請</v-btn>
				</template>
			</FormCard>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Paragraph from '~/components/atoms/Paragraph.vue'
declare const gapi: any
declare const google: any

const DISCOVERY_DOC =
	'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = 'https://www.googleapis.com/auth/calendar'

export default Vue.extend({
	head() {
		return {
			title: 'リクエスト作成',
			script: [
				{ src: 'https://apis.google.com/js/api.js', defer: true },
				{ src: 'https://accounts.google.com/gsi/client', defer: true },
			],
		}
	},
	async asyncData({ app, route }) {
		let response = {}
		if (route.query.users) {
			response = app.$axios
				.get(`/api/users/${route.query.users}`)
				.catch((err: any) => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: err.response.status,
					})
					return {
						overview: {},
						tags: [],
					}
				})
		}

		return { ...response }
	},
	data() {
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
			tags: [],
			users: ['フルネーム'],
			datePickerIsActive: [false, false, false],
			request: {
				name: 'フルネーム',
				status: '未承認',
				dates: ['', '', ''],
				detail: '',
			},
			tokenClient: {} as any,
			gapiInited: false,
			gisInited: false,
			message: '',
		}
	},
	mounted() {
		if (this.$route.query.users) {
			this.request.name = this.overview.name
		}
	},
	methods: {
		gapiLoaded() {
			return new Promise<void>((resolve, reject) => {
				gapi.load('client', () => resolve())
			})
		},
		async initializeGapiClient() {
			await gapi.client.init({
				apiKey: this.$config.googleApiKey,
				discoveryDocs: [DISCOVERY_DOC],
			})
			this.gapiInited = true
		},
		gisLoaded() {
			this.tokenClient = google.accounts.oauth2.initTokenClient({
				client_id: this.$config.googleClientId,
				scope: SCOPES,
				callback: '', // defined later
			})
			this.gisInited = true
		},
		async handleInsertCalendar() {
			await this.gapiLoaded().then(() => {
				this.initializeGapiClient()
			})
			await this.gisLoaded()
			this.tokenClient.callback = async (res: any) => {
				if (res.error !== undefined) {
					throw res
				}
				await this.intertEvents()
			}
			if (gapi.client.getToken() === null) {
				// Prompt the user to select a Google Account and ask for consent to share their data
				// when establishing a new session.
				this.tokenClient.requestAccessToken({ prompt: 'consent' })
			} else {
				// Skip display of account chooser and consent dialog for an existing session.
				this.tokenClient.requestAccessToken({ prompt: '' })
			}
		},
		async intertEvents() {
			// リクエスト用のパラメータを生成
			const eventBaseParam = {
				summary: '【社内SNS Unity】ランチリクエスト',
				description: `ランチのリクエストが届いています。

【希望日時】
第一希望：${this.request.dates[0]}
第二希望：${this.request.dates[1]}
第三希望：${this.request.dates[2]}

【リクエスト詳細】
${this.request.detail}`,
				attendees: [
					{ email: this.$auth.user.email, responseStatus: 'needsAction' },
					{ email: 'kawashita@temona.co.jp', responseStatus: 'needsAction' },
				],
				reminders: {
					useDefault: false,
					overrides: [{ method: 'email', minutes: 24 * 60 }],
				},
			}
			const targetDate = new Date(this.request.dates[0])
			const startDateParam = {
				dateTime: targetDate.toISOString(),
				timeZone: 'Asia/Tokyo',
			}
			targetDate.setHours(targetDate.getHours() + 1)
			const endDateParam = {
				dateTime: targetDate.toISOString(),
				timeZone: 'Asia/Tokyo',
			}
			Object.assign(
				eventBaseParam,
				{ start: startDateParam },
				{ end: endDateParam },
			)

			// Google Calendar APIにイベント登録リクエストを送信
			await gapi.client.calendar.events
				.insert({
					calendarId: 'primary',
					resource: eventBaseParam,
				})
				.then((res: any) => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: 200,
						message:
							'リクエストを送信しました。Googleカレンダーをご確認ください',
					})
				})
				.catch((err: any) => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: err.status,
					})
				})
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
