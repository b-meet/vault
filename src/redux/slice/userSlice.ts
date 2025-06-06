import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {SESSION_TIMEOUT, STORAGE_KEYS} from '../../constants';
import {storage} from '../../utility/storageService';
import type {UserState} from '../types';
import {clearUserSession} from '../../utility/userSession';
import {
	checkAuthState,
	loginWithEmail,
	loginWithGoogle,
	logout,
	refreshUserToken,
	signupWithEmail,
} from '../thunk/userThunk';

const initialState: UserState = {
	user: storage.get(STORAGE_KEYS.USER),
	token: storage.get(STORAGE_KEYS.TOKEN),
	refreshToken: storage.get(STORAGE_KEYS.REFRESH_TOKEN),
	isAuthenticated: !!storage.get(STORAGE_KEYS.USER),
	loading: false,
	error: null,
	sessionExpiry: storage.get(STORAGE_KEYS.SESSION_EXPIRY),
	lastActivity: storage.get(STORAGE_KEYS.LAST_ACTIVITY) ?? Date.now(),
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateLastActivity: (state) => {
			const now = Date.now();
			state.lastActivity = now;
			storage.set(STORAGE_KEYS.LAST_ACTIVITY, now);
		},

		clearError: (state) => {
			state.error = null;
		},

		checkSessionTimeout: (state) => {
			const now = Date.now();
			const {sessionExpiry, lastActivity} = state;

			if (sessionExpiry && now > sessionExpiry) {
				// Session expired
				state.user = null;
				state.token = null;
				state.refreshToken = null;
				state.isAuthenticated = false;
				state.sessionExpiry = null;
				clearUserSession();
			} else if (lastActivity && now - lastActivity > SESSION_TIMEOUT) {
				// Inactive timeout
				state.user = null;
				state.token = null;
				state.refreshToken = null;
				state.isAuthenticated = false;
				state.sessionExpiry = null;
				clearUserSession();
			}
		},

		forceLogout: (state) => {
			state.user = null;
			state.token = null;
			state.refreshToken = null;
			state.isAuthenticated = false;
			state.loading = false;
			state.error = null;
			state.sessionExpiry = null;
			clearUserSession();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginWithEmail.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginWithEmail.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.refreshToken = action.payload.refreshToken;
				state.isAuthenticated = true;
				state.sessionExpiry = Date.now() + SESSION_TIMEOUT;
				state.lastActivity = Date.now();
				state.error = null;
			})
			.addCase(loginWithEmail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// Signup with email
			.addCase(signupWithEmail.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signupWithEmail.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.refreshToken = action.payload.refreshToken;
				state.isAuthenticated = true;
				state.sessionExpiry = Date.now() + SESSION_TIMEOUT;
				state.lastActivity = Date.now();
				state.error = null;
			})
			.addCase(signupWithEmail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// Login with Google
			.addCase(loginWithGoogle.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginWithGoogle.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.refreshToken = action.payload.refreshToken;
				state.isAuthenticated = true;
				state.sessionExpiry = Date.now() + SESSION_TIMEOUT;
				state.lastActivity = Date.now();
				state.error = null;
			})
			.addCase(loginWithGoogle.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// Refresh token
			.addCase(refreshUserToken.pending, (state) => {
				state.loading = true;
			})
			.addCase(refreshUserToken.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload.token;
				state.sessionExpiry = action.payload.sessionExpiry;
				state.lastActivity = action.payload.lastActivity;
				state.error = null;
			})
			.addCase(refreshUserToken.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				// Force logout on refresh failure
				state.user = null;
				state.token = null;
				state.refreshToken = null;
				state.isAuthenticated = false;
				state.sessionExpiry = null;
				clearUserSession();
			})

			// Logout
			.addCase(logout.pending, (state) => {
				state.loading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
				state.token = null;
				state.refreshToken = null;
				state.isAuthenticated = false;
				state.error = null;
				state.sessionExpiry = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// Check auth state
			.addCase(checkAuthState.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				checkAuthState.fulfilled,
				(
					state,
					action: PayloadAction<{
						user: UserState['user'];
						token: string;
						refreshToken: string;
					} | null>
				) => {
					state.loading = false;
					if (action.payload) {
						state.user = action.payload.user;
						state.token = action.payload.token;
						state.refreshToken = action.payload.refreshToken;
						state.isAuthenticated = true;
						state.sessionExpiry = Date.now() + SESSION_TIMEOUT;
						state.lastActivity = Date.now();
					} else {
						state.user = null;
						state.token = null;
						state.refreshToken = null;
						state.isAuthenticated = false;
						state.sessionExpiry = null;
					}
					state.error = null;
				}
			)
			.addCase(checkAuthState.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {
	updateLastActivity,
	clearError,
	checkSessionTimeout,
	forceLogout,
} = userSlice.actions;

export default userSlice.reducer;
