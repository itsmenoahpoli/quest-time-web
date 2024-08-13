import { createRouter, createWebHistory } from "vue-router";
import { ROUTES } from "~/constants";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			redirect: ROUTES.AUTH.LOGIN,
		},
		{
			path: "/auth",
			component: () => import("~/layouts/auth-layout.vue"),
			children: [
				{
					path: ROUTES.AUTH.LOGIN,
					name: "auth-login",
					component: () => import("~/views/auth/login.vue"),
				},
				{
					path: ROUTES.AUTH.REGISTER,
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
					path: ROUTES.DASHBOARD,
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
