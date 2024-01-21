<template>
	<v-row align="center">
		<v-col cols="10" md="6" offset="1" offset-md="3" class="login">
			<FormCard title="ログイン">
				<template v-slot:default>
					<v-text-field
						label="メールアドレス"
						type="email"
						hide-details="auto"
						v-model="auth.email"
						autocomplete="email"
					/>
					<v-text-field
						label="パスワード"
						type="password"
						hide-details="auto"
						v-model="auth.password"
						autocomplete="current-password"
						class="mt-3"
					/>
				</template>
				<template v-slot:action>
					<v-btn color="primary" @click="signIn(auth)" :disabled="!isProcessing">ログイン</v-btn>
				</template>
			</FormCard>
		</v-col>
	</v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSnackbarStore } from '@/store/snackbar';
const snackbar = useSnackbarStore();

const isProcessing = ref(false);

const { signIn } = useAuth();
const auth = ref({email: '',passowrd: ''});

const signIn = async (credentials) => {
	isProcessing.value = true

  const nuxt = useNuxtApp();
  const config = useTypedBackendConfig(useRuntimeConfig(), "refresh");

  const { path, method } = config.endpoints.signIn;
  const response = await _fetch(nuxt, path, {
    method,
    body: {
      ...credentials,
    },
  })
		.then(() => {
			isProcessing.value = false
		})
		.catch((err: any) => {
			const errorMessage = Object.keys(err?.response).length
				? {
						status: err.response?.status || 500,
						message: 'メールアドレスかパスワードが正しくありません',
					}
				: {
						status: 500,
						message:
							'サーバーの応答がありません。次回をおいて再度お試しください',
					}
			snackbar.displaySnackbar(errorMessage)

			isProcessing.value = false
		})
	;
};
</script>
