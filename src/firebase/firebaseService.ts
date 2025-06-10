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
	phone?: string;
	dateOfBirth?: string;
	location?: string;
	notifications?: {
		email: boolean;
		browser: boolean;
		security: boolean;
	};
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
		const existingData = userDoc.exists() ? userDoc.data() : {};

		const userData: UserDocument = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified,
			createdAt: userDoc.exists() ? existingData.createdAt : new Date(),
			lastLoginAt: new Date(),
			phone: existingData.phone ?? '',
			dateOfBirth: existingData.dateOfBirth ?? '',
			location: existingData.location ?? '',
			notifications: existingData.notifications ?? {
				email: true,
				browser: true,
				security: true,
			},
		};

		await setDoc(userRef, userData, { merge: true });
	} catch (error) {
		console.error('Error saving user to collection:', error);
		throw error;
	}
};

//for updating the user details in the user collection
export const updateUserProfile = async (
	uid: string,
	updates: Partial<UserDocument>
): Promise<void> => {
	try {
		const userRef = doc(db, 'users', uid);
		await setDoc(userRef, updates, { merge: true });
	} catch (error) {
		console.error('Error updating user profile:', error);
		throw error;
	}
};

// Function to get user profile by UID
export const getUserProfile = async (uid: string) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User profile not found');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
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
