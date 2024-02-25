<template>
	<v-row class="requests">
		<v-col cols="12" md="4" class="requests__sidebar">
			<v-row>
				<v-col cols="12">
					<FormCard title="リクエストを検索">
						<template v-slot:default>
							<v-text-field
								label="相手の氏名"
								hide-details="auto"
								v-model="searchQuery.name"
							/>
							<v-row no-gutters class="pt-3 mt-1">
								<v-col cols="12" class="text-subtitle-1"
									>リクエストの方向</v-col
								>
								<v-col>
									<v-checkbox
										v-model="searchQuery.direction.from"
										label="相手から"
										hide-details="auto"
										class="mt-0"
									/>
								</v-col>
								<v-col>
									<v-checkbox
										v-model="searchQuery.direction.to"
										label="自分から"
										hide-details="auto"
										class="mt-0"
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-text-field
									:value="dateRangeText"
									label="リクエスト日（範囲）"
									hide-details="auto"
									readonly
									clear-icon="mdi-close-circle"
									clearable
									@click:clear="searchQuery.dates = []"
									class="mt-3"
								></v-text-field>
								<v-btn color="primary" @click="isActiveDatePicker = true">
									日付を選ぶ
									<v-dialog v-model="isActiveDatePicker">
										<v-date-picker
											show-adjacent-months
											multiple="range"
											v-model="searchQuery.dates"
											@click:save="isActiveDatePicker = false"
											@click:cancel="isActiveDatePicker = false"
										>
										</v-date-picker>
									</v-dialog>
								</v-btn>
							</v-row>
						</template>
						<template v-slot:action>
							<v-btn color="primary" @click="searchRequests">検索</v-btn>
						</template>
					</FormCard>
				</v-col>
				<v-col cols="12">
					<v-btn to="/requests/new" nuxt block color="primary">
						新しくランチを申請する
					</v-btn>
				</v-col>
			</v-row>
		</v-col>

		<v-col cols="12" md="8">
			<RequestSearchResult
				:meta="getRequestsData?.meta"
				:requests="getRequestsData?.records"
				:is-loading="pending"
			/>
		</v-col>
	</v-row>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
	SearchResultHeaderPropsType,
	SearchResultEmitsParamsType,
} from '~/components/molecules/SearchResultHeader.vue';
import { RequestListItemPropsType } from '~/components/molecules/RequestListItem.vue';

import { useBreadcrumbsStore } from '@/store/breadcrumbs';
const breadcrumbs = useBreadcrumbsStore();
const route = useRoute();
breadcrumbs.updateBreadcrumbs([
	{
		text: 'ランチリクエスト一覧',
		href: route.fullPath,
		disabled: true,
	},
]);

useHead({ title: 'ランチリクエスト一覧' });

const isActiveDatePicker = ref(false);

interface searchQueryType {
	name: string;
	direction: {
		from: boolean;
		to: boolean;
	};
	dates: string[];
}
interface searchResultType {
	records: RequestListItemPropsType[];
	meta: SearchResultHeaderPropsType;
}
const searchQuery = ref<searchQueryType>({
	name: '',
	direction: {
		from: true,
		to: true,
	},
	dates: [],
});

const dateRangeText = computed(() => {
	return searchQuery.value.dates.join(' ~ ');
});

const {
	data: getRequestsData,
	pending,
	error,
	refresh,
} = await useFetch<searchResultType>('/api/users', {
	query: { ...searchQuery.value },
});

if (!getRequestsData.value || error.value) {
	throw createError({
		statusCode: 404,
		message: 'ページが見つかりません。',
	});
}

function searchRequests(e: SearchResultEmitsParamsType) {
	Object.assign(searchQuery.value, e, {});
	refresh();
}
</script>

<style lang="scss">
.requests {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
