<template>
	<v-snackbar
		:value="snackbar.isShow"
		:color="snackbar.color"
		:timeout="3000"
		top
		class="Snackbar"
		@input="closeSnackbar"
	>
		{{ snackbar.message }}
		<v-btn text @click="closeSnackbar">閉じる</v-btn>
	</v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
	name: 'Snackbar',
	computed: mapState(['snackbar']),
	methods: {
		closeSnackbar(): void {
			this.$store.commit('snackbar/closeSnackbar')
		},
	},
})
</script>

<style lang="scss">
.Snackbar {
	.v-snack__wrapper {
		min-width: unset;
	}
}
</style>
