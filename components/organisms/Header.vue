<template>
	<v-app-bar app :clipped-left="true" :flat="true" class="light-blue">
		<v-img src="/img/logo.png" max-width="36" :aspect-ratio="1" />
		<v-app-bar-title class="pl-4 black--text"> Unity </v-app-bar-title>
		<v-spacer></v-spacer>

		<v-icon class="black--text">mdi-logout</v-icon>
	</v-app-bar>
</template>

<script setup lang="ts"></script>
