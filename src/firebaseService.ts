import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	deleteDoc,
	doc,
	setDoc,
} from 'firebase/firestore';
import type {Profile} from './types';
import {initializeApp} from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyA0lhvxR0ram2HsGZwWKr8zIeHDzSjHUm0',
	authDomain: 'vault-f7da9.firebaseapp.com',
	projectId: 'vault-f7da9',
	storageBucket: 'vault-f7da9.firebasestorage.app',
	messagingSenderId: '631285408172',
	appId: '1:631285408172:web:8f6e80c96adbacaad05a09',
	measurementId: 'G-NTXRMVJGH2',
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export const saveProfile = async (profile: Profile): Promise<string> => {
	if (profile.id) {
		const docRef = doc(db, 'profiles', profile.id);
		await setDoc(docRef, profile, {merge: true});
		return profile.id;
	} else {
		const collectionRef = collection(db, 'profiles');
		const docRef = await addDoc(collectionRef, profile);
		return docRef.id;
	}
};

export const getProfiles = async (): Promise<Profile[]> => {
	try {
		const querySnapshot = await getDocs(collection(db, 'profiles'));
		const profiles: Profile[] = [];
		querySnapshot.forEach((doc) => {
			profiles.push({id: doc.id, ...doc.data()} as Profile);
		});
		return profiles;
	} catch (e) {
		console.error('Error fetching documents: ', e);
		throw e;
	}
};

export const deleteProfile = async (id: string) => {
	try {
		const profileRef = doc(db, 'profiles', id);
		await deleteDoc(profileRef);
	} catch (e) {
		console.error('Error deleting document: ', e);
		throw e;
	}
};
