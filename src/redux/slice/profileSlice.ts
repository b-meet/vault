import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'; // Import createAsyncThunk
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Profile} from '../../types';
import { getProfiles } from '../../firebaseService'; // Corrected import path

interface ProfileState {
	profiles: Profile[];
	activeProfileId: string | null;
	loading: boolean; // Add loading state
	error: string | null; // Add error state
}

const initialState: ProfileState = {
	profiles: [],
	activeProfileId: null,
	loading: false, // Initialize loading to false
	error: null, // Initialize error to null
};

// Define the async thunk for fetching profiles
const fetchProfiles = createAsyncThunk( // Removed export keyword here
  'profiles/fetchProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const profiles = await getProfiles();
      return profiles;
    } catch (error: unknown) { // Changed error type to unknown
      // Assert error as Error to access message property
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
			.addCase(fetchProfiles.fulfilled, (state, action: PayloadAction<Profile[]>) => {
				state.loading = false;
				state.profiles = action.payload;
			})
			.addCase(fetchProfiles.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string; // Cast payload to string
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

export { fetchProfiles, type ProfileState }; // Export fetchProfiles thunk and ProfileState as type
export default profileSlice.reducer;
