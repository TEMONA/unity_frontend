<template>
	<p v-if="text !== ''" class="Paragraph">
		{{ text }}
	</p>
	<p v-else class="Paragraph">
		<slot />
	</p>
</template>

<script lang="ts" setup>
type ParagraphPropsType = {
	text: string | number;
};
const props = withDefaults(defineProps<ParagraphPropsType>(), { text: '' });
</script>

<style lang="scss">
.Paragraph {
	display: block;
	word-wrap: break-word;
}
</style>
