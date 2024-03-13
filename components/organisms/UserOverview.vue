<template>
	<v-row>
		<v-col cols="8" offset="2" class="mb-2">
			<v-avatar v-if="props.image" size="auto" width="100%">
				<v-img :aspect-ratio="1" :src="props.image" alt="社員画像" />
			</v-avatar>
		</v-col>

		<v-col cols="12" class="text-center">
			<AtomsParagraph :text="props.nameKana" class="text-caption mb-0" />
			<AtomsHeading
				:level="2"
				:text="props.name"
				class="font-weight-medium mb-1"
			/>
			<AtomsParagraph
				:text="`${props.headquarters} ${props.department} ${props.group} ${props.role}`"
				class="mb-2"
			/>
			<AtomsParagraph
				v-if="props.chatworkId"
				:text="`@${props.chatworkId}`"
				class="grey--text"
			/>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
export type UserOverviewPropsType = {
	image?: string;
	name: string;
	email?: string;
	nameKana: string;
	headquarters: string;
	department?: string | null;
	group?: string | null;
	role?: string | null;
	chatworkId?: string | null;
};

const props = withDefaults(defineProps<UserOverviewPropsType>(), {
	image: '',
	email: '',
	department: '',
	group: '',
	role: '',
	chatworkId: '',
});
</script>
