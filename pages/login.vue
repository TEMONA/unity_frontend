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
					<v-btn color="primary" @click="handleLogin">ログイン</v-btn>
				</template>
			</FormCard>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	layout: 'noauth',
	head() {
		return {
			title: 'ログイン',
		}
	},
	data() {
		return {
			auth: {
				email: '',
				password: '',
			},
			processing: false,
		}
	},
	methods: {
		async handleLogin(): Promise<void> {
			this.processing = true
			await this.$auth
				.loginWith('local', { data: this.auth })
				.then(() => {
					this.processing = false
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
					this.$store.commit('snackbar/displaySnackbar', errorMessage)
					this.processing = false
				})
		},
	},
})
</script>
