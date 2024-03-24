<template>
	<NuxtLayout>
		<v-row class="password">
			<v-col cols="12" md="4" class="password__sidebar">
				<OrganismsUserOverview v-bind="getUserData?.overview" />

				<v-chip-group v-if="getUserData?.tags.length">
					<v-chip v-for="tag in getUserData.tags" :key="tag">
						{{ tag }}
					</v-chip>
				</v-chip-group>
			</v-col>

			<v-col cols="12" md="8">
				<v-form :value="isValid" ref="items">
					<OrganismsFormCard title="パスワード変更">
						<template v-slot:default>
							<v-text-field
								v-for="(item, index) in viewParams"
								:key="index"
								v-model="setPasswordParams[index]"
								:label="item.title"
								type="password"
								:autocomplete="item.autocomplete"
								hide-details="auto"
								required
								auto-grow
								rows="1"
								:rules="[...validationRules]"
								class="mt-3"
							/>
						</template>
						<template v-slot:action>
							<v-btn
								color="primary"
								@click="handleSubmit"
								:disabled="!setPasswordParams.newPassword"
							>
								保存
							</v-btn>
						</template>
					</OrganismsFormCard>
				</v-form>
			</v-col>
		</v-row>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import { useBreadcrumbsStore } from '@/store/breadcrumbs';
const breadcrumbs = useBreadcrumbsStore();
const route = useRoute();
breadcrumbs.updateBreadcrumbs([
	{
		text: 'パスワード変更',
		href: route.fullPath,
		disabled: true,
	},
]);

useHead({ title: 'パスワード変更' });

const { $snakecaseKeys } = useNuxtApp();
import { useSnackbarStore } from '@/store/snackbar';
const snackbar = useSnackbarStore();

import { UserOverviewPropsType } from '~/components/organisms/UserOverview.vue';

type getUserDataType = {
	overview: UserOverviewPropsType;
	tags: string[];
};

const { data } = useAuth();

const { data: getUserData, error } = await useFetchWithBaseURL<getUserDataType>(
	`/api/users/${data.id}/`, //エラー消えないけどとりあえず放置
);

if (!getUserData.value || error.value) {
	throw createError({
		statusCode: 404,
		message: 'ページが見つかりません。',
	});
}

const isValid = ref(false);
const validationRules = [
	(value: string | number) => !!value || '必ず入力してください',
	(value: string | number) =>
		String(value).length >= 8 || '８文字以上で入力してください',
];
const viewParams = {
	currentPassword: {
		title: '現在のパスワード',
		autocomplete: 'current-password',
	},
	newPassword: {
		title: '新しいパスワード',
		autocomplete: 'new-password',
	},
};
const setPasswordParams = ref({
	currentPassword: '',
	newPassword: '',
});

function handleSubmit() {
	if (!isValid) {
		return;
	}

	$fetch('/authen/users/set_password/', {
		method: 'POST',
		params: { ...$snakecaseKeys(setPasswordParams.value) },
	})
		.then(() => {
			const successMessage = {
				status: 200,
				message: 'パスワードを更新しました',
			};
			snackbar.displaySnackbar(successMessage);
		})
		.catch((err: any) => {
			let message = '';
			const keyMap: any = {
				current_password: '現在のパスワード',
				new_password: '新しいパスワード',
			};
			Object.keys(err.response.data).forEach((key) => {
				message += keyMap[key] + '：' + err.response.data[key][0];
			});

			const errorMessage = {
				status: err.response?.status || 500,
				message,
			};
			snackbar.displaySnackbar(errorMessage);
		});
}
</script>

<style lang="scss">
.password {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
