import { initializeApp } from "firebase/app";
import { getEnv } from "~/config/env.config";

const firebaseConfig = {
  apiKey: getEnv<string>("FIREBASE_API_KEY"),
  authDomain: getEnv<string>("FIREBASE_AUTH_DOMAIN"),
  projectId: getEnv<string>("FIREBASE_PROJECT_ID"),
  storageBucket: getEnv<string>("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getEnv<string>("FIREBASE_MESSAGING_SENDER_ID"),
  appId: getEnv<string>("FIREBASE_APP_ID"),
};

const firebaseApp = initializeApp(firebaseConfig);

console.log(firebaseApp);

export const FirebaseService = {
  //
};
