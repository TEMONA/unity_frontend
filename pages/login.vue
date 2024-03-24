<template>
	<NuxtLayout name="noauth">
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
						<v-btn
							color="primary"
							@click="login()"
							:disabled="isProcessing || !email || !password"
						>
							ログイン
						</v-btn>
					</template>
				</OrganismsFormCard>
			</v-col>
		</v-row>
	</NuxtLayout>
</template>

<script lang="ts" setup>
const isProcessing = ref(false);

const email = ref('');
const password = ref('');

const { signIn } = useAuth();
async function login() {
	isProcessing.value = true;
	await signIn(
		{ email: email.value, password: password.value },
		{ callbackUrl: '/users' },
	);
}
</script>
