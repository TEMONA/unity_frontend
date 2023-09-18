<template>
	<v-row class="request">
		<v-col cols="12" md="4" class="request__sidebar">
			<Paragraph text="リクエストを送る相手を選んでください" />
		</v-col>

		<v-col cols="12" md="8">
			<FormCard title="新規リクエスト作成">
				<template v-slot:default>
					<v-select
						:items="users"
						hide-details="auto"
						label="氏名"
						v-model="request.target"
						return-object
						multiple
						:rules="[rules.required]"
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
								:rules="[rules.required]"
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
								:rules="[rules.required]"
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
								:rules="[rules.required]"
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
						:rules="[rules.required]"
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

declare const gapi: any
declare const google: any

const DISCOVERY_DOC =
	'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = 'https://www.googleapis.com/auth/calendar'

interface dataType {
	tags: string[]
	users: { text: string; value: string; email: string }[]
	datePickerIsActive: boolean[]
	request: {
		target: { text: string; value: string; email: string }[]
		dates: Date[] | string[]
		detail: string
	}
	tokenClient: any
	gapiInited: any
	gisInited: any
	message: ''
	rules: {
		required(value: string | number): boolean | string
	}
}

export default Vue.extend({
	auth: false,
	head() {
		return {
			title: 'リクエスト作成',
			script: [
				{ src: 'https://apis.google.com/js/api.js', defer: true },
				{ src: 'https://accounts.google.com/gsi/client', defer: true },
			],
		}
	},
	fetch({ store, route }) {
		const breadcrumbs = [
			{
				text: 'リクエスト一覧',
				href: '/requests',
			},
			{
				text: 'リクエスト登録',
				href: route.fullPath,
				disabled: true,
			},
		]
		store.commit('updateBreadcrumbs', breadcrumbs)
	},
	data(): dataType {
		return {
			tags: [],
			users: [{ text: '選択してください', value: '', email: 'fuga' }],
			datePickerIsActive: [false, false, false],
			request: {
				target: [],
				dates: ['', '', ''],
				detail: '',
			},
			tokenClient: {},
			gapiInited: false,
			gisInited: false,
			message: '',
			rules: {
				required: (value) => !!value || '必ず入力してください',
			},
		}
	},
	async mounted() {
		await this.$axios
			.get('/api/users/', { params: { per_page: 999 } })
			.then((res: any) => {
				const users = res.data.records.map((item: any) => {
					return {
						text: item.name,
						value: item.user_id,
						email: item.email,
					}
				})
				this.users.splice(0, this.users.length, ...users)

				if (this.$route.query.users) {
					this.request.target = this.users.filter((item) => {
						return item.value === this.$route.query.users
					})
				}
			})
			.catch((err: any) => {
				this.$store.commit('snackbar/displaySnackbar', {
					status: err.response?.status || 500,
				})
			})
	},
	methods: {
		/**
		 * ランチリクエストのターゲットの配列から任意のキーのみを配列で出力する関数
		 *
		 * @param key 配列の値として選択したいキー
		 * @returns keyで指定された値のみを入れた配列
		 */
		listTargetByKey(key: 'text' | 'email' | 'value' = 'email') {
			return this.request.target.map((item) => {
				return item[key]
			})
		},
		/**
		 * google apiの読み込みを行う関数
		 *
		 * @returns なんかよくわからない値
		 */
		gapiLoaded() {
			return new Promise<void>((resolve, reject) => {
				gapi.load('client', () => resolve())
			})
		},
		/**
		 * google apiの初期化をする関数
		 *
		 */
		async initializeGapiClient() {
			await gapi.client.init({
				apiKey: this.$config.googleApiKey,
				discoveryDocs: [DISCOVERY_DOC],
			})
			this.gapiInited = true
		},
		/**
		 * Google Identity Servicesの読み込みとクライアントサイドのトークン初期化をする関数
		 *
		 */
		gisLoaded() {
			this.tokenClient = google.accounts.oauth2.initTokenClient({
				client_id: this.$config.googleClientId,
				scope: SCOPES,
				callback: '', // defined later
			})
			this.gisInited = true
		},
		/**
		 * 送信ボタン押下時にgoogle apiの読み込みからバックエンドへのリクエスト登録まで、全てをまとめる関数
		 *
		 */
		async handleInsertCalendar() {
			await this.gapiLoaded().then(() => {
				this.initializeGapiClient()
			})
			await this.gisLoaded()
			this.tokenClient.callback = async (res: any) => {
				if (res.error !== undefined) {
					throw res
				}
				await this.insertEvents()
			}
			if (gapi.client.getToken() === null) {
				// Prompt the user to select a Google Account and ask for consent to share their data
				// when establishing a new session.
				this.tokenClient.requestAccessToken({ prompt: 'consent' })
			} else {
				// Skip display of account chooser and consent dialog for an existing session.
				this.tokenClient.requestAccessToken({ prompt: '' })
			}

			await this.submitLunchRequest()
		},
		/**
		 * google calendar apiにイベント登録申請をする関数
		 *
		 */
		async insertEvents() {
			const attendees = [
				{ email: this.$auth.user.email, responseStatus: 'needsAction' },
			]
			attendees.push(
				...this.listTargetByKey().map((item) => {
					return { email: item, responseStatus: 'needsAction' }
				}),
			)
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
				attendees,
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
						status: err.status || 500,
					})
				})
		},
		/**
		 * バックエンドにリクエスト内容を送信する関数
		 *
		 */
		async submitLunchRequest() {
			// 候補日をフォーマットに合わせる
			const preferred_days = {
				first: this.request.dates[0],
				second: this.request.dates[1],
				third: this.request.dates[2],
			}

			await this.$axios
				.post(`/api/lunch-requests/`, {
					applicant: this.$auth.user?.id,
					recipient_calender_uid: this.listTargetByKey('value'),
					apply_content: this.request.detail,
					preferred_days,
				})
				.then((res: any) => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: 200,
						message:
							'リクエストを送信しました。Googleカレンダーをご確認ください',
					})
					this.$router.push('/requests')
				})
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
.request {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
