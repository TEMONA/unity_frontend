<template>
	<div>
		<v-subheader>
			検索結果
			<v-spacer />
			<div class="mr-2">
				{{ (props.currentPage - 1) * props.perPage + 1 }}
				-
				{{
					props.currentPage * props.perPage >= props.totalCount
						? props.totalCount
						: props.currentPage * props.perPage
				}}件 / {{ props.totalCount }}件
			</div>
			<v-icon>mdi-dots-vertical</v-icon>
		</v-subheader>

		<v-divider />
	</div>
</template>

<script setup lang="ts">
// 検索APIに渡す際に以下2つのパラメータが必要なため定義
export type SearchResultEmitsParamsType = {
	perPage: number;
	page: number;
};

export type SearchResultHeaderPropsType = {
	totalCount: number;
	perPage: number;
	currentPage: number;
};

const props = defineProps<SearchResultHeaderPropsType>();
</script>
