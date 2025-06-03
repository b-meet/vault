import {useState} from 'react';
import type {Profile} from '../types';
import {ArrowRight} from 'lucide-react';
import {useNavigate} from 'react-router';
import {ROUTES} from '../constants';

const AddProfile = () => {
	const navigate = useNavigate();
	const [profiles, setProfiles] = useState<Profile[]>([
		{
			id: '1',
			name: 'Personal',
			basicInfo: {
				firstName: 'John',
				lastName: 'Doe',
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
	]);
	const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
	const [profileData, setProfileData] = useState<Profile>(
		selectedProfile || {
			id: Date.now().toString(),
			name: 'New Profile',
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
		}
	);

	const handleSave = () => {
		if (selectedProfile) {
			setProfiles(
				profiles.map((p) => (p.id === profileData.id ? profileData : p))
			);
		} else {
			setProfiles([...profiles, profileData]);
		}
		navigate(ROUTES.DASHBOARD);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white shadow-sm px-6 py-4">
				<div className="flex justify-between items-center">
					<button
						onClick={() => navigate(ROUTES.DASHBOARD)}
						className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
					>
						<ArrowRight className="h-5 w-5 rotate-180" />
						<span>Back to Dashboard</span>
					</button>
					<div className="flex items-center space-x-4">
						<button
							onClick={handleSave}
							className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
						>
							Save Profile
						</button>
					</div>
				</div>
			</nav>

			<div className="max-w-2xl mx-auto px-6 py-8">
				<div className="bg-white rounded-xl shadow-sm p-8">
					<div className="mb-8">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">
							{selectedProfile ? 'Edit Profile' : 'Create New Profile'}
						</h1>
						<input
							type="text"
							value={profileData.name}
							onChange={(e) =>
								setProfileData({...profileData, name: e.target.value})
							}
							className="text-lg font-medium text-gray-600 border-none outline-none bg-transparent"
							placeholder="Profile Name"
						/>
					</div>

					<div className="space-y-8">
						{/* Basic Info */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Basic Information
							</h3>
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										First Name
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
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Last Name
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
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Email
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
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Phone
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
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Date of Birth
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
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
							</div>
						</div>

						{/* Address */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Address
							</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Street Address
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
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
								<div className="grid md:grid-cols-3 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											City
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
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											State
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
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											ZIP Code
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
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Country
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
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
							</div>
						</div>

						{/* Social Links */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Social Links
							</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										LinkedIn
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
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
										placeholder="linkedin.com/in/username"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Twitter
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
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
										placeholder="@username"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										GitHub
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
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
										placeholder="github.com/username"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Website
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
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
										placeholder="yourwebsite.com"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddProfile;
