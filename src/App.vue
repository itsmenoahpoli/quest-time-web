<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
	console.log("App Mounted!");
});
</script>

<template>
	<RouterView />
</template>

<style lang="scss" scoped></style>
