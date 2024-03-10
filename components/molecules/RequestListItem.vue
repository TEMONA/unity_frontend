<template>
	<v-list-item link class="UserListItem" :href="`requests/${props.id}`">
		<v-list-item-avatar v-if="props.image" color="grey darken-1">
			<v-img :aspect-ratio="1" :src="props.image" alt="社員画像" />
		</v-list-item-avatar>

		<v-list-item-content>
			<v-list-item-title>
				{{
					props.direction === 'from'
						? 'この人からのリクエスト：'
						: 'この人へのリクエスト　：'
				}}
				{{ props.name }}
				<span class="grey--text text-caption">
					{{ props.headquarters }} {{ props.group }}
					{{ props.role }}
				</span>
			</v-list-item-title>

			<v-list-item-subtitle>
				{{ props.applyContent }}
			</v-list-item-subtitle>
		</v-list-item-content>
	</v-list-item>
</template>

<script setup lang="ts">
export type RequestListItemPropsType = {
	id: string;
	direction: string;
	image?: string;
	name: string;
	headquarters: string;
	department?: string;
	group?: string;
	role?: string;
	applyContent: string;
};

const props = withDefaults(defineProps<RequestListItemPropsType>(), {
	image: '',
	department: '',
	group: '',
	role: '',
});
</script>

<style lang="scss">
.UserListItem {
	&__chip {
		position: absolute;
		top: 0;
		right: 0;
	}
}
</style>
