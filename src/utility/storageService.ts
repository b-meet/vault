import {STORAGE_KEYS} from '../constants';

export const storage = {
	set: (key: string, value: unknown) => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error('Error saving to localStorage:', error);
		}
	},
	get: (key: string) => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : null;
		} catch (error) {
			console.error('Error reading from localStorage:', error);
			return null;
		}
	},
	remove: (key: string) => {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error('Error removing from localStorage:', error);
		}
	},
	clear: () => {
		try {
			Object.values(STORAGE_KEYS).forEach((key) => {
				localStorage.removeItem(key);
			});
		} catch (error) {
			console.error('Error clearing localStorage:', error);
		}
	},
};
