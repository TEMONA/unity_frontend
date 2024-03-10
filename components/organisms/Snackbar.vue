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

<script setup lang="ts">
import { useSnackbarStore } from '@/store/snackbar';
const snackbar = useSnackbarStore();

const closeSnackbar = (): void => {
	snackbar.closeSnackbar();
};
</script>

<style lang="scss">
.Snackbar {
	.v-snack__wrapper {
		min-width: unset;
	}
}
</style>
