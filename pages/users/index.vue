<template>
	<v-row class="users">
		<v-col cols="12" md="4" class="users__sidebar">
			<v-text-field
				single-line
				solo
				outlined
				dense
				label="氏名から社員を検索"
				v-model="searchQuery.name"
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

			<OrganismsFormCard v-if="isOpenSearchCard" title="詳細検索">
				<template v-slot:default>
					<v-text-field
						v-for="(item, index) in viewParams"
						:key="index"
						v-model="searchQuery[index]"
						:label="item"
						hide-details="auto"
						class="mt-2"
					/>
				</template>
				<template v-slot:action>
					<v-btn color="primary" @click="searchUsers">検索</v-btn>
				</template>
			</OrganismsFormCard>
		</v-col>
		<v-col cols="12" md="8">
			<UserSearchResult
				:meta="getUsersData?.meta"
				:users="getUsersData?.records"
				:is-loading="pending"
				@changeMeta="searchUsers"
			/>
		</v-col>
	</v-row>
</template>

<script lang="ts" setup>
import { useBreadcrumbsStore } from '@/store/breadcrumbs';
const breadcrumbs = useBreadcrumbsStore();
breadcrumbs.updateBreadcrumbs([]);

useHead({ title: '社員一覧' });

import { ref } from 'vue';
import {
	SearchResultHeaderPropsType,
	SearchResultEmitsParamsType,
} from '~/components/molecules/SearchResultHeader.vue';
import { UserListItemPropsType } from '~/components/molecules/UserListItem.vue';

const isOpenSearchCard = ref(false);

type searchResultType = {
	records: UserListItemPropsType[];
	meta: SearchResultHeaderPropsType;
};

const viewParams = {
	name: '氏名',
	headquarters: '事業本部',
	department: '事業部',
	group: 'グループ',
	jobDescription: '業務内容',
};
const searchQuery = ref({
	name: '',
	headquarters: '',
	department: '',
	group: '',
	jobDescription: '',
	perPage: 30,
	page: 1,
});
const {
	data: getUsersData,
	pending,
	error,
	refresh,
} = await useFetch<searchResultType>('/api/users', {
	query: { ...searchQuery.value },
});

if (!getUsersData.value || error.value) {
	throw createError({
		statusCode: 404,
		message: 'ページが見つかりません。',
	});
}

function searchUsers(e: SearchResultEmitsParamsType) {
	Object.assign(searchQuery.value, e, {});
	refresh();
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
