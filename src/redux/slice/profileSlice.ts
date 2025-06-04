import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Profile} from '../../types';
interface ProfileState {
	profiles: Profile[];
	activeProfileId: string | null;
}

const initialState: ProfileState = {
	profiles: [],
	activeProfileId: null,
};

const profileSlice = createSlice({
	name: 'profiles',
	initialState,
	reducers: {
		addProfile: (state, action: PayloadAction<Profile>) => {
			state.profiles.push(action.payload);
		},
		updateProfile: (state, action: PayloadAction<Profile>) => {
			const index = state.profiles.findIndex((p: Profile) => p.id === action.payload.id);
			if (index !== -1) {
				state.profiles[index] = action.payload;
			}
		},
		deleteProfile: (state, action: PayloadAction<string>) => {
			state.profiles = state.profiles.filter((p: Profile) => p.id !== action.payload);
			if (state.activeProfileId === action.payload) {
				state.activeProfileId = null;
			}
		},
		setActiveProfile: (state, action: PayloadAction<string | null>) => {
			state.activeProfileId = action.payload;
		},
		resetProfiles: (state) => {
			state.profiles = [];
			state.activeProfileId = null;
		},
	},
});

export const {
	addProfile,
	updateProfile,
	deleteProfile,
	setActiveProfile,
	resetProfiles,
} = profileSlice.actions;
export default profileSlice.reducer;
