import { defineStore } from "pinia";

interface AuthState {
	user?: any;
	token?: string;
}

export const useAuthStore = defineStore("auth-store", {
	state: (): AuthState => {
		return {
			user: undefined,
			token: undefined,
		};
	},
	actions: {
		SET_USER(user: AuthState["user"]) {
			this.user = user;
		},
		SET_TOKEN(token: AuthState["token"]) {
			this.token = token;
		},
		CLEAR_AUTH() {
			this.user = undefined;
			this.token = undefined;
		},
		IS_AUTHENTICATED() {
			return this.user !== undefined || this.token !== undefined;
		},
	},
	persist: true,
});
