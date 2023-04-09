<template>
	<v-row align="center">
		<v-col cols="10" md="6" offset="1" offset-md="3" class="login">
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
					/>
				</template>

				<template v-slot:action>
					<v-btn color="primary" @click="handleSubmit">送信</v-btn>
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
			title: 'パスワードを忘れた方',
		}
	},
	data() {
		return {
			step: 1,
			email: '',
		}
	},
	methods: {
		handleSubmit(): void {
			this.$axios
				.post('/authen/users/reset_password', {
					email: this.email,
				})
				.then(() => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: 200,
						message: 'パスワード更新用メールを送信しました',
					})
				})
				.catch((err: any) => {
					this.$store.commit('snackbar/displaySnackbar', {
						status: err.response.status,
					})
				})
		},
	},
})
</script>
