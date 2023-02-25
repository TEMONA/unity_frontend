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
					<div v-if="step === 2">
						<v-text-field
							label="新しいパスワード"
							type="password"
							hide-details="auto"
							v-model="password"
						/>
						<v-text-field
							label="新しいパスワード（確認）"
							type="password"
							hide-details="auto"
							v-model="password_confirm"
						/>
					</div>
					<div v-else-if="step === 3">
						パスワードの変更が完了しました。<br />
						新しいパスワードでログインしてください。
					</div>
				</template>

				<template v-slot:action>
					<v-btn v-if="step === 2" color="primary" @click="handleChange">
						変更
					</v-btn>
					<v-btn v-else-if="step === 3" color="primary" href="/login">
						ログインページへ
					</v-btn>
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
			title: 'パスワード変更',
		}
	},
	data() {
		return {
			step: 2,
			password: '',
			password_confirm: '',
			isChanged: false,
		}
	},
	methods: {
		handleChange(): void {
			this.step++
		},
	},
})
</script>
