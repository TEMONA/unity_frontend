<template>
	<p v-if="text !== ''" class="Paragraph">
		{{ text }}
	</p>
	<p v-else class="Paragraph">
		<slot />
	</p>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'Paragraph',
	props: {
		text: {
			type: [String, Number],
			required: false,
			default: '',
		},
	},
})
</script>

<style lang="scss">
.Paragraph {
	display: block;
	word-wrap: break-word;
}
</style>
