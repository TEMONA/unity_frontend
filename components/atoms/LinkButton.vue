<template>
	<v-btn :href="link" :color="color" :aria-label="label" v-bind="props">
		{{ text }}
	</v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'LinkButton',
	props: {
		link: {
			type: [String, Object],
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: false,
			default: 'primary',
		},
		props: {
			type: Object,
			required: false,
			default() {
				return {}
			},
		},
	},
	computed: {
		label(): string {
			return this.link + 'へのリンク'
		},
	},
})
</script>

<style lang="scss"></style>
