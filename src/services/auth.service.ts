import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
} from "firebase/auth";
import { firebaseConfig } from "~/config/firebase.config";

const app = initializeApp(firebaseConfig);

export const AuthService = {
	auth: getAuth(app),

	createAccount: async function () {
		return await createUserWithEmailAndPassword(this.auth, "user@domain.com", "password")
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	},

	loginToAccount: async function () {
		return signInWithEmailAndPassword(this.auth, "user@domain.com", "password")
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	},

	signoutAccount: function () {
		return signOut(this.auth);
	},

	onAuthStateChanged: function (callback: (user: User | null) => void) {
		onAuthStateChanged(this.auth, callback);
	},
};
