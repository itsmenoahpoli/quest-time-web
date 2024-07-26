import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { firebaseConfig } from "~/config/firebase.config";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const FirebaseService = {
  getFirestore: () => db,
  getCollection: (collectionName: string) => collection(db, collectionName),

  async getDocuments(collectionName: string) {
    const docsSnap = await getDocs(collection(db, collectionName));

    return docsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async createDocument(collectionName: string, data: any) {
    const docRef = await addDoc(collection(db, collectionName), data);
    return {
      id: docRef.id,
      ...data,
    };
  },

  async getDocumentById(collectionName: string, documentId: string) {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
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
      ...data,
    };
  },

  async deleteDocumentById(collectionName: string, documentId: string) {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);

    return {
      id: documentId,
    };
  },
};
