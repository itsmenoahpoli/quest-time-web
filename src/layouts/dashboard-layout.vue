<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { useRoute } from "vue-router";
import { AuthService } from "~/services";

const { meta } = useRoute();

const handleLogout = () => {
	AuthService.signoutAccount();
};
</script>

<template>
	<div class="min-h-screen w-screen bg-slate-100">
		<div class="h-[150px] w-screen bg-green-700 flex flex-col justify-between shadow">
			<div class="container flex flex-row justify-between mx-auto py-3">
				<div class="flex flex-row items-center gap-x-1">
					<h1 class="text-white font-medium">QUEST TIME DASHBOARD</h1>
				</div>
				<div class="flex flex-row justify-end gap-x-2">
					<FwbButton
						class="text-xs border-0 text-white hover:bg-transparent hover:underline"
						outline
					>
						My Account
					</FwbButton>
					<FwbButton
						class="text-xs border-0 text-white hover:bg-transparent hover:underline"
						@click="handleLogout"
						outline
					>
						Logout
					</FwbButton>
				</div>
			</div>

			<div class="container py-3">
				<h1 class="text-xl text-white uppercase mb-2">{{ meta.title }}</h1>
				<p class="text-xs text-gray-100">{{ meta.description }}</p>
			</div>
		</div>

		<RouterView />
	</div>
</template>

<style scoped></style>
