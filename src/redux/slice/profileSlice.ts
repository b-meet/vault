import {createSlice} from '@reduxjs/toolkit';

const profileSlice = createSlice({
	name: 'profiles',
	initialState: [
		{
			id: '1',
			name: 'Personal',
			basicInfo: {
				firstName: 'John',
				lastName: 'Baburao',
				email: 'john.doe@email.com',
				phone: '+1 (555) 123-4567',
				dateOfBirth: '1990-01-15',
			},
			address: {
				street: '123 Main St',
				city: 'San Francisco',
				state: 'CA',
				zipCode: '94102',
				country: 'USA',
			},
			socialLinks: {
				linkedin: 'linkedin.com/in/johndoe',
				twitter: '@johndoe',
				github: 'github.com/johndoe',
				website: 'johndoe.com',
			},
		},
	],
	reducers: {
		addProfile: (state, action) => {
			const newProfile = action.payload;
			state.push(newProfile);
		},
		updateProfile: () => {},
		deleteProfile: () => {},
		setActiveProfile: () => {},
		resetProfiles: () => {},
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
