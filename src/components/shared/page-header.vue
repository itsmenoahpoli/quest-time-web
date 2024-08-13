<script lang="ts" setup>
const $props = defineProps<{
	title: string;
	subtitle?: string;
}>();

console.log($props);
</script>

<template>
	<div class="w-full flex flex-row justify-between py-7">
		<div class="flex flex-col gap-y-3">
			<h1>{{ $props.title }}</h1>
			<p>{{ $props.subtitle }}</p>
		</div>

		<div>
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
