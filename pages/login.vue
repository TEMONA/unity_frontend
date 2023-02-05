<template>
	<v-row align="center">
		<v-col cols="10" md="6" offset="1" offset-md="3" class="login">
			<FormCard title="ログイン">
				<template v-slot:default>
					<v-text-field
						label="メールアドレス"
						:hide-details="false"
						v-model="email"
					/>
					<v-text-field label="パスワード" type="password" v-model="password" />
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
