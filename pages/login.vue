<template>
	<v-row align="center">
		<v-col cols="10" md="6" offset="1" offset-md="3" class="login">
			<OrganismsFormCard title="ログイン">
				<template v-slot:default>
					<v-text-field
						label="メールアドレス"
						type="email"
						hide-details="auto"
						v-model="email"
						autocomplete="email"
					/>
					<v-text-field
						label="パスワード"
						type="password"
						hide-details="auto"
						v-model="password"
						autocomplete="current-password"
						class="mt-3"
					/>
				</template>
				<template v-slot:action>
					<v-btn color="primary" @click="login()" :disabled="isProcessing">
						ログイン
					</v-btn>
				</template>
			</OrganismsFormCard>
		</v-col>
	</v-row>
</template>

<script lang="ts" setup>
import { useSnackbarStore } from '@/store/snackbar';
const snackbar = useSnackbarStore();

const isProcessing = ref(false);

const { signIn } = useAuth();
const auth = ref({ email: '', password: '' });
const email = ref('');
const password = ref('');

async function login() {
	isProcessing.value = true;
	await signIn({ email: email.value, password: password.value })
		.then(() => {
			const successMessage = {
				status: 200,
				message: 'ログインしました',
			};
			snackbar.displaySnackbar(successMessage);
			isProcessing.value = false;
		})
		.catch((err: any) => {
			const errorMessage = {
				status: err.response?.status || 500,
			};
			snackbar.displaySnackbar(errorMessage);
			isProcessing.value = false;
		});
}
</script>
