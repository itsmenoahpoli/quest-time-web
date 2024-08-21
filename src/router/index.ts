import { createRouter, createWebHistory } from "vue-router";
import { ROUTES } from "~/constants";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			redirect: ROUTES.AUTH.TEACHER_LOGIN,
		},
		{
			path: "/auth",
			component: () => import("~/layouts/auth-layout.vue"),
			children: [
				{
					path: ROUTES.AUTH.STUDENT_LOGIN,
					name: "auth-student-login",
					component: () => import("~/views/auth/student-login.vue"),
				},
				{
					path: ROUTES.AUTH.TEACHER_LOGIN,
					name: "auth-teacher-login",
					component: () => import("~/views/auth/teacher-login.vue"),
				},
				{
					path: ROUTES.AUTH.TEACHER_REGISTER,
					name: "auth-teacher-register",
					component: () => import("~/views/auth/teacher-register.vue"),
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
