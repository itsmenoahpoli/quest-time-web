<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { format } from "date-fns";

const datetime = format(new Date(), "MMMM dd, yyyy hh:mma");
const datetimeRef = ref();

onMounted(() => {
	datetimeRef.value = datetime;

	setInterval(() => {
		datetimeRef.value = datetime;
	}, 60000);
});
</script>

<template>
	<div class="h-screen w-full bg-green-600">
		<div class="h-[50px] flex flex-row justify-between items-center px-10">
			<h1 class="text-white font-medium">QUEST TIME DASHBOARD</h1>
			<p class="text-sm text-white">{{ datetimeRef }}</p>
		</div>

		<div class="h-full flex flex-col items-center gap-y-4 pt-[10%]">
			<div class="w-[400px] p-5" style="zoom: 0.9">
				<RouterView />
			</div>

			<div class="text-center">
				<p class="text-sm text-gray-200">&copy; All Rights Reserved. 2024</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
