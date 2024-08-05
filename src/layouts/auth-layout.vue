<script lang="ts" setup></script>

<template>
	<div class="h-screen w-screen bg-slate-50">
		<div class="h-[50px] w-screen bg-slate-900 flex items-center shadow px-10">
			<h1 class="text-white">Quest Time</h1>
		</div>

		<div class="h-full flex flex-col items-center gap-y-4 pt-[10%]">
			<div class="w-[400px] bg-white border shadow p-5" style="zoom: 0.8">
				<RouterView />
			</div>

			<div class="text-center">
				<p class="text-xs text-gray-600">&copy; All Rights Reserved. 2024</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
