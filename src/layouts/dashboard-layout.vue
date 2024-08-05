<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { AuthService } from "~/services";

const onLogout = () => {
	return AuthService.signoutAccount();
};
</script>

<template>
	<div class="min-h-screen w-screen bg-slate-100">
		<div
			class="h-[50px] w-screen bg-slate-900 flex flex-row justify-between items-center shadow px-10 mb-4"
		>
			<h1 class="text-white font-bold">QUEST TIME DASHBOARD</h1>

			<FwbButton class="text-xs" color="red" @click.once="onLogout">LOGOUT</FwbButton>
		</div>

		<RouterView />
	</div>
</template>

<style scoped></style>
