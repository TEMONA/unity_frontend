<template>
	<div>
		<v-avatar size="auto" width="100%" class="mb-2">
			<v-img :aspect-ratio="1" :src="image" alt="社員画像" />
		</v-avatar>

		<div class="text-center">
			<Heading :level="2" :text="name" class="font-weight-medium" />
			<Paragraph
				:text="`${department}事業部 ${group}グループ ${role}`"
				class="mb-1"
			/>
			<Paragraph :text="chatworkId" class="grey--text" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export interface UserOverviewType {
	image: string
	name: string
	headquarters: string
	department?: string | null
	group?: string | null
	role?: string | null
	chatworkId: string
}

export default Vue.extend({
	name: 'UserOverview',
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
		chatworkId: {
			type: String,
			required: true,
		},
	},
})
</script>
