import {Box, LinkIcon, MapPin, User} from 'lucide-react';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {ROUTES} from '../constants';
import {useAppSelector} from '../hooks/redux';

const ExtensionPopup = () => {
	const navigate = useNavigate();
	const [extensionEnabled, setExtensionEnabled] = useState(true);
	const profiles = useAppSelector((state) => state.profile);
	return (
		<div className="w-80 bg-white rounded-lg shadow-xl border border-gray-200">
			{/* Header */}
			<div className="px-4 py-3 border-b border-gray-200">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Box className="h-6 w-6 text-indigo-600" />
						<span className="font-bold text-gray-900">Vault</span>
					</div>
					<button
						onClick={() => navigate(ROUTES.DASHBOARD)}
						className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
					>
						Open App
					</button>
				</div>
			</div>

			<div className="px-4 py-4">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h3 className="font-medium text-gray-900">Autofill Enabled</h3>
						<p className="text-sm text-gray-600">
							Toggle Vault autofill on/off
						</p>
					</div>
					<button
						onClick={() => setExtensionEnabled(!extensionEnabled)}
						className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
							extensionEnabled ? 'bg-indigo-600' : 'bg-gray-200'
						}`}
					>
						<span className="sr-only">Enable autofill</span>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
								extensionEnabled ? 'translate-x-6' : 'translate-x-1'
							}`}
						/>
					</button>
				</div>

				{extensionEnabled && (
					<>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Active Profile
							</label>
							<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
								{profiles.map((profile) => (
									<option key={profile.id} value={profile.id}>
										{profile.name} ({profile.basicInfo.firstName}{' '}
										{profile.basicInfo.lastName})
									</option>
								))}
							</select>
						</div>

						{/* Quick Actions */}
						<div className="space-y-2">
							<button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center space-x-2">
								<User className="h-4 w-4" />
								<span>Fill Contact Info</span>
							</button>
							<button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center space-x-2">
								<MapPin className="h-4 w-4" />
								<span>Fill Address</span>
							</button>
							<button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center space-x-2">
								<LinkIcon className="h-4 w-4" />
								<span>Fill Social Links</span>
							</button>
						</div>
					</>
				)}
			</div>

			<div className="px-4 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
				<div className="flex items-center space-x-2 text-sm">
					<div
						className={`h-2 w-2 rounded-full ${extensionEnabled ? 'bg-green-500' : 'bg-gray-400'}`}
					/>
					<span className="text-gray-600">
						{extensionEnabled ? 'Ready to autofill' : 'Autofill disabled'}
					</span>
				</div>
			</div>
		</div>
	);
};

const Extention = () => {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="space-y-8">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Browser Extension Preview
					</h2>
					<p className="text-gray-600">
						This is how the extension would appear in your browser
					</p>
				</div>

				<div className="flex justify-center space-x-8">
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
							Extension Popup
						</h3>
						<ExtensionPopup />
					</div>
				</div>

				<div className="text-center">
					<button
						onClick={() => navigate(ROUTES.DASHBOARD)}
						className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
					>
						Back to Dashboard
					</button>
				</div>
			</div>
		</div>
	);
};

export default Extention;
