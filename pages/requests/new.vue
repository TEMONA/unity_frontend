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
						v-model="requestForm.target"
						return-object
						multiple
						:rules="[rules.required]"
						class="mt-3"
					/>

					<v-row no-gutters class="pt-3 mt-1">
						<v-col cols="12" class="text-subtitle-1">希望日時</v-col>
						<v-col cols="12" class="pa-2">
							<v-text-field
								v-model="requestForm.dates[0]"
								label="第１希望"
								type="datetime-local"
								clear-icon="mdi-close-circle"
								clearable
								@click:clear="requestForm.dates[0] = ''"
								suffix="から１時間"
								:rules="[rules.required]"
								class="mt-3"
							/>
						</v-col>
						<v-col cols="12" class="pa-2">
							<v-text-field
								v-model="requestForm.dates[1]"
								label="第２希望"
								type="datetime-local"
								clear-icon="mdi-close-circle"
								clearable
								@click:clear="requestForm.dates[1] = ''"
								suffix="から１時間"
								:rules="[rules.required]"
								class="mt-3"
							/>
						</v-col>
						<v-col cols="12" class="pa-2">
							<v-text-field
								v-model="requestForm.dates[2]"
								label="第３希望"
								type="datetime-local"
								clear-icon="mdi-close-circle"
								clearable
								@click:clear="requestForm.dates[2] = ''"
								suffix="から１時間"
								:rules="[rules.required]"
								class="mt-3"
							/>
						</v-col>
					</v-row>

					<v-textarea
						v-model="requestForm.detail"
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

<script lang="ts" setup>
import { ref } from 'vue';

declare const gapi: any;
declare const google: any;

const DISCOVERY_DOC =
	'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

const runtimeConfig = useRuntimeConfig();

import { useSnackbarStore } from '@/store/snackbar';
const snackbar = useSnackbarStore();

import { useBreadcrumbsStore } from '@/store/breadcrumbs';
const breadcrumbs = useBreadcrumbsStore();
const route = useRoute();
breadcrumbs.updateBreadcrumbs([
	{
		text: 'ランチリクエスト一覧',
		href: '/resuqets/',
	},
	{
		text: 'ランチリクエスト申請',
		href: route.fullPath,
		disabled: true,
	},
]);

useHead({
	title: 'ランチリクエスト申請',
	script: [
		{ src: 'https://apis.google.com/js/api.js', defer: true },
		{ src: 'https://accounts.google.com/gsi/client', defer: true },
	],
});

interface getUsersDataType {
	text: string;
	value: string;
	email: string;
}

interface requestFormType {
	target: { text: string; value: string; email: string }[];
	dates: Date[] | string[];
	detail: string;
}

const users = ref<getUsersDataType[]>([
	{ text: '選択してください', value: '', email: 'fuga' },
]);

const requestForm = ref<requestFormType>({
	target: [],
	dates: ['', '', ''],
	detail: '',
});

const tokenClient = ref<any>({});
const gapiInited = ref<any>(false);
const gisInited = ref<any>(false);
const rules = {
	required: (value: any) => {
		!!value || '必ず入力してください';
	},
};

onMounted(() => {
	$fetch('/api/users/', { method: 'GET', params: { per_page: 999 } })
		.then((res: any) => {
			const usersResponse = res.data.records.map((item: any) => {
				return {
					text: item.name,
					value: item.user_id,
					email: item.email,
				};
			});
			users.value.splice(0, users.value.length, ...usersResponse);

			if (route.query.users) {
				requestForm.value.target = users.value.filter((item) => {
					return item.value === route.query.users;
				});
			}
		})
		.catch((err: any) => {
			const errorMessage = {
				status: err.response?.status || 500,
				message: 'メールアドレスかパスワードが正しくありません',
			};
			snackbar.displaySnackbar(errorMessage);
		});
});

/**
 * ランチリクエストのターゲットの配列から任意のキーのみを配列で出力する関数
 *
 * @param key 配列の値として選択したいキー
 * @returns keyで指定された値のみを入れた配列
 */
function listTargetByKey(key: 'text' | 'email' | 'value' = 'email'): string[] {
	return requestForm.value.target.map((item) => {
		return item[key];
	});
}

/**
 * google apiの読み込みを行う関数
 *
 * @returns なんかよくわからない値
 */
function gapiLoaded() {
	return new Promise<void>((resolve, reject) => {
		gapi.load('client', () => resolve());
	});
}

/**
 * google apiの初期化をする関数
 *
 */
async function initializeGapiClient() {
	await gapi.client.init({
		apiKey: runtimeConfig.googleApiKey,
		discoveryDocs: [DISCOVERY_DOC],
	});
	gapiInited.value = true;
}

/**
 * Google Identity Servicesの読み込みとクライアントサイドのトークン初期化をする関数
 *
 */
function gisLoaded() {
	tokenClient.value = google.accounts.oauth2.initTokenClient({
		client_id: runtimeConfig.googleClientId,
		scope: SCOPES,
		callback: '', // defined later
	});
	gisInited.value = true;
}

/**
 * 送信ボタン押下時にgoogle apiの読み込みからバックエンドへのリクエスト登録まで、全てをまとめる関数
 *
 */
async function handleInsertCalendar() {
	await gapiLoaded().then(() => {
		initializeGapiClient();
	});
	await gisLoaded();
	tokenClient.value.callback = async (res: any) => {
		if (res.error !== undefined) {
			throw res;
		}
		await insertEvents();
	};
	if (gapi.client.getToken() === null) {
		// Prompt the user to select a Google Account and ask for consent to share their data
		// when establishing a new session.
		tokenClient.value.requestAccessToken({ prompt: 'consent' });
	} else {
		// Skip display of account chooser and consent dialog for an existing session.
		tokenClient.value.requestAccessToken({ prompt: '' });
	}

	await submitLunchRequest();
}

/**
 * google calendar apiにイベント登録申請をする関数
 *
 */
async function insertEvents() {
	const attendees = [
		{
			email: 'hoge@example.com' /*$auth.user.email*/,
			responseStatus: 'needsAction',
		},
	];
	attendees.push(
		...listTargetByKey().map((item) => {
			return { email: item, responseStatus: 'needsAction' };
		}),
	);
	// リクエスト用のパラメータを生成
	const eventBaseParam = {
		summary: '【社内SNS Unity】ランチリクエスト',
		description: `ランチのリクエストが届いています。

【希望日時】
第一希望：${requestForm.value.dates[0]}
第二希望：${requestForm.value.dates[1]}
第三希望：${requestForm.value.dates[2]}

【リクエスト詳細】
${requestForm.value.detail}`,
		attendees,
		reminders: {
			useDefault: false,
			overrides: [{ method: 'email', minutes: 24 * 60 }],
		},
	};
	const targetDate = new Date(requestForm.value.dates[0]);
	const startDateParam = {
		dateTime: targetDate.toISOString(),
		timeZone: 'Asia/Tokyo',
	};
	targetDate.setHours(targetDate.getHours() + 1);
	const endDateParam = {
		dateTime: targetDate.toISOString(),
		timeZone: 'Asia/Tokyo',
	};
	Object.assign(
		eventBaseParam,
		{ start: startDateParam },
		{ end: endDateParam },
	);

	// Google Calendar APIにイベント登録リクエストを送信
	await gapi.client.calendar.events
		.insert({
			calendarId: 'primary',
			resource: eventBaseParam,
		})
		.then((res: any) => {
			const successMessage = {
				status: 200,
				message: 'リクエストを送信しました。Googleカレンダーをご確認ください',
			};
			snackbar.displaySnackbar(successMessage);
		})
		.catch((err: any) => {
			const errorMessage = {
				status: err.status || 500,
			};
			snackbar.displaySnackbar(errorMessage);
		});
}

/**
 * バックエンドにリクエスト内容を送信する関数
 *
 */
async function submitLunchRequest() {
	// 候補日をフォーマットに合わせる
	const preferred_days = {
		first: requestForm.value.dates[0],
		second: requestForm.value.dates[1],
		third: requestForm.value.dates[2],
	};

	await $fetch(`/api/lunch-requests/`, {
		method: 'POST',
		params: {
			applicant: 'hoge@example.com', //this.$auth.user?.id,
			recipient_calender_uid: listTargetByKey('value'),
			apply_content: requestForm.value.detail,
			preferred_days,
		},
	})
		.then((res: any) => {
			const successMessage = {
				status: 200,
				message: 'リクエストを送信しました。Googleカレンダーをご確認ください',
			};
			snackbar.displaySnackbar(successMessage);
		})
		.catch((err: any) => {
			const errorMessage = {
				status: err.status || 500,
			};
			snackbar.displaySnackbar(errorMessage);
		});
}
</script>

<style lang="scss">
.request {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
