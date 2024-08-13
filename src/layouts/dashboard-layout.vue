<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useAuthStore } from "~/store";
import { SIDEBAR_LINKS } from "~/statics";

const { user, IS_AUTHENTICATED } = useAuthStore();

const checkAuth = () => {
	if (!IS_AUTHENTICATED) {
		window.location.replace("/auth/login");
	}
};

const renderSidebarLinks = computed(() => {
	return SIDEBAR_LINKS.TEACHER;
});

const isSidebarLinkActive = (pathname: string) => {
	return window.location.pathname === pathname;
};

onMounted(() => {
	checkAuth();

	console.log(user);
});
</script>

<template>
	<div class="min-h-screen w-screen bg-slate-50">
		<div class="sidebar h-screen bg-slate-950 fixed top-0 left-0">
			<h1 class="text-center text-white text-2xl font-bold my-4">QUEST TIME</h1>

			<div class="flex flex-col">
				<RouterLink
					v-for="link in renderSidebarLinks"
					:to="link.url"
					class="w-100 h-[40px] flex flex-row gap-x-3 items-center text-xs text-slate-500 hover:text-white hover:bg-slate-900 pl-4"
					:class="{ '!text-white bg-slate-900': isSidebarLinkActive(link.url) }"
				>
					<component :is="link.icon" size="22" /> <span class="mt-1">{{ link.label }}</span>
				</RouterLink>
			</div>
		</div>
		<div class="content h-screen p-5">
			<RouterView />
		</div>
	</div>
</template>

<style lange="scss" scoped>
.sidebar {
	width: 300px;
}

.content {
	width: calc(100% - 300px);
	margin-left: 300px;
}
</style>
