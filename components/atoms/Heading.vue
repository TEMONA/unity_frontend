<template>
	<component :is="`h${level}`" class="Heading" :class="[`text-h${level}`]">
		{{ text }}
	</component>
</template>

<script lang="ts">
import Vue from 'vue'

const localValidation = {
	level: [1, 2, 3, 4, 5, 6],
}

export default Vue.extend({
	name: 'Heading',
	props: {
		level: {
			type: [String, Number],
			required: true,
			validator(value) {
				return localValidation.level.includes(Number(value))
			},
		},
		text: {
			type: String,
			required: true,
		},
	},
})
</script>
