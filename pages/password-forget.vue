<template>
	<NuxtLayout name="noauth">
		<v-row align="center">
			<v-col cols="10" md="6" offset="1" offset-md="3" class="login">
				<v-form :value="isValid" ref="email">
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
							<v-text-field
								label="メールアドレス"
								:hide-details="false"
								type="email"
								v-model="emailValue"
								:rules="[requiredValidator, checkEmailValidator]"
							/>
						</template>

						<template v-slot:action>
							<v-btn
								color="primary"
								@click="handleSubmit"
								:disabled="!emailValue"
							>
								送信
							</v-btn>
						</template>
					</OrganismsFormCard>
				</v-form>
			</v-col>
		</v-row>
	</NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false });
useHead({ title: 'パスワードを忘れた方' });

import { useSnackbarStore } from '@/store/snackbar';
const snackbar = useSnackbarStore();

const step = ref(1);

const emailValue = ref('');
const isValid = ref(false);

function requiredValidator(value: string): boolean | string {
	return !!value || '必ず入力してください';
}

function checkEmailValidator(value: string): boolean | string {
	const regex =
		/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
	return regex.test(value) || 'メールアドレスの形式で入力してください';
}

function handleSubmit(): void {
	if (!checkEmailValidator(emailValue.value)) {
		return;
	}

	$fetch('/authen/users/resend_activation/', {
		method: 'POST',
		body: {
			email: emailValue.value,
		},
	})
		.then(() => {
			const successMessage = {
				status: 200,
				message: 'パスワード更新用メールを送信しました',
			};
			snackbar.displaySnackbar(successMessage);
		})
		.catch((err: any) => {
			const errorMessage = {
				status: err.response?.status || 500,
			};
			snackbar.displaySnackbar(errorMessage);
		});
}
</script>
