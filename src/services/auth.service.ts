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
import { firebaseConfig } from "~/config/firebase.config";
import { useAuthStore } from "~/store";
import type { Credentials } from "~/types/auth";

const app = initializeApp(firebaseConfig);

export const AuthService = {
	handleError: function (error: unknown, message: string) {
		console.log({ error, message });
	},

	auth: getAuth(app),

	createAccount: async function (credentials: Credentials & { name: string }) {
		return await createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password)
			.then(async (response) => {
				await updateProfile(response.user, { displayName: credentials.name });
				toast.success("Account succesfully created");
			})
			.catch((error) => {
				this.handleError(error, "User details already exists");
			});
	},

	loginToAccount: async function (credentials: Credentials) {
		return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
			.then((response) => {
				const { user } = response;
				const { SET_USER, SET_TOKEN } = useAuthStore();

				SET_USER({
					displayName: user.displayName,
					email: user.email,
				});
				response.user.getIdToken().then((token) => SET_TOKEN(token));
			})
			.catch((error) => {
				this.handleError(error, "Invalid credentials provided, please try again");
			});
	},

	signoutAccount: function () {
		return signOut(this.auth);
	},

	onAuthStateChanged: function (callback: (user: User | null) => void) {
		onAuthStateChanged(this.auth, callback);
	},
};
