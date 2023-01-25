<template>
	<v-list-item link>
		<v-list-item-avatar color="grey darken-1">
			<v-img :aspect-ratio="1" :src="image" alt="社員画像" />
		</v-list-item-avatar>

		<v-list-item-content>
			<v-list-item-title>
				<slot name="prepend" />
				{{ name }}
				<span class="grey--text text-caption">
					{{ department }} {{ group }}
					{{ role }}
				</span>
			</v-list-item-title>
			<slot name="chip" />

			<v-list-item-subtitle>
				{{ detail }}
			</v-list-item-subtitle>
		</v-list-item-content>
	</v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'

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
		department: {
			type: String,
			required: true,
		},
		group: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: false,
			default: '',
		},
		detail: {
			type: String,
			required: true,
		},
	},
})
</script>
