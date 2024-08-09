import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth-store", {
	state: () => {
		return {
			user: undefined,
			token: undefined,
		};
	},
	actions: {
		SET_USER(user: any) {
			this.user = user;
		},
		SET_TOKEN(token: any) {
			this.token = token;
		},
		CLEAR_AUTH() {
			this.user = undefined;
			this.token = undefined;
		},
	},
});
