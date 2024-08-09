import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			redirect: "/auth/login",
		},
		{
			path: "/auth",
			component: () => import("~/layouts/auth-layout.vue"),
			children: [
				{
					path: "/auth/login",
					name: "auth-login",
					component: () => import("~/views/auth/login.vue"),
				},
				{
					path: "/auth/register",
					name: "auth-register",
					component: () => import("~/views/auth/register.vue"),
				},
			],
		},
		{
			path: "/dashboard",
			component: () => import("~/layouts/dashboard-layout.vue"),
			children: [
				{
					path: "/dashboard/overview",
					name: "dashboard-overview",
					meta: {
						title: "Dashboard Overview",
						description: "View overall data of teachers and students",
					},
					component: () => import("~/views/dashboard/overview.vue"),
				},
			],
		},
	],
});

export default router;
