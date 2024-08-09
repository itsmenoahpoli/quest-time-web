import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	updateProfile,
} from "firebase/auth";
import { toast } from "vue3-toastify";
import { firebaseConfig } from "~/config";
import { useAuthStore } from "~/store";
import { handleError } from "~/utils";
import type { Credentials, ProfileData } from "~/types/auth";

const firebaseApp = initializeApp(firebaseConfig);

export const AuthService = {
	auth: getAuth(firebaseApp),

	async createAccount(accountData: ProfileData) {
		return await createUserWithEmailAndPassword(this.auth, accountData.email, accountData.password)
			.then(async (response) => {
				await updateProfile(response.user, {
					displayName: `${accountData.first_name} ${accountData.last_name}`,
				});
				toast.success("Account succesfully created");
			})
			.catch((error) => {
				handleError(error, "User details already exists");
			});
	},

	async loginToAccount(credentials: Credentials) {
		return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
			.then((response) => {
				const { user } = response;
				const { SET_USER, SET_TOKEN } = useAuthStore();

				SET_USER({
					displayName: user.displayName,
					email: user.email,
				});

				response.user.getIdToken().then((token) => SET_TOKEN(token));

				window.location.pathname = "/dashboard/overview";
			})
			.catch((error) => {
				handleError(error, "Invalid credentials provided, please try again");
			});
	},

	signoutAccount() {
		const { CLEAR_AUTH } = useAuthStore();

		CLEAR_AUTH();

		signOut(this.auth).then(() => {
			window.location.pathname = "/auth/login";
		});
	},

	onAuthStateChanged(callback: (user: User | null) => void) {
		onAuthStateChanged(this.auth, callback);
	},

	async _getUserProfile(email: string) {},
};
