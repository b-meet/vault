import {useState, useEffect} from 'react';
import type {Profile} from '../types';
import {
	ArrowLeft,
	Save,
	User,
	MapPin,
	Globe,
	Calendar,
	Mail,
	Phone,
	Building,
	Link,
} from 'lucide-react';
import {useNavigate, useLocation} from 'react-router';
import {ROUTES} from '../constants';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {addProfile, updateProfile} from '../redux/slice/profileSlice';
import {saveProfile} from '../firebase/firebaseService';

const AddProfile = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();
	const profiles = useAppSelector((state) => state.profile.profiles);
	const isEditing = location.search.includes('id=');
	const [isSaving, setIsSaving] = useState(false);

	const [profileData, setProfileData] = useState<Profile>({
		name: '',
		basicInfo: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			dateOfBirth: '',
		},
		address: {
			street: '',
			city: '',
			state: '',
			zipCode: '',
			country: '',
		},
		socialLinks: {
			linkedin: '',
			twitter: '',
			github: '',
			website: '',
		},
	});

	useEffect(() => {
		if (isEditing) {
			const params = new URLSearchParams(location.search);
			const profileId = params.get('id');
			const profileToEdit = profiles.find((p) => p.id === profileId);
			if (profileToEdit) {
				setProfileData(profileToEdit);
			} else {
				console.error('Profile not found for editing');
				navigate(ROUTES.DASHBOARD);
			}
		}
	}, [isEditing, location.search, profiles, navigate]);

	const handleSave = async () => {
		setIsSaving(true);
		try {
			if (isEditing) {
				if (profileData.id) {
					await saveProfile(profileData);
					dispatch(updateProfile(profileData));
				} else {
					console.error('Missing profile ID for update');
				}
			} else {
				const docId = await saveProfile(profileData);
				dispatch(addProfile({...profileData, id: docId}));
			}
			navigate(ROUTES.DASHBOARD);
		} catch (error) {
			console.error('Failed to save profile:', error);
		} finally {
			setIsSaving(false);
		}
	};

	const isFormValid =
		profileData.name.trim() !== '' &&
		(profileData.basicInfo.firstName.trim() !== '' ||
			profileData.basicInfo.email.trim() !== '');

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
			{/* Enhanced Header */}
			<nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
				<div className="flex justify-between items-center max-w-4xl mx-auto">
					<button
						onClick={() => navigate(ROUTES.DASHBOARD)}
						className="cursor-pointer flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
					>
						<ArrowLeft className="h-5 w-5" />
						<span className="font-medium">Back to Dashboard</span>
					</button>
					<button
						onClick={handleSave}
						disabled={!isFormValid || isSaving}
						className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
					>
						<Save className="h-4 w-4" />
						<span>
							{isSaving
								? 'Saving...'
								: isEditing
									? 'Update Profile'
									: 'Save Profile'}
						</span>
					</button>
				</div>
			</nav>

			<div className="max-w-4xl mx-auto px-6 py-8">
				{/* Header Section */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						{isEditing ? 'Edit Profile' : 'Create New Profile'}
					</h1>
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Profile Name *
						</label>
						<input
							type="text"
							value={profileData.name}
							onChange={(e) =>
								setProfileData({...profileData, name: e.target.value})
							}
							className="w-full text-2xl font-semibold text-gray-900 bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
							placeholder="Enter a memorable name for this profile"
						/>
					</div>
				</div>

				<div className="space-y-8">
					{/* Basic Information Card */}
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
						<div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
							<div className="flex items-center space-x-3">
								<div className="p-2 bg-blue-100 rounded-lg">
									<User className="h-5 w-5 text-blue-600" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									Basic Information
								</h3>
							</div>
						</div>
						<div className="p-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
										<User className="h-4 w-4" />
										<span>First Name</span>
									</label>
									<input
										type="text"
										value={profileData.basicInfo.firstName}
										onChange={(e) =>
											setProfileData({
												...profileData,
												basicInfo: {
													...profileData.basicInfo,
													firstName: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
										placeholder="John"
									/>
								</div>
								<div>
									<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
										<User className="h-4 w-4" />
										<span>Last Name</span>
									</label>
									<input
										type="text"
										value={profileData.basicInfo.lastName}
										onChange={(e) =>
											setProfileData({
												...profileData,
												basicInfo: {
													...profileData.basicInfo,
													lastName: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
										placeholder="Doe"
									/>
								</div>
								<div>
									<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
										<Mail className="h-4 w-4" />
										<span>Email</span>
									</label>
									<input
										type="email"
										value={profileData.basicInfo.email}
										onChange={(e) =>
											setProfileData({
												...profileData,
												basicInfo: {
													...profileData.basicInfo,
													email: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
										placeholder="john@example.com"
									/>
								</div>
								<div>
									<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
										<Phone className="h-4 w-4" />
										<span>Phone</span>
									</label>
									<input
										type="tel"
										value={profileData.basicInfo.phone}
										onChange={(e) =>
											setProfileData({
												...profileData,
												basicInfo: {
													...profileData.basicInfo,
													phone: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
										placeholder="+1 (555) 123-4567"
									/>
								</div>
								<div className="md:col-span-2">
									<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
										<Calendar className="h-4 w-4" />
										<span>Date of Birth</span>
									</label>
									<input
										type="date"
										value={profileData.basicInfo.dateOfBirth}
										onChange={(e) =>
											setProfileData({
												...profileData,
												basicInfo: {
													...profileData.basicInfo,
													dateOfBirth: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Address Card */}
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
						<div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
							<div className="flex items-center space-x-3">
								<div className="p-2 bg-green-100 rounded-lg">
									<MapPin className="h-5 w-5 text-green-600" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									Address Information
								</h3>
							</div>
						</div>
						<div className="p-6">
							<div className="space-y-6">
								<div>
									<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
										<Building className="h-4 w-4" />
										<span>Street Address</span>
									</label>
									<input
										type="text"
										value={profileData.address.street}
										onChange={(e) =>
											setProfileData({
												...profileData,
												address: {
													...profileData.address,
													street: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
										placeholder="123 Main Street, Apt 4B"
									/>
								</div>
								<div className="grid md:grid-cols-3 gap-6">
									<div>
										<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
											<MapPin className="h-4 w-4" />
											<span>City</span>
										</label>
										<input
											type="text"
											value={profileData.address.city}
											onChange={(e) =>
												setProfileData({
													...profileData,
													address: {
														...profileData.address,
														city: e.target.value,
													},
												})
											}
											className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
											placeholder="New York"
										/>
									</div>
									<div>
										<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
											<MapPin className="h-4 w-4" />
											<span>State</span>
										</label>
										<input
											type="text"
											value={profileData.address.state}
											onChange={(e) =>
												setProfileData({
													...profileData,
													address: {
														...profileData.address,
														state: e.target.value,
													},
												})
											}
											className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
											placeholder="NY"
										/>
									</div>
									<div>
										<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
											<Building className="h-4 w-4" />
											<span>ZIP Code</span>
										</label>
										<input
											type="text"
											value={profileData.address.zipCode}
											onChange={(e) =>
												setProfileData({
													...profileData,
													address: {
														...profileData.address,
														zipCode: e.target.value,
													},
												})
											}
											className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
											placeholder="10001"
										/>
									</div>
								</div>
								<div>
									<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
										<Globe className="h-4 w-4" />
										<span>Country</span>
									</label>
									<input
										type="text"
										value={profileData.address.country}
										onChange={(e) =>
											setProfileData({
												...profileData,
												address: {
													...profileData.address,
													country: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
										placeholder="United States"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Social Links Card */}
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
						<div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
							<div className="flex items-center space-x-3">
								<div className="p-2 bg-purple-100 rounded-lg">
									<Link className="h-5 w-5 text-purple-600" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900">
									Social Links
								</h3>
							</div>
						</div>
						<div className="p-6">
							<div className="space-y-6">
								<div>
									<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
										<div className="h-4 w-4 bg-blue-600 rounded"></div>
										<span>LinkedIn</span>
									</label>
									<input
										type="text"
										value={profileData.socialLinks.linkedin}
										onChange={(e) =>
											setProfileData({
												...profileData,
												socialLinks: {
													...profileData.socialLinks,
													linkedin: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
										placeholder="linkedin.com/in/username"
									/>
								</div>
								<div>
									<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
										<div className="h-4 w-4 bg-sky-400 rounded"></div>
										<span>Twitter</span>
									</label>
									<input
										type="text"
										value={profileData.socialLinks.twitter}
										onChange={(e) =>
											setProfileData({
												...profileData,
												socialLinks: {
													...profileData.socialLinks,
													twitter: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
										placeholder="@username"
									/>
								</div>
								<div>
									<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
										<div className="h-4 w-4 bg-gray-900 rounded"></div>
										<span>GitHub</span>
									</label>
									<input
										type="text"
										value={profileData.socialLinks.github}
										onChange={(e) =>
											setProfileData({
												...profileData,
												socialLinks: {
													...profileData.socialLinks,
													github: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
										placeholder="github.com/username"
									/>
								</div>
								<div>
									<label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
										<Globe className="h-4 w-4" />
										<span>Website</span>
									</label>
									<input
										type="text"
										value={profileData.socialLinks.website}
										onChange={(e) =>
											setProfileData({
												...profileData,
												socialLinks: {
													...profileData.socialLinks,
													website: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
										placeholder="yourwebsite.com"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-between items-center pt-6">
						<button
							onClick={() => navigate(ROUTES.DASHBOARD)}
							className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={handleSave}
							disabled={!isFormValid || isSaving}
							className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
						>
							<Save className="h-5 w-5" />
							<span>
								{isSaving
									? 'Saving...'
									: isEditing
										? 'Update Profile'
										: 'Save Profile'}
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddProfile;
