import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
import { toast } from "vue3-toastify";
import { FirebaseService, firebaseApp } from "./firebase.service";
import { useAuthStore } from "~/store";
import { handleError } from "~/utils";
import { ROUTES } from "~/constants";
import type { Credentials, ProfileData } from "~/types/auth";

export const AuthService = {
	auth: getAuth(firebaseApp),

	googleLogin() {
		signInWithPopup(this.auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;

				const { SET_USER, SET_TOKEN } = useAuthStore();

				SET_USER({
					displayName: user.displayName,
					email: user.email,
				});

				SET_TOKEN(token);

				window.location.href = "/dashboard";
			})
			.catch((error) => {
				console.log(error);
			});
	},

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
			.then(async (response) => {
				const userProfile = await this._getUserProfile(credentials.email);
				const { user } = response;
				const { SET_USER, SET_TOKEN } = useAuthStore();

				SET_USER({
					...userProfile,
					displayName: user.displayName,
					email: user.email,
				});
				const token = await response.user.getIdToken();

				SET_TOKEN(token);

				window.location.pathname = ROUTES.DASHBOARD;
			})
			.catch((error) => {
				handleError(error, "Invalid credentials provided, please try again");
			});
	},

	signoutAccount() {
		const { CLEAR_AUTH } = useAuthStore();

		CLEAR_AUTH();

		signOut(this.auth).then(() => {
			window.location.pathname = ROUTES.AUTH.TEACHER_LOGIN;
		});
	},

	onAuthStateChanged(callback: (user: User | null) => void) {
		onAuthStateChanged(this.auth, callback);
	},

	async _getUserProfile(email: string) {
		return await FirebaseService.getDocumentByField("user_profile", "email", email);
	},
};
