import {useEffect} from 'react';
import {Box, Chrome, Plus, Settings, User} from 'lucide-react';
import {useNavigate} from 'react-router';
import {ROUTES} from '../constants';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import ProfileCard from '../components/dashboard/ProfileCard';
import {fetchProfiles} from '../redux/slice/profileSlice';

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {profiles, loading, error} = useAppSelector((state) => state.profile);

	useEffect(() => {
		dispatch(fetchProfiles());
	}, [dispatch]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex justify-center items-center">
				Loading profiles...
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex justify-center items-center text-red-600">
				Error: {error}
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white shadow-sm px-6 py-4 sticky top-0 z-50">
				<div className="flex justify-between items-center">
					<div className="flex items-center space-x-2">
						<Box className="h-8 w-8 text-indigo-600" />
						<span className="text-2xl font-bold text-gray-900">Vault</span>
					</div>
					<div className="flex items-center space-x-4">
						<button
							onClick={() => navigate(ROUTES.EXTENTIONS)}
							className="cursor-pointer p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
						>
							<Chrome className="h-5 w-5" />
						</button>
						<button
							onClick={() => navigate(ROUTES.SETTINGS)}
							className="cursor-pointer p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
						>
							<Settings className="h-5 w-5" />
						</button>
						<div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
							<button
								onClick={() => navigate(ROUTES.USER_PROFILE)}
								className="cursor-pointer p-2"
							>
								<User className="h-4 w-4 text-white" />
							</button>
						</div>
					</div>
				</div>
			</nav>

			<div className="max-w-4xl mx-auto px-6 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
					<p className="text-gray-600">
						You have {profiles.length} profile{profiles.length !== 1 ? 's' : ''}{' '}
						saved
					</p>
				</div>

				<div className="grid gap-6">
					<button
						onClick={() => navigate(ROUTES.ADD_PROFILE)}
						className="bg-white p-6 rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-indigo-400 cursor-pointer transition-colors"
					>
						<div className="flex items-center justify-center space-x-3 text-gray-600">
							<Plus className="h-6 w-6" />
							<span className="font-medium">Add New Profile</span>
						</div>
					</button>

					{profiles.map((profile) => (
						<ProfileCard key={profile.id} data={profile} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
