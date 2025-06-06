import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Profile} from '../../types';
import {getProfiles, getProfilesByUserId} from '../../firebase/firebaseService';

interface ProfileState {
	profiles: Profile[];
	activeProfileId: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: ProfileState = {
	profiles: [],
	activeProfileId: null,
	loading: false,
	error: null,
};

const fetchProfiles = createAsyncThunk(
	'profiles/fetchProfiles',
	async (_, {rejectWithValue}) => {
		try {
			const profiles = await getProfiles();
			return profiles;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message);
		}
	}
);

const fetchProfilesByUserId = createAsyncThunk(
	'profiles/fetchProfilesByUserId',
	async (userId: string, {rejectWithValue}) => {
		try {
			const profiles = await getProfilesByUserId(userId);
			return profiles;
		} catch (error: unknown) {
			return rejectWithValue((error as Error).message);
		}
	}
);

const profileSlice = createSlice({
	name: 'profiles',
	initialState,
	reducers: {
		addProfile: (state, action: PayloadAction<Profile>) => {
			state.profiles.push(action.payload);
		},
		updateProfile: (state, action: PayloadAction<Profile>) => {
			const index = state.profiles.findIndex(
				(p: Profile) => p.id === action.payload.id
			);
			if (index !== -1) {
				state.profiles[index] = action.payload;
			}
		},
		deleteProfile: (state, action: PayloadAction<string>) => {
			state.profiles = state.profiles.filter(
				(p: Profile) => p.id !== action.payload
			);
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
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProfiles.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchProfiles.fulfilled,
				(state, action: PayloadAction<Profile[]>) => {
					state.loading = false;
					state.profiles = action.payload;
				}
			)
			.addCase(fetchProfiles.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchProfilesByUserId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchProfilesByUserId.fulfilled,
				(state, action: PayloadAction<Profile[]>) => {
					state.loading = false;
					state.profiles = action.payload;
				}
			)
			.addCase(fetchProfilesByUserId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {
	addProfile,
	updateProfile,
	deleteProfile,
	setActiveProfile,
	resetProfiles,
} = profileSlice.actions;

export {fetchProfiles, fetchProfilesByUserId, type ProfileState};
export default profileSlice.reducer;
