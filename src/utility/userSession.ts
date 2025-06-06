import type {User} from 'firebase/auth';
import {SESSION_TIMEOUT, STORAGE_KEYS} from '../constants';
import {storage} from './storageService';

// Helper to extract user data
export const extractUserData = (user: User) => ({
	uid: user.uid,
	email: user.email,
	displayName: user.displayName,
	photoURL: user.photoURL,
	emailVerified: user.emailVerified,
});

// Helper to save user session
export const saveUserSession = (user: User, token: string) => {
	const userData = extractUserData(user);
	const now = Date.now();
	const sessionExpiry = now + SESSION_TIMEOUT;

	storage.set(STORAGE_KEYS.USER, userData);
	storage.set(STORAGE_KEYS.TOKEN, token);
	storage.set(STORAGE_KEYS.REFRESH_TOKEN, user.refreshToken);
	storage.set(STORAGE_KEYS.SESSION_EXPIRY, sessionExpiry);
	storage.set(STORAGE_KEYS.LAST_ACTIVITY, now);
};

// Helper to clear user session
export const clearUserSession = () => {
	storage.clear();
};
