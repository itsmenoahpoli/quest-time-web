import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/auth",
      component: () => import("~/layouts/auth-layout.vue"),
      children: [
        {
          path: "/auth/login",
          name: "auth-login",
          component: () => import("~/views/auth/login.vue"),
        },
      ],
    },
  ],
});

export default router;
