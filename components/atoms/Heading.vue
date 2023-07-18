<template>
	<component :is="`h${level}`" class="Heading" :class="[`text-${textSize}`]">
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
	computed: {
		textSize(): string {
			let size = ''
			switch (Number(this.level)) {
				case 1:
					size = 'h3'
					break

				case 2:
					size = 'h4'
					break

				case 3:
					size = 'h5'
					break

				case 4:
					size = 'h6'
					break

				case 5:
					size = 'subtitle-1'
					break

				default:
					size = 'subtitle-2'
					break
			}
			return size
		},
	},
})
</script>
