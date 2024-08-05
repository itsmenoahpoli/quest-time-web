<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { useRoute } from "vue-router";

const { meta } = useRoute();
</script>

<template>
	<div class="min-h-screen w-screen bg-slate-100">
		<div class="h-[200px] w-screen bg-slate-900 flex flex-col justify-between shadow">
			<div class="container flex flex-row justify-between mx-auto py-3">
				<div class="flex flex-row items-center gap-x-1">
					<h1 class="text-white font-bold">QUEST TIME DASHBOARD</h1>

					<FwbButton class="border-0 text-white underline" outline>Manage Classes</FwbButton>
					<FwbButton class="border-0 text-white underline" outline>Manage Subjects</FwbButton>
					<FwbButton class="border-0 text-white underline" outline>Manage Students</FwbButton>
				</div>
				<div class="flex flex-row justify-end gap-x-2">
					<FwbButton class="border-0 text-white" outline>My Account</FwbButton>
					<FwbButton class="border-0 text-white" outline>Logout</FwbButton>
				</div>
			</div>

			<div class="container py-3">
				<h1 class="text-2xl text-white mb-2">{{ meta.title }}</h1>
				<p class="text-sm text-gray-100">{{ meta.description }}</p>
			</div>
		</div>

		<RouterView />
	</div>
</template>

<style scoped></style>
