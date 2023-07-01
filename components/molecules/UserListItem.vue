<template>
	<v-list-item link class="UserListItem" :href="`users/${userId}`">
		<v-list-item-avatar v-if="image" color="grey darken-1">
			<v-img :aspect-ratio="1" :src="image" alt="社員画像" />
		</v-list-item-avatar>

		<v-list-item-content>
			<v-list-item-title>
				{{ name }}
				<span class="grey--text text-caption">
					{{ headquarters }} {{ group }}
					{{ role }}
				</span>
			</v-list-item-title>

			<v-list-item-subtitle>
				{{ jobDescription }}
			</v-list-item-subtitle>
		</v-list-item-content>
	</v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'

export interface UserListItemType {
	userId: string
	image?: string
	name: string
	headquarters: string
	department?: string
	group?: string
	role?: string
	jobDescription: string
}

export default Vue.extend({
	name: 'UserListItem',
	props: {
		userId: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
			default: '',
		},
		name: {
			type: String,
			required: true,
		},
		headquarters: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: false,
			default: '',
		},
		group: {
			type: String,
			required: false,
			default: '',
		},
		role: {
			type: String,
			required: false,
			default: '',
		},
		jobDescription: {
			type: String,
			required: true,
		},
	},
})
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
