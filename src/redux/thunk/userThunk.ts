/* eslint-disable @typescript-eslint/no-explicit-any */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
	clearUserSession,
	extractUserData,
	saveUserSession,
} from '../../utility/userSession';
import {
	createUserWithEmailAndPassword,
	getIdToken,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import {auth} from '../../firebase/firebaseConfig';
import {SESSION_TIMEOUT, STORAGE_KEYS} from '../../constants';
import {storage} from '../../utility/storageService';
import {saveUserToCollection} from '../../firebase/firebaseService';
import type {
	AuthCheckResponse,
	LoginCredentials,
	SignupCredentials,
} from '../types';

export const loginWithEmail = createAsyncThunk(
	'user/loginWithEmail',
	async ({email, password}: LoginCredentials, {rejectWithValue}) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const token = await getIdToken(userCredential.user);

			// Save user to Firestore collection
			await saveUserToCollection(extractUserData(userCredential.user));

			saveUserSession(userCredential.user, token);

			return {
				user: extractUserData(userCredential.user),
				token,
				refreshToken: userCredential.user.refreshToken,
			};
		} catch (error: any) {
			return rejectWithValue(error?.message);
		}
	}
);

export const signupWithEmail = createAsyncThunk(
	'user/signupWithEmail',
	async (
		{email, password, displayName}: SignupCredentials,
		{rejectWithValue}
	) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const token = await getIdToken(userCredential.user);

			// ✅ Use updateProfile from firebase/auth
			if (displayName) {
				await updateProfile(userCredential.user, {displayName});
			}

			// Save user to Firestore collection
			await saveUserToCollection(extractUserData(userCredential.user));

			saveUserSession(userCredential.user, token);

			return {
				user: extractUserData(userCredential.user),
				token,
				refreshToken: userCredential.user.refreshToken,
			};
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const loginWithGoogle = createAsyncThunk(
	'user/loginWithGoogle',
	async (_, {rejectWithValue}) => {
		try {
			const provider = new GoogleAuthProvider();
			const userCredential = await signInWithPopup(auth, provider);
			const token = await getIdToken(userCredential.user);

			// Save user to Firestore collection
			await saveUserToCollection(extractUserData(userCredential.user));

			saveUserSession(userCredential.user, token);

			return {
				user: extractUserData(userCredential.user),
				token,
				refreshToken: userCredential.user.refreshToken,
			};
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const refreshUserToken = createAsyncThunk(
	'user/refreshToken',
	async (_, {rejectWithValue}) => {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				throw new Error('No authenticated user');
			}

			const token = await getIdToken(currentUser, true); // Force refresh
			const now = Date.now();
			const sessionExpiry = now + SESSION_TIMEOUT;

			// Update storage
			storage.set(STORAGE_KEYS.TOKEN, token);
			storage.set(STORAGE_KEYS.SESSION_EXPIRY, sessionExpiry);
			storage.set(STORAGE_KEYS.LAST_ACTIVITY, now);

			return {
				token,
				sessionExpiry,
				lastActivity: now,
			};
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const logout = createAsyncThunk(
	'user/logout',
	async (_, {rejectWithValue, dispatch}) => {
		try {
			await signOut(auth);
			clearUserSession();
			// Reset profiles when user logs out
			const {resetProfiles} = await import('../slice/profileSlice');
			dispatch(resetProfiles());
			return null;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const checkAuthState = createAsyncThunk<AuthCheckResponse>(
	'user/checkAuthState',
	async (_, {rejectWithValue}) => {
		try {
			const result = await new Promise<AuthCheckResponse>((resolve) => {
				const unsubscribe = onAuthStateChanged(auth, async (user) => {
					if (user) {
						try {
							const token = await getIdToken(user);
							
							// Save user to Firestore collection on auth state check
							await saveUserToCollection(extractUserData(user));
							
							saveUserSession(user, token);
							resolve({
								user: extractUserData(user),
								token,
								refreshToken: user.refreshToken,
							});
						} catch (error) {
							resolve(null);
							console.error('Error getting token:', error);
						}
					} else {
						clearUserSession();
						resolve(null);
					}
					unsubscribe();
				});
			});
			return result;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);
