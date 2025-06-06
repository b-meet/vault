import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	deleteDoc,
	doc,
	setDoc,
	query,
	where,
	getDoc,
} from 'firebase/firestore';
import type {Profile} from '../types';
import {app} from './firebaseConfig';

const db = getFirestore(app);

// User management functions
export interface UserDocument {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	emailVerified: boolean;
	createdAt: Date;
	lastLoginAt: Date;
}

export const saveUserToCollection = async (user: {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	emailVerified: boolean;
}): Promise<void> => {
	try {
		const userRef = doc(db, 'users', user.uid);
		const userDoc = await getDoc(userRef);
		
		const userData: UserDocument = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified,
			createdAt: userDoc.exists() ? userDoc.data().createdAt : new Date(),
			lastLoginAt: new Date(),
		};

		await setDoc(userRef, userData, {merge: true});
	} catch (error) {
		console.error('Error saving user to collection:', error);
		throw error;
	}
};

// Profile management functions with userId linking
export const saveProfile = async (profile: Profile, userId: string): Promise<string> => {
	const profileWithUserId = {
		...profile,
		userId,
		createdAt: profile.id ? undefined : new Date(),
		updatedAt: new Date(),
	};

	if (profile.id) {
		const docRef = doc(db, 'profiles', profile.id);
		await setDoc(docRef, profileWithUserId, {merge: true});
		return profile.id;
	} else {
		const collectionRef = collection(db, 'profiles');
		const docRef = await addDoc(collectionRef, profileWithUserId);
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

export const getProfilesByUserId = async (userId: string): Promise<Profile[]> => {
	try {
		const q = query(collection(db, 'profiles'), where('userId', '==', userId));
		const querySnapshot = await getDocs(q);
		const profiles: Profile[] = [];
		querySnapshot.forEach((doc) => {
			profiles.push({id: doc.id, ...doc.data()} as Profile);
		});
		return profiles;
	} catch (e) {
		console.error('Error fetching user profiles: ', e);
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
