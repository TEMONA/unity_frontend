<template>
	<NuxtLayout>
		<v-row class="profile">
			<v-col cols="12" md="4" class="profile__sidebar">
				<OrganismsUserOverview v-bind="userData?.overview" />

				<v-chip-group>
					<v-chip v-for="tag in userData?.tags" :key="tag">
						{{ tag }}
					</v-chip>
				</v-chip-group>
			</v-col>

			<v-col cols="12" md="8">
				<OrganismsFormCard title="プロフィール編集">
					<template v-slot:default>
						<v-textarea
							v-for="(detail, index) in userData?.details"
							:key="index"
							v-model="detail.value"
							:label="detail.title"
							hide-details="auto"
							auto-grow
							rows="1"
							class="mt-3"
						/>
					</template>
					<template v-slot:action>
						<v-btn color="primary" @click="handleSubmit">保存</v-btn>
					</template>
				</OrganismsFormCard>
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
		text: 'プロフィール編集',
		href: route.fullPath,
		disabled: true,
	},
]);

useHead({ title: 'プロフィール編集' });

import { useSnackbarStore } from '@/store/snackbar';
const snackbar = useSnackbarStore();
import { UserOverviewPropsType } from '~/components/organisms/UserOverview.vue';

type detailType = {
	title: string;
	value: string;
};
type getUserDataType = {
	overview: UserOverviewPropsType;
	tags: string[];
	details: {
		birthPlace: detailType;
		jobDescription: detailType;
		career: detailType;
		hobby: detailType;
		specialty: detailType;
		strengths: detailType;
		message: detailType;
	};
};

const userData = ref<getUserDataType>({
	overview: {
		image: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
		name: 'User Name',
		email: '',
		nameKana: 'ホゲ',
		headquarters: '〇〇事業本部',
		department: '〇〇事業部',
		group: '〇〇グループ',
		role: 'グループ長',
		chatworkId: 'chatwork_id',
	},
	tags: [],
	details: {
		birthPlace: { title: '出身地', value: '' },
		jobDescription: { title: '業務内容、役割', value: '' },
		career: { title: '経歴、職歴', value: '' },
		hobby: { title: '趣味', value: '' },
		specialty: { title: '特技', value: '' },
		strengths: { title: 'アピールポイント', value: '' },
		message: { title: '最後にひとこと', value: '' },
	},
});

const { $camelcaseKeys, $snakecaseKeys } = useNuxtApp();
const { data: getUserData, error } = await useFetch<getUserDataType>(
	`/api/users/hoge`, // ${$auth.user?.id}
);

if (getUserData && !error.value) {
	Object.assign(userData.value, getUserData, {});
} else {
	throw createError({
		statusCode: 404,
		message: 'ページが見つかりません。',
	});
}

async function handleSubmit() {
	const params = Object.fromEntries(
		Object.entries(userData.value.details).map(([key, val]) => [
			key,
			val.value,
		]),
	);
	await $fetch(`/api/users/hoge/`, {
		//${this.$auth.user?.id}
		method: 'PATCH',
		params: {
			contents: { ...$snakecaseKeys(params) },
		},
	})
		.then(() => {
			const successMessage = {
				status: 200,
				message: '社員情報を更新しました',
			};
			snackbar.displaySnackbar(successMessage);
		})
		.catch((err: any) => {
			const errorMessage = {
				status: err.response?.status || 500,
				message: err.response.data.errors.join(' '),
			};
			snackbar.displaySnackbar(errorMessage);
		});
}
</script>

<style lang="scss">
.profile {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
