import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	doc,
	query,
	where,
	addDoc,
	getDocs,
	getDoc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { firebaseConfig } from "~/config/firebase.config";

const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseService = {
	db: getFirestore(firebaseApp),

	async getDocuments(collectionName: string) {
		const docsSnap = await getDocs(collection(this.db, collectionName));

		return docsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	},

	async createDocument(collectionName: string, data: any) {
		const docRef = await addDoc(collection(this.db, collectionName), data);
		return {
			id: docRef.id,
			...data,
		};
	},

	async getDocumentById(collectionName: string, documentId: string) {
		const docRef = doc(this.db, collectionName, documentId);
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

	async getDocumentByField(collectionName: string, fieldName: string, fieldValue: any) {
		const colRef = collection(this.db, collectionName);
		const querySnapshot = await getDocs(query(colRef, where(fieldName, "==", fieldValue)));

		if (!querySnapshot.empty) {
			const docSnap = querySnapshot.docs[0];
			return {
				id: docSnap.id,
				...docSnap.data(),
			};
		} else {
			return null;
		}
	},

	async updateDocumentById(collectionName: string, documentId: string, data: any) {
		const docRef = doc(this.db, collectionName, documentId);
		await updateDoc(docRef, data);

		return {
			id: documentId,
			...data,
		};
	},

	async deleteDocumentById(collectionName: string, documentId: string) {
		const docRef = doc(this.db, collectionName, documentId);
		await deleteDoc(docRef);

		return {
			id: documentId,
		};
	},
};
