import React, {useState} from 'react';
import {
	User,
	ArrowRight,
	Camera,
	Mail,
	Phone,
	Calendar,
	Shield,
	Bell,
	Key,
	Trash2,
	Save,
} from 'lucide-react';
import {useNavigate} from 'react-router';
import {ROUTES} from '../constants';

const Account: React.FC = () => {
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState(false);
	const [accountData, setAccountData] = useState({
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@email.com',
		phone: '+1 (555) 123-4567',
		dateOfBirth: '1990-01-15',
		notifications: {
			email: true,
			browser: true,
			security: true,
		},
		privacy: {
			profileVisibility: 'private',
			dataSharing: false,
		},
	});

	const handleSave = () => {
		setIsEditing(false);
		// Save logic would go here
		console.log('Saving account data:', accountData);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white shadow-sm px-6 py-4 sticky top-0 z-50">
				<div className="flex justify-between items-center">
					<button
						onClick={() => navigate(ROUTES.DASHBOARD)}
						className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer"
					>
						<ArrowRight className="h-5 w-5 rotate-180" />
						<span>Back to Dashboard</span>
					</button>
					<div className="flex items-center space-x-4">
						{isEditing ? (
							<>
								<button
									onClick={() => setIsEditing(false)}
									className="cursor-pointer px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
								>
									Cancel
								</button>
								<button
									onClick={handleSave}
									className="cursor-pointer px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
								>
									<Save className="h-4 w-4" />
									<span>Save Changes</span>
								</button>
							</>
						) : (
							<button
								onClick={() => setIsEditing(true)}
									className="cursor-pointer px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
							>
								Edit Profile
							</button>
						)}
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<div className="max-w-2xl mx-auto px-6 py-8">
				<div className="bg-white rounded-xl shadow-sm p-8">
					{/* Profile Header */}
					<div className="flex items-center space-x-6 mb-8">
						<div className="relative">
							<div className="h-24 w-24 bg-indigo-600 rounded-full flex items-center justify-center">
								<User className="h-12 w-12 text-white" />
							</div>
							{isEditing && (
								<button className="absolute -bottom-2 -right-2 h-8 w-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50">
									<Camera className="h-4 w-4 text-gray-600" />
								</button>
							)}
						</div>
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								{accountData.firstName} {accountData.lastName}
							</h1>
							<p className="text-gray-600 mt-1">{accountData.email}</p>
							<div className="flex items-center space-x-2 mt-2">
								<div className="h-2 w-2 rounded-full bg-green-500"></div>
								<span className="text-sm text-gray-600">Account Active</span>
							</div>
						</div>
					</div>

					<div className="space-y-8">
						{/* Personal Information */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
								<User className="h-5 w-5" />
								<span>Personal Information</span>
							</h3>
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										First Name
									</label>
									<input
										type="text"
										value={accountData.firstName}
										onChange={(e) =>
											setAccountData({
												...accountData,
												firstName: e.target.value,
											})
										}
										disabled={!isEditing}
										className={`w-full px-4 py-3 border rounded-lg ${
											isEditing
												? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
												: 'border-gray-200 bg-gray-50'
										}`}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Last Name
									</label>
									<input
										type="text"
										value={accountData.lastName}
										onChange={(e) =>
											setAccountData({...accountData, lastName: e.target.value})
										}
										disabled={!isEditing}
										className={`w-full px-4 py-3 border rounded-lg ${
											isEditing
												? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
												: 'border-gray-200 bg-gray-50'
										}`}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Email
									</label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
										<input
											type="email"
											value={accountData.email}
											onChange={(e) =>
												setAccountData({...accountData, email: e.target.value})
											}
											disabled={!isEditing}
											className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
												isEditing
													? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
													: 'border-gray-200 bg-gray-50'
											}`}
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Phone
									</label>
									<div className="relative">
										<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
										<input
											type="tel"
											value={accountData.phone}
											onChange={(e) =>
												setAccountData({...accountData, phone: e.target.value})
											}
											disabled={!isEditing}
											className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
												isEditing
													? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
													: 'border-gray-200 bg-gray-50'
											}`}
										/>
									</div>
								</div>
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Date of Birth
									</label>
									<div className="relative">
										<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
										<input
											type="date"
											value={accountData.dateOfBirth}
											onChange={(e) =>
												setAccountData({
													...accountData,
													dateOfBirth: e.target.value,
												})
											}
											disabled={!isEditing}
											className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
												isEditing
													? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
													: 'border-gray-200 bg-gray-50'
											}`}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Security Settings */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
								<Shield className="h-5 w-5" />
								<span>Security</span>
							</h3>
							<div className="space-y-4">
								<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
									<div>
										<h4 className="font-medium text-gray-900">Password</h4>
										<p className="text-sm text-gray-600">
											Last changed 30 days ago
										</p>
									</div>
									<button className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium">
										Change
									</button>
								</div>

								<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
									<div>
										<h4 className="font-medium text-gray-900">
											Two-Factor Authentication
										</h4>
										<p className="text-sm text-gray-600">
											Add an extra layer of security
										</p>
									</div>
									<button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
										Enable
									</button>
								</div>

								<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
									<div>
										<h4 className="font-medium text-gray-900">
											Login Sessions
										</h4>
										<p className="text-sm text-gray-600">3 active sessions</p>
									</div>
									<button className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium">
										Manage
									</button>
								</div>
							</div>
						</div>

						{/* Notification Preferences */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
								<Bell className="h-5 w-5" />
								<span>Notifications</span>
							</h3>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-medium text-gray-900">
											Email Notifications
										</h4>
										<p className="text-sm text-gray-600">
											Receive updates via email
										</p>
									</div>
									<button
										onClick={() =>
											setAccountData({
												...accountData,
												notifications: {
													...accountData.notifications,
													email: !accountData.notifications.email,
												},
											})
										}
										className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
											accountData.notifications.email
												? 'bg-indigo-600'
												: 'bg-gray-200'
										}`}
									>
										<span
											className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
												accountData.notifications.email
													? 'translate-x-6'
													: 'translate-x-1'
											}`}
										/>
									</button>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-medium text-gray-900">
											Browser Notifications
										</h4>
										<p className="text-sm text-gray-600">
											Get notified in your browser
										</p>
									</div>
									<button
										onClick={() =>
											setAccountData({
												...accountData,
												notifications: {
													...accountData.notifications,
													browser: !accountData.notifications.browser,
												},
											})
										}
										className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
											accountData.notifications.browser
												? 'bg-indigo-600'
												: 'bg-gray-200'
										}`}
									>
										<span
											className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
												accountData.notifications.browser
													? 'translate-x-6'
													: 'translate-x-1'
											}`}
										/>
									</button>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-medium text-gray-900">
											Security Alerts
										</h4>
										<p className="text-sm text-gray-600">
											Important security notifications
										</p>
									</div>
									<button
										onClick={() =>
											setAccountData({
												...accountData,
												notifications: {
													...accountData.notifications,
													security: !accountData.notifications.security,
												},
											})
										}
										className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
											accountData.notifications.security
												? 'bg-indigo-600'
												: 'bg-gray-200'
										}`}
									>
										<span
											className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
												accountData.notifications.security
													? 'translate-x-6'
													: 'translate-x-1'
											}`}
										/>
									</button>
								</div>
							</div>
						</div>

						{/* Privacy Settings */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
								<Key className="h-5 w-5" />
								<span>Privacy</span>
							</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Profile Visibility
									</label>
									<select
										value={accountData.privacy.profileVisibility}
										onChange={(e) =>
											setAccountData({
												...accountData,
												privacy: {
													...accountData.privacy,
													profileVisibility: e.target.value,
												},
											})
										}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									>
										<option value="private">Private</option>
										<option value="friends">Friends Only</option>
										<option value="public">Public</option>
									</select>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-medium text-gray-900">Data Sharing</h4>
										<p className="text-sm text-gray-600">
											Allow anonymous usage analytics
										</p>
									</div>
									<button
										onClick={() =>
											setAccountData({
												...accountData,
												privacy: {
													...accountData.privacy,
													dataSharing: !accountData.privacy.dataSharing,
												},
											})
										}
										className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
											accountData.privacy.dataSharing
												? 'bg-indigo-600'
												: 'bg-gray-200'
										}`}
									>
										<span
											className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
												accountData.privacy.dataSharing
													? 'translate-x-6'
													: 'translate-x-1'
											}`}
										/>
									</button>
								</div>
							</div>
						</div>

						{/* Account Actions */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Account Actions
							</h3>
							<div className="space-y-3">
								<button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
									<div>
										<h4 className="font-medium text-gray-900">
											Download Account Data
										</h4>
										<p className="text-sm text-gray-600">
											Export all your account information
										</p>
									</div>
									<ArrowRight className="h-5 w-5 text-gray-400" />
								</button>

								<button className="w-full flex items-center justify-between p-4 border border-red-300 rounded-lg hover:bg-red-50 text-left">
									<div className="flex items-center space-x-3">
										<Trash2 className="h-5 w-5 text-red-600" />
										<div>
											<h4 className="font-medium text-red-600">
												Delete Account
											</h4>
											<p className="text-sm text-red-500">
												Permanently delete your account and all data
											</p>
										</div>
									</div>
									<ArrowRight className="h-5 w-5 text-red-400" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
