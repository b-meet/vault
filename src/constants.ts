export const ROUTES = {
	LANDING: '/',
	AUTH: '/join',
	DASHBOARD: '/dashboard',
	EXTENTIONS: '/extention',
	ADD_PROFILE: '/add-profile',
	USER_PROFILE: '/profile',
};

export const STORAGE_KEYS = {
	USER: 'vault_user',
	TOKEN: 'vault_token',
	REFRESH_TOKEN: 'vault_refresh_token',
	SESSION_EXPIRY: 'vault_session_expiry',
	LAST_ACTIVITY: 'vault_last_activity',
};

export const SESSION_TIMEOUT = 60 * 60 * 1000;
export const ACTIVITY_EVENTS = [
	'mousedown',
	'mousemove',
	'keypress',
	'scroll',
	'touchstart',
	'click',
];
export const CHECK_INTERVAL = 60000;
export const REFRESH_THRESHOLD = 5 * 60 * 1000; // Refresh token 5 minutes before expiry
