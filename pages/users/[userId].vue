<template>
	<NuxtLayout>
		<v-row class="user">
			<v-col cols="12" md="4" class="user__sidebar">
				<OrganismsUserOverview v-bind="getUserData?.overview" />
				<v-row class="mt-3">
					<v-col v-if="getUserData?.overview.chatworkId" cols="6">
						<v-btn
							:href="`https://www.chatwork.com/${getUserData?.overview.chatworkId}`"
							outlined
							block
							color="primary"
							target="_blank"
							>チャットを開く</v-btn
						>
					</v-col>
					<v-col cols="6">
						<v-btn
							href="https://calendar.google.com/calendar/u/0/r/day"
							outlined
							block
							color="primary"
							target="_blank"
						>
							meetsを依頼する
						</v-btn>
					</v-col>
					<v-col cols="12">
						<v-btn
							:href="`/requests/new?users=${route.params.userId}`"
							block
							color="primary"
						>
							ランチを申請する
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
			<v-col v-if="getUserData?.tags" cols="12" md="8">
				<v-chip-group class="mb-3">
					<v-chip
						v-for="tag in getUserData?.tags"
						:key="tag"
						:ripple="false"
						:disabled="true"
						color="secondary"
					>
						{{ tag }}
					</v-chip>
				</v-chip-group>

				<v-row v-if="getUserData?.details">
					<template v-for="(item, index) in getUserData?.details">
						<v-col v-if="item.value" cols="12" :key="index">
							<v-card>
								<v-card-title v-text="item.title" />

								<v-card-text v-html="item.value" />
							</v-card>
						</v-col>
					</template>
				</v-row>
			</v-col>
		</v-row>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import type { UserOverviewPropsType } from '@/components/organisms/UserOverview.vue';

import { useBreadcrumbsStore } from '@/store/breadcrumbs';
const breadcrumbs = useBreadcrumbsStore();
const route = useRoute();
breadcrumbs.updateBreadcrumbs([
	{
		text: '社員詳細',
		href: route.fullPath,
		disabled: true,
	},
]);

useHead({ title: '社員詳細' });

type detailsType = {
	title: string;
	value: string;
};
type getUserDataType = {
	overview: UserOverviewPropsType;
	tags: string[];
	details: {
		jobDescription: detailsType;
		birth_place: detailsType;
		career: detailsType;
		hobby: detailsType;
		specialty: detailsType;
		strengths: detailsType;
		message: detailsType;
	};
};

const { data: getUserData, error } = await useFetchWithBaseURL<getUserDataType>(
	`/api/users/${route.params.userId}`,
);

if (!getUserData.value || error.value) {
	throw createError({
		statusCode: 404,
		message: 'ページが見つかりません。',
	});
}
</script>

<style lang="scss">
.user {
	&__sidebar {
		position: sticky;
		top: calc(64px + 16px);
	}
}
</style>
