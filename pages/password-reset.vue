<template>
	<NuxtLayout name="noauth">
		<v-row align="center">
			<v-col cols="10" md="6" offset="1" offset-md="3" class="login">
				<OrganismsFormCard title="パスワード変更">
					<template v-slot:header>
						<v-stepper alt-labels :flat="true" :model-value="step">
							<v-stepper-header>
								<v-stepper-item title="変更メール送信" :value="1" />
								<v-divider />
								<v-stepper-item title="パスワード変更" :value="2" />
								<v-divider />
								<v-stepper-item title="ログイン" :value="3" />
							</v-stepper-header>
						</v-stepper>
					</template>

					<template v-slot:default>
						<div v-if="step === 2">
							<v-text-field
								label="新しいパスワード"
								type="password"
								hide-details="auto"
								v-model="password"
								:rules="[requiredValidator, passwordValidator]"
								class="mb-3"
							/>
							<v-text-field
								label="新しいパスワード（確認）"
								type="password"
								hide-details="auto"
								v-model="password_confirm"
								:rules="[requiredValidator, confirmValidator]"
							/>
						</div>
						<AtomsParagraph v-else-if="step === 3">
							パスワードの変更が完了しました。<br />
							新しいパスワードでログインしてください。
						</AtomsParagraph>
					</template>

					<template v-slot:action>
						<v-btn
							v-if="step === 2"
							color="primary"
							:disabled="
								password && password === password_confirm ? false : true
							"
							@click="handleChange"
						>
							このパスワードに変更する
						</v-btn>
						<v-btn v-else-if="step === 3" color="primary" href="/login">
							ログインページへ
						</v-btn>
					</template>
				</OrganismsFormCard>
			</v-col>
		</v-row>
	</NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false });
useHead({ title: 'パスワード変更' });

import { useSnackbarStore } from '@/store/snackbar';
const snackbar = useSnackbarStore();
const route = useRoute();

const step = ref(2);

const uid = ref<string | string[]>('');
const token = ref<string | string[]>('');

onMounted(() => {
	uid.value = route.params.uid;
	token.value = route.params.token;

	if (!uid || !token) {
		const errorMessage = {
			status: 400,
			message:
				'必要なパラメータが存在しません。パスワード変更メールのリンクからアクセスしてください',
		};
		snackbar.displaySnackbar(errorMessage);
		navigateTo('/password-forget');
	}
});

const password = ref('');

function requiredValidator(value: string): boolean | string {
	return !!value || '必ず入力してください';
}

function passwordValidator(value: string): boolean | string {
	return String(value).length >= 8 || '８文字以上で入力してください';
}

const password_confirm = ref('');

function confirmValidator(value: string): boolean | string {
	return value === password.value || 'パスワードと一致しません';
}

function handleChange(): void {
	if (password.value !== password_confirm.value) {
		const errorMessage = {
			status: 401,
			message: 'パスワードが一致しません',
		};
		snackbar.displaySnackbar(errorMessage);
		return;
	}

	$fetch('/authen/users/reset_password_confirm', {
		method: 'POST',
		body: {
			uid,
			token,
			new_password: password,
		},
	})
		.then(() => {
			const successMessage = {
				status: 200,
				message: 'パスワードを更新しました',
			};
			snackbar.displaySnackbar(successMessage);
			step.value++;
		})
		.catch((err: any) => {
			const errorMessage = {
				status: err.response?.status || 500,
			};
			snackbar.displaySnackbar(errorMessage);
		});
}
</script>
