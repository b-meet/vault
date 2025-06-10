import {useEffect, useState} from 'react';
import {
	ArrowLeft,
	Camera,
	Mail,
	Phone,
	Calendar,
	Trash2,
	Check,
	Download,
	Lock,
	ArrowRight,
} from 'lucide-react';
import {ROUTES} from '../constants';
import {useNavigate} from 'react-router';
import {useAppSelector} from '../hooks/redux';
import { getUserProfile, updateUserProfile } from '../firebase/firebaseService';

const Account = () => {
	const navigate = useNavigate();
	const {user} = useAppSelector((state) => state.user);

	const [isEditing, setIsEditing] = useState(false);
	const [accountData, setAccountData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		dateOfBirth: '',
		location: '',
		notifications: {
			email: true,
			browser: true,
			security: true,
		},
	});

	useEffect(() => {
		if (user?.uid) {
			getUserProfile(user.uid)
				.then((profileData) => {
					setAccountData({
						firstName: profileData.displayName?.split(' ')[0] ?? '',
						lastName: profileData.displayName?.split(' ')[1] ?? '',
						email: user.email ?? '',
						phone: profileData.phone ?? '',
						dateOfBirth: profileData.dateOfBirth ?? '',
						location: profileData.location ?? '',
						notifications: {
							email: profileData.notifications?.email ?? true,
							browser: profileData.notifications?.browser ?? true,
							security: profileData.notifications?.security ?? true,
						},
					});
				})
				.catch((err) => console.error('Failed to fetch user profile:', err));
		}
	}, [user?.uid]);

	const handleSave = async () => {
		try {
			if (user?.uid) {
				await updateUserProfile(user.uid, {
					displayName: `${accountData.firstName?.trim() || ''} ${accountData.lastName?.trim() || ''}`.trim(),
					phone: accountData.phone,
					dateOfBirth: accountData.dateOfBirth,
					location: accountData.location,
					notifications: accountData.notifications,
				});
			}
			setIsEditing(false);
		} catch (error) {
			console.error('Failed to save profile:', error);
		}
	};


	const ToggleSwitch = ({
		checked,
		onChange,
	}: {
		checked: boolean;
		onChange: () => void;
	}) => (
		<button
			onClick={onChange}
			className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
				checked ? 'bg-indigo-600' : 'bg-gray-300'
			}`}
		>
			<span
				className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
					checked ? 'translate-x-6' : 'translate-x-1'
				}`}
			/>
		</button>
	);

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
				<div className="flex justify-between items-center">
					<button
						onClick={() => navigate(ROUTES.DASHBOARD)}
						className="cursor-pointer flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
					>
						<ArrowLeft className="h-5 w-5" />
						<span className="font-medium">Back to Dashboard</span>
					</button>
					<div className="flex items-center space-x-3">
						{isEditing ? (
							<>
								<button
									onClick={() => setIsEditing(false)}
									className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									onClick={handleSave}
									className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
								>
									<Check className="h-4 w-4" />
									<span>Save Changes</span>
								</button>
							</>
						) : (
							<button
								onClick={() => setIsEditing(true)}
								className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
							>
								Edit Profile
							</button>
						)}
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<div className="max-w-4xl mx-auto px-6 py-8">
				<div className="space-y-8">
					{/* Profile Section */}
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<div className="flex items-start space-x-6">
							<div className="relative">
								<div className="h-20 w-20 bg-indigo-600 rounded-full flex items-center justify-center">
									<span className="text-2xl font-semibold text-white">
										{user?.displayName ? (
											<p>
												{user?.displayName.split(' ')[0][0]}
												{user?.displayName.split(' ')[1][0]}
											</p>
										) : (
											'U'
										)}
									</span>
								</div>
								{isEditing && (
									<button className="absolute -bottom-1 -right-1 h-7 w-7 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
										<Camera className="h-4 w-4 text-gray-600" />
									</button>
								)}
							</div>
							<div className="flex-1">
								<h1 className="text-2xl font-semibold text-gray-900 mb-1">
									{user?.displayName}
								</h1>
								<p className="text-gray-600 mb-3">{user?.email}</p>
								<div className="flex items-center space-x-2">
									<div className="h-2 w-2 rounded-full bg-green-500"></div>
									<span className="text-sm text-gray-600">Account Active</span>
								</div>
							</div>
						</div>
					</div>

					{/* Personal Information */}
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-6">
							Personal Information
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									First Name
								</label>
								<input
									type="text"
									value={accountData.firstName}
									onChange={(e) =>
										setAccountData({...accountData, firstName: e.target.value})
									}
									disabled={!isEditing}
									className={`w-full px-3 py-2 border rounded-lg transition-colors ${
										isEditing
											? 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
											: 'border-gray-200 bg-gray-50 text-gray-600'
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
									className={`w-full px-3 py-2 border rounded-lg transition-colors ${
										isEditing
											? 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
											: 'border-gray-200 bg-gray-50 text-gray-600'
									}`}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Email
								</label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
									<input
										type="email"
										value={user?.email ?? ''}
										disabled
										className="w-full pl-10 pr-3 py-2 border border-gray-200 bg-gray-50 text-gray-600 rounded-lg"
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Phone
								</label>
								<div className="relative">
									<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
									<input
										type="tel"
										value={accountData.phone}
										onChange={(e) =>
											setAccountData({...accountData, phone: e.target.value})
										}
										disabled={!isEditing}
										className={`w-full pl-10 pr-3 py-2 border rounded-lg transition-colors ${
											isEditing
												? 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
												: 'border-gray-200 bg-gray-50 text-gray-600'
										}`}
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Location
								</label>
								<input
									type="text"
									value={accountData.location}
									onChange={(e) =>
										setAccountData({...accountData, location: e.target.value})
									}
									disabled={!isEditing}
									className={`w-full px-3 py-2 border rounded-lg transition-colors ${
										isEditing
											? 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
											: 'border-gray-200 bg-gray-50 text-gray-600'
									}`}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Date of Birth
								</label>
								<div className="relative">
									<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
										className={`w-full pl-10 pr-3 py-2 border rounded-lg transition-colors ${
											isEditing
												? 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
												: 'border-gray-200 bg-gray-50 text-gray-600'
										}`}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Security Settings */}
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-6">
							Security
						</h2>
						<div className="space-y-4">
							<div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
								<div className="flex items-center space-x-3">
									<Lock className="h-5 w-5 text-gray-400" />
									<div>
										<h3 className="font-medium text-gray-900">Password</h3>
										<p className="text-sm text-gray-600">
											Last changed 30 days ago
										</p>
									</div>
								</div>
								<button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
									Change
								</button>
							</div>
						</div>
					</div>

					{/* Notifications */}
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-6">
							Notifications
						</h2>
						<div className="space-y-4">
							<div className="flex items-center justify-between py-2">
								<div>
									<h3 className="font-medium text-gray-900">
										Email Notifications
									</h3>
									<p className="text-sm text-gray-600">
										Receive updates via email
									</p>
								</div>
								<ToggleSwitch
									checked={accountData.notifications.email}
									onChange={() =>
										setAccountData({
											...accountData,
											notifications: {
												...accountData.notifications,
												email: !accountData.notifications.email,
											},
										})
									}
								/>
							</div>
							<div className="flex items-center justify-between py-2">
								<div>
									<h3 className="font-medium text-gray-900">
										Browser Notifications
									</h3>
									<p className="text-sm text-gray-600">
										Get notified in your browser
									</p>
								</div>
								<ToggleSwitch
									checked={accountData.notifications.browser}
									onChange={() =>
										setAccountData({
											...accountData,
											notifications: {
												...accountData.notifications,
												browser: !accountData.notifications.browser,
											},
										})
									}
								/>
							</div>
							<div className="flex items-center justify-between py-2">
								<div>
									<h3 className="font-medium text-gray-900">Security Alerts</h3>
									<p className="text-sm text-gray-600">
										Important security notifications
									</p>
								</div>
								<ToggleSwitch
									checked={accountData.notifications.security}
									onChange={() =>
										setAccountData({
											...accountData,
											notifications: {
												...accountData.notifications,
												security: !accountData.notifications.security,
											},
										})
									}
								/>
							</div>
						</div>
					</div>

					{/* Account Actions */}
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-6">
							Account Actions
						</h2>
						<div className="space-y-3">
							<button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
								<div className="flex items-center space-x-3">
									<Download className="h-5 w-5 text-gray-400" />
									<div>
										<h3 className="font-medium text-gray-900">
											Download Account Data
										</h3>
										<p className="text-sm text-gray-600">
											Export all your account information
										</p>
									</div>
								</div>
							</button>
							<button className="w-full flex items-center justify-between p-4 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-left">
								<div className="flex items-center space-x-3">
									<Trash2 className="h-5 w-5 text-red-600" />
									<div className="text-left">
										<h4 className="font-medium text-red-600">
											Delete All Profiles
										</h4>
										<p className="text-sm text-red-500">
											Permanently remove all saved profiles
										</p>
									</div>
								</div>
								<ArrowRight className="h-5 w-5 text-red-400" />
							</button>
							<button className="w-full flex items-center justify-between p-4 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-left">
								<div className="flex items-center space-x-3">
									<Trash2 className="h-5 w-5 text-red-500" />
									<div>
										<h3 className="font-medium text-red-600">Delete Account</h3>
										<p className="text-sm text-red-500">
											Permanently delete your account and all data
										</p>
									</div>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
