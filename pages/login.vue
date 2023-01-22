<template>
	<v-row align="center">
		<v-col cols="10" md="6" offset="1" offset-md="3" class="login">
			<v-card class="align-end">
				<v-card-title>ログイン</v-card-title>
				<v-card-text>
					<v-text-field label="メールアドレス" v-model="email"></v-text-field>
					<v-text-field label="パスワード" v-model="password"></v-text-field>
				</v-card-text>
				<v-divider />
				<v-card-actions>
					<v-spacer />
					<v-btn color="primary" @click="handleLogin">ログイン</v-btn>
				</v-card-actions>
			</v-card>
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
			this.$store.dispatch('login', {
				authorization: { access: 'hoge', refresh: 'fuga' },
				redirectTo,
			})
			// this.$axios
			// 	.post('/auth/sign_in', {
			// 		email: this.email,
			// 		password: this.password,
			// 	})
			// 	.then((res: any) => {
			// 		console.log(res)
			// 	})
			// 	.catch((err: any) => {
			// 		console.log(err)
			// 		console.log(err.response)
			// 	})
		},
	},
})
</script>

<style lang="scss"></style>
