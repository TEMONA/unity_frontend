<template>
	<v-row class="users">
		<v-col cols="12" md="4" class="users__sidebar">
			<v-text-field
				single-line
				solo
				outlined
				dense
				label="氏名から社員を検索"
				v-model="searchParams.form.name.value"
				hide-details="auto"
			>
				<template v-slot:prepend-inner>
					<v-btn icon @click="searchUsers">
						<v-icon>mdi-magnify</v-icon>
					</v-btn>
				</template>
				<template v-slot:append>
					<v-btn icon @click="isOpenSearchCard = !isOpenSearchCard">
						<v-icon>
							{{ isOpenSearchCard ? 'mdi-close' : 'mdi-menu-open' }}
						</v-icon>
					</v-btn>
				</template>
			</v-text-field>

			<FormCard v-if="isOpenSearchCard" title="詳細検索">
				<template v-slot:default>
					<v-text-field
						v-for="(item, index) in searchParams.form"
						:key="index"
						v-model="item.value"
						:label="item.title"
						hide-details="auto"
						class="mt-2"
					/>
				</template>
				<template v-slot:action>
					<v-btn color="primary" @click="searchUsers">検索</v-btn>
				</template>
			</FormCard>
		</v-col>
		<v-col cols="12" md="8">
			<UserSearchResult
				:meta="meta"
				:users="users"
				:is-loading="isLoading"
				@changeMeta="searchUsersByMeta"
			/>
		</v-col>
	</v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
	SearchResultHeaderPropsType,
	SearchResultEmitsParamsType,
} from '~/components/molecules/SearchResultHeader.vue';
import { UserListItemPropsType } from '~/components/molecules/UserListItem.vue';

import { useBreadcrumbsStore } from '@/store/breadcrumbs';
const breadcrumbs = useBreadcrumbsStore();
breadcrumbs.updateBreadcrumbs([]);

import { useSnackbarStore } from '@/store/snackbar';
const snackbar = useSnackbarStore();

useHead({ title: '社員一覧' });

interface searchItemType {
	title: string;
	value: string;
}

interface searchType {
	form: {
		name: searchItemType;
		headquarters: searchItemType;
		department: searchItemType;
		group: searchItemType;
		jobDescription: searchItemType;
	};
	meta: SearchResultEmitsParamsType;
}

const isLoading = ref(false);
const isOpenSearchCard = ref(false);

const searchParams = ref<searchType>({
	form: {
		name: { title: '氏名', value: '' },
		headquarters: { title: '事業本部', value: '' },
		department: { title: '事業部', value: '' },
		group: { title: 'グループ', value: '' },
		jobDescription: { title: '業務内容', value: '' },
	},
	meta: {
		perPage: 30,
		page: 1,
	},
});
const meta = ref<SearchResultHeaderPropsType>({
	totalCount: 30,
	perPage: 3,
	currentPage: 1,
});
const users = ref<UserListItemPropsType[]>([]);

const { $camelcaseKeys, $snakecaseKeys } = useNuxtApp();

/**
 * ユーザーを検索しその結果を格納する関数
 */
async function searchUsers() {
	isLoading.value = true;

	// 表示用のオブジェクト構成から検索用の構成に変更する
	const params: { [key: string]: string | number } = Object.entries(
		searchParams.value.form,
	).reduce((object: { [key: string]: string }, item: any) => {
		object[item[0]] = item[1].value;
		return object;
	}, {});
	Object.entries(searchParams.value.meta).forEach(([key, value]) => {
		params[key] = value;
	});

	await $fetch('/api/users/', {
		method: 'GET',
		params: $snakecaseKeys(params),
	})
		.then((res: any) => {
			users.value.splice(
				0,
				users.value.length,
				$camelcaseKeys(res.data.records),
			);
			Object.assign(meta.value, $camelcaseKeys(res.data.meta), {});

			isLoading.value = false;
		})
		.catch((err: any) => {
			const errorMessage = {
				status: err.response?.status || 500,
			};
			snackbar.displaySnackbar(errorMessage);

			isLoading.value = false;
		});
}

onMounted(async () => {
	await searchUsers();
});

function searchUsersByMeta(e: SearchResultEmitsParamsType) {
	Object.assign(searchParams.value.meta, e, {});
	searchUsers();
}
</script>

<style lang="scss">
.users {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
