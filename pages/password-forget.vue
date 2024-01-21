<template>
	<v-row align="center">
		<v-col cols="10" md="6" offset="1" offset-md="3" class="login">
			<v-form :value="isValid" ref="email">
				<FormCard title="パスワード変更">
					<template v-slot:header>
						<v-stepper alt-labels :flat="true" v-model="step">
							<v-stepper-header>
								<v-stepper-step step="1">変更メール送信</v-stepper-step>
								<v-divider />
								<v-stepper-step step="2">パスワード変更</v-stepper-step>
								<v-divider />
								<v-stepper-step step="3">ログイン</v-stepper-step>
							</v-stepper-header>
						</v-stepper>
					</template>

					<template v-slot:default>
						<v-text-field
							label="メールアドレス"
							:hide-details="false"
							v-model="email"
							:rules="[requiredValidator, checkEmailValidator]"
						/>
					</template>

					<template v-slot:action>
						<v-btn color="primary" @click="handleSubmit">送信</v-btn>
					</template>
				</FormCard>
			</v-form>
		</v-col>
	</v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSnackbarStore } from '@/store/snackbar';
const snackbar = useSnackbarStore();

definePageMeta({ auth: false, layout: 'noauth' });
useHead({title: 'パスワードを忘れた方'});

const step = ref(1);
const email = ref('');
const isValid = ref(false);

function requiredValidator(value: string): boolean | string {
	return !!value || '必ず入力してください';
}

function checkEmailValidator(value: string): boolean | string {
	const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
	return regex.test(value) || 'メールアドレスの形式で入力してください';
}

function handleSubmit(): void {
	if (!checkEmailValidator(email.value)) {
		return
	}

	$fetch('/authen/users/resend_activation/', {
    method: 'POST',
    body: {
      email
    }
  })
		.then(() => {
			const successMessage = {
				status: 200,
				message: 'パスワード更新用メールを送信しました',
			}
			snackbar.displaySnackbar(successMessage)
		})
		.catch((err: any) => {
			const errorMessage = {
				status: err.response?.status || 500,
			}
			snackbar.displaySnackbar(errorMessage)
		})
}
</script>
