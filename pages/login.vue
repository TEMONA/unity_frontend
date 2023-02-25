<template>
	<v-row align="center">
		<v-col cols="10" md="6" offset="1" offset-md="3" class="login">
			<FormCard title="ログイン">
				<template v-slot:default>
					<v-text-field
						label="メールアドレス"
						type="email"
						hide-details="auto"
						v-model="email"
					/>
					<v-text-field
						label="パスワード"
						type="password"
						hide-details="auto"
						v-model="password"
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
			email: '',
			password: '',
		}
	},
	methods: {
		handleLogin(): void {
			const redirectTo = this.$route.query.to || '/mypage'
			this.$axios
				.post('/authen/jwt/create', {
					email: this.email,
					password: this.password,
				})
				.then((res: any) => {
					const { access, refresh } = res
					this.$store.dispatch('login', {
						authorization: { access, refresh },
						redirectTo,
					})
				})
				.catch((err: any) => {
					console.log(err)
					console.log(err.response)
					this.$store.commit('snackbar/displaySnackbar', {
						status: err.response.status,
						message: 'メールアドレスかパスワードが正しくありません',
					})
				})
		},
	},
})
</script>
