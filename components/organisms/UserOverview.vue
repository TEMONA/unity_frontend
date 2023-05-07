<template>
	<div>
		<v-avatar v-if="image" size="auto" width="100%" class="mb-2">
			<v-img :aspect-ratio="1" :src="image" alt="社員画像" />
		</v-avatar>

		<div class="text-center">
			<Paragraph :text="nameKana" class="text-caption mb-0" />
			<Heading :level="2" :text="name" class="font-weight-medium mb-1" />
			<Paragraph
				:text="`${headquarters} ${department} ${group} ${role}`"
				class="mb-2"
			/>
			<Paragraph
				v-if="chatworkId"
				:text="`@${chatworkId}`"
				class="grey--text"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export interface UserOverviewType {
	image?: string
	name: string
	nameKana: string
	headquarters: string
	department?: string | null
	group?: string | null
	role?: string | null
	chatworkId?: string | null
}

export default Vue.extend({
	name: 'UserOverview',
	props: {
		image: {
			type: String,
			required: false,
			default: '',
		},
		name: {
			type: String,
			required: true,
		},
		nameKana: {
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
		chatworkId: {
			type: String,
			required: false,
			default: '',
		},
	},
})
</script>
