/* eslint-disable @typescript-eslint/no-explicit-any */
import {useNavigate} from 'react-router';
import {useAppDispatch, useAppSelector} from './redux';
import {useCallback, useEffect, useRef} from 'react';
import {
	checkSessionTimeout,
	forceLogout,
	updateLastActivity,
} from '../redux/slice/userSlice';
import {checkAuthState, refreshUserToken} from '../redux/thunk/userThunk';
import {
	ACTIVITY_EVENTS,
	CHECK_INTERVAL,
	REFRESH_THRESHOLD,
	ROUTES,
} from '../constants';
import {store} from '../redux/store';

export const useSessionManager = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const intervalRef = useRef<NodeJS.Timeout>(null);
	const lastActivityRef = useRef<number>(Date.now());

	const {isAuthenticated, sessionExpiry, token, user} = useAppSelector(
		(state) => state.user
	);

	// Update last activity
	const updateActivity = useCallback(() => {
		const now = Date.now();
		lastActivityRef.current = now;
		if (isAuthenticated) {
			dispatch(updateLastActivity());
		}
	}, [dispatch, isAuthenticated]);

	// Check if token needs refresh
	const checkTokenRefresh = useCallback(async () => {
		if (!isAuthenticated || !sessionExpiry || !token) return;

		const now = Date.now();
		const timeUntilExpiry = sessionExpiry - now;

		// Refresh token if it expires soon
		if (timeUntilExpiry <= REFRESH_THRESHOLD && timeUntilExpiry > 0) {
			try {
				await dispatch(refreshUserToken()).unwrap();
			} catch (error) {
				console.error('Failed to refresh token:', error);
				dispatch(forceLogout());
				navigate(ROUTES.AUTH || '/auth');
			}
		}
	}, [isAuthenticated, sessionExpiry, token, dispatch, navigate]);

	// Check session validity
	const checkSession = useCallback(() => {
		if (!isAuthenticated) return;

		dispatch(checkSessionTimeout());

		// Check if user was logged out due to session timeout
		const state = store.getState();
		if (!state.user.isAuthenticated && isAuthenticated) {
			navigate(ROUTES.AUTH || '/auth');
		}
	}, [dispatch, isAuthenticated, navigate]);

	// Initialize session management
	useEffect(() => {
		if (!isAuthenticated) return;

		// Add activity listeners
		ACTIVITY_EVENTS.forEach((event) => {
			document.addEventListener(event, updateActivity, true);
		});

		// Set up periodic checks
		intervalRef.current = setInterval(() => {
			checkSession();
			checkTokenRefresh();
		}, CHECK_INTERVAL);

		return () => {
			// Cleanup
			ACTIVITY_EVENTS.forEach((event) => {
				document.removeEventListener(event, updateActivity, true);
			});

			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isAuthenticated, updateActivity, checkSession, checkTokenRefresh]);

	// Check auth state on app load
	useEffect(() => {
		dispatch(checkAuthState());
	}, [dispatch]);

	return {
		isAuthenticated,
		user,
		sessionExpiry,
		lastActivity: lastActivityRef.current,
		updateActivity,
		checkSession,
		refreshToken: () => dispatch(refreshUserToken()),
		logout: () => dispatch(forceLogout()),
	};
};

// Axios interceptor for automatic token refresh
export const setupAxiosInterceptors = (axiosInstance: any, store: any) => {
	// Request interceptor to add token
	axiosInstance.interceptors.request.use(
		(config: any) => {
			const state = store.getState();
			const token = state.user.token;

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		},
		(error: any) => Promise.reject(error)
	);

	// Response interceptor to handle token expiry
	axiosInstance.interceptors.response.use(
		(response: any) => response,
		async (error: any) => {
			const originalRequest = error.config;

			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				try {
					await store.dispatch(refreshUserToken()).unwrap();
					const state = store.getState();
					const newToken = state.user.token;

					if (newToken) {
						originalRequest.headers.Authorization = `Bearer ${newToken}`;
						return axiosInstance(originalRequest);
					}
				} catch (refreshError) {
					store.dispatch(forceLogout());
					window.location.href = ROUTES.AUTH;
					return Promise.reject(refreshError);
				}
			}

			return Promise.reject(error);
		}
	);
};
