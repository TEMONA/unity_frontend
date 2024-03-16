<template>
	<component :is="`h${level}`" class="Heading" :class="[`text-${textSize}`]">
		{{ text }}
	</component>
</template>

<script lang="ts" setup>
type HeadingPropsType = {
	level: 1 | 2 | 3 | 4 | 5 | 6;
	text: string | number;
};

const props = defineProps<HeadingPropsType>();
const textSize = computed(() => {
	let size = '';
	switch (props.level) {
		case 1:
			size = 'h3';
			break;

		case 2:
			size = 'h4';
			break;

		case 3:
			size = 'h5';
			break;

		case 4:
			size = 'h6';
			break;

		case 5:
			size = 'subtitle-1';
			break;

		default:
			size = 'subtitle-2';
			break;
	}
	return size;
});
</script>
