<template>
	<v-breadcrumbs :items="breadcrumbs.items" />
</template>

<script setup lang="ts">
import { useBreadcrumbsStore } from '@/store/breadcrumbs'
const breadcrumbs = useBreadcrumbsStore()
</script>
