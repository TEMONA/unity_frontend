<template>
	<v-list-item link class="UserListItem">
		<v-list-item-avatar color="grey darken-1">
			<v-img :aspect-ratio="1" :src="image" alt="社員画像" />
		</v-list-item-avatar>

		<v-list-item-content>
			<v-list-item-title>
				<slot name="prepend" />
				{{ name }}
				<span class="grey--text text-caption">
					{{ headquarters }} {{ group }}
					{{ role }}
				</span>
			</v-list-item-title>
			<slot name="chip" />
			<v-chip
				v-if="status"
				:color="chipColor"
				class="UserListItem__chip mt-3 mr-4"
			>
				{{ status }}
			</v-chip>

			<v-list-item-subtitle>
				{{ detail }}
			</v-list-item-subtitle>
		</v-list-item-content>
	</v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'

export interface UserListItemType {
	image: string
	name: string
	headquarters: string
	department?: string
	group?: string
	role?: string
	status?: string
	detail: string
}

export default Vue.extend({
	name: 'UserListItem',
	props: {
		image: {
			type: String,
			required: true,
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
		status: {
			type: String,
			required: false,
			default: '',
		},
		detail: {
			type: String,
			required: true,
		},
	},
	computed: {
		chipColor(): string {
			let color = ''
			switch (this.status) {
				case '承認済':
					color = 'primary'
					break

				case '未承認':
					color = 'warning'
					break

				case '拒否済':
					color = 'accent'
					break

				default:
					break
			}
			return color
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
