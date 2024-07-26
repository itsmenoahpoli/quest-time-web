import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth-store", {
  state: () => {
    return {
      user: undefined,
    };
  },
  actions: {
    //
  },
  getters: {
    //
  },
});
