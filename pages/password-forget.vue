<template>
	<v-row align="center">
		<v-col cols="10" md="6" offset="1" offset-md="3" class="login">
			<v-form :value="valid" ref="email">
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
							:rules="[rules.required, rules.isEmail]"
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

<script lang="ts">
import Vue from 'vue'

interface dataType {
	step: number
	email: string
	valid: boolean
	rules: {
		required(value: string | number): boolean | string
		isEmail(value: string): boolean | string
	}
}

export default Vue.extend({
	layout: 'noauth',
	head() {
		return {
			title: 'パスワードを忘れた方',
		}
	},
	data(): dataType {
		return {
			step: 1,
			email: '',
			valid: false,
			rules: {
				required: (value) => !!value || '必ず入力してください',
				isEmail: (value) =>
					/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/.test(
						value,
					) || 'メールアドレスの形式で入力してください',
			},
		}
	},
	methods: {
		handleSubmit(): void {
			if (!this.$refs.email.validate()) {
				return
			}

			this.$axios
				.post('/authen/users/resend_activation/', {
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
						status: err.response?.status || 500,
					})
				})
		},
	},
})
</script>
