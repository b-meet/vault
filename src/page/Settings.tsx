import {ArrowRight, Download, Trash2, Upload, X} from 'lucide-react';
import {useNavigate} from 'react-router';
import {ROUTES} from '../constants';

const Settings = () => {
	const navigate = useNavigate();

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
				</div>
			</nav>

			<div className="max-w-2xl mx-auto px-6 py-8">
				<div className="bg-white rounded-xl shadow-sm p-8">
					<h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

					<div className="space-y-8">
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Sync Options
							</h3>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-medium text-gray-900">Cloud Sync</h4>
										<p className="text-sm text-gray-600">
											Sync your profiles across devices
										</p>
									</div>
									<button className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
										<span className="sr-only">Enable cloud sync</span>
										<span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
									</button>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-medium text-gray-900">
											Local Storage Only
										</h4>
										<p className="text-sm text-gray-600">
											Keep data on this device only
										</p>
									</div>
									<button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
										<span className="sr-only">Enable local storage</span>
										<span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
									</button>
								</div>
							</div>
						</div>

						{/* Data Management */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Data Management
							</h3>
							<div className="space-y-4">
								<button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
									<div className="flex items-center space-x-3">
										<Download className="h-5 w-5 text-gray-600" />
										<div className="text-left">
											<h4 className="font-medium text-gray-900">Export Data</h4>
											<p className="text-sm text-gray-600">
												Download your profiles as JSON
											</p>
										</div>
									</div>
									<ArrowRight className="h-5 w-5 text-gray-400" />
								</button>

								<button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
									<div className="flex items-center space-x-3">
										<Upload className="h-5 w-5 text-gray-600" />
										<div className="text-left">
											<h4 className="font-medium text-gray-900">Import Data</h4>
											<p className="text-sm text-gray-600">
												Upload profiles from file
											</p>
										</div>
									</div>
									<ArrowRight className="h-5 w-5 text-gray-400" />
								</button>
							</div>
						</div>

						{/* Danger Zone */}
						<div>
							<h3 className="text-lg font-semibold text-red-600 mb-4">
								Danger Zone
							</h3>
							<div className="space-y-4">
								<button className="w-full flex items-center justify-between p-4 border border-red-300 rounded-lg hover:bg-red-50">
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

								<button className="w-full flex items-center justify-between p-4 border border-red-300 rounded-lg hover:bg-red-50">
									<div className="flex items-center space-x-3">
										<X className="h-5 w-5 text-red-600" />
										<div className="text-left">
											<h4 className="font-medium text-red-600">
												Delete Account
											</h4>
											<p className="text-sm text-red-500">
												Permanently delete your Vault account
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

export default Settings;
