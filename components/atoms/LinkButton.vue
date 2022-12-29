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

<style lang="scss">
.LinkButton {
	display: inline-block;
	padding: $spacing-size * 2 $spacing-size * 4;
	color: $bgr-color;

	&--role {
		&-main {
			background-color: $main-color;
		}
		&-accent {
			background-color: $accent-color;
		}
		&-sub {
			background-color: $sub-color;
		}
	}
}
</style>
