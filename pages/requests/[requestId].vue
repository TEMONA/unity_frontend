<template>
	<v-row class="request">
		<v-col cols="12" md="4" class="request__sidebar">
			<UserOverview v-bind="getRequestData?.user" />

			<v-row>
				<v-col cols="6">
					<v-btn outlined block color="primary">チャットを開く</v-btn>
				</v-col>
				<v-col cols="6">
					<v-btn outlined block color="primary">プロフィールを見る</v-btn>
				</v-col>
				<v-col v-if="getRequestData?.request.direction === 'from'" cols="12">
					<v-btn block color="primary">日時を選択して申請を承認する</v-btn>
				</v-col>
				<v-col v-if="getRequestData?.request.direction === 'to'" cols="6">
					<v-btn block color="primary">申請を編集する</v-btn>
				</v-col>
				<v-col v-if="getRequestData?.request.direction === 'to'" cols="6">
					<v-btn block color="error">申請を削除する</v-btn>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12" md="8">
			<v-chip-group class="mb-3">
				<v-chip v-for="tag in getRequestData?.tags" :key="tag">
					{{ tag }}
				</v-chip>
			</v-chip-group>

			<Paragraph class="text-h6">
				この人{{
					getRequestData?.request.direction === 'from' ? 'から' : 'へ'
				}}送られたリクエスト
			</Paragraph>

			<v-row>
				<v-col cols="12">
					<v-card>
						<v-card-title> 依頼日時 </v-card-title>

						<v-card-text>
							<Paragraph
								:key="index"
								v-for="(date, index) in getRequestData?.request.dates"
								class="mb-2"
							>
								第{{ index + 1 }}希望：{{ date }}
							</Paragraph>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="12">
					<v-card>
						<v-card-title> 依頼詳細 </v-card-title>

						<v-card-text v-text="getRequestData?.request.detail" />
					</v-card>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts" setup>
import { useBreadcrumbsStore } from '@/store/breadcrumbs';
const breadcrumbs = useBreadcrumbsStore();
const route = useRoute();
breadcrumbs.updateBreadcrumbs([
	{
		text: 'ランチリクエスト一覧',
		href: '/resuqets/',
	},
	{
		text: 'ランチリクエスト詳細',
		href: route.fullPath,
		disabled: true,
	},
]);

useHead({ title: 'ランチリクエスト詳細' });

import { UserOverviewPropsType } from '~/components/organisms/UserOverview.vue';

type getRequestDataType = {
	user: UserOverviewPropsType;
	tags: string[];
	request: {
		direction: string;
		dates: Date[];
		detail: string;
	};
};

const { data: getRequestData, error } = await useFetch<getRequestDataType>(
	`/api/lunch-requests/${route.params.requestId}`,
);

if (!getRequestData.value || error.value) {
	throw createError({
		statusCode: 404,
		message: 'ページが見つかりません。',
	});
}
</script>

<style lang="scss">
.request {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
