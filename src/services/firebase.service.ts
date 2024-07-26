import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'
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
const db = getFirestore(firebaseApp)

console.log(firebaseApp);

export const FirebaseService = {
  getFirestore: () => db,
  getCollection: (collectionName: string) => collection(db, collectionName),

  async createDocument(collectionName: string, data: any) {
    const docRef = await addDoc(collection(db, collectionName), data);
    return {
      id: docRef.id,
      ...data
    };
  },

  async getDocumentById(collectionName: string, documentId: string) {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  },

  async updateDocumentById(collectionName: string, documentId: string, data: any) {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data);

    return {
      id: documentId,
      ...data
    };
  },

  async deleteDocumentById(collectionName: string, documentId: string) {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);

    return {
      id: documentId
    };
  }
};
