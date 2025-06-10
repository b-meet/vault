import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {LogOut, User, Chrome, Box, Plus, ChevronDown} from 'lucide-react';
import {ROUTES} from '../constants';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {logout} from '../redux/thunk/userThunk';
import {fetchProfilesByUserId} from '../redux/slice/profileSlice';
import ProfileCard from '../components/dashboard/ProfileCard';
import {FullLogo} from '../components/global/Logo';

const Dashboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {profiles, loading, error} = useAppSelector((state) => state.profile);
	const {user} = useAppSelector((state) => state.user);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	useEffect(() => {
		if (user?.uid) {
			dispatch(fetchProfilesByUserId(user.uid));
		}
	}, [dispatch, user?.uid]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (!target.closest('.dropdown-container')) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center">
				<div className="flex flex-col items-center space-y-4">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
					<p className="text-gray-600 font-medium">Loading profiles...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-center">
				<div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100">
					<div className="text-red-600 font-semibold text-lg mb-2">
						Error Loading Dashboard
					</div>
					<p className="text-gray-600">{error}</p>
				</div>
			</div>
		);
	}

	const handleLogout = async () => {
		try {
			await dispatch(logout()).unwrap();
			navigate(ROUTES.AUTH);
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	const menuItems = [
		{
			icon: User,
			label: 'Profile',
			action: () => navigate(ROUTES.USER_PROFILE),
		},
		{
			icon: LogOut,
			label: 'Logout',
			action: handleLogout,
			danger: true,
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
			<nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
				<div className="flex justify-between items-center">
					<FullLogo />
					<div className="flex items-center space-x-4">
						<button
							onClick={() => navigate(ROUTES.EXTENTIONS)}
							className="relative p-2 bg-slate-100 cursor-pointer text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
						>
							<Chrome className="h-5 w-5" />
						</button>
						{/* User Dropdown */}
						<div className="relative dropdown-container">
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
							>
								<div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
									{user?.photoURL ? (
										<img
											src={user?.photoURL}
											alt="user profile"
											className="rounded-full outline-2 outline-indigo-600"
										/>
									) : (
										<User className="h-4 w-4 text-white" />
									)}
								</div>
								<div className="hidden md:block text-left">
									<div className="text-sm font-semibold text-gray-900">
										{user?.displayName ?? 'User'}
									</div>
									<div className="text-xs text-gray-500">{user?.email}</div>
								</div>
								<ChevronDown
									className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
								/>
							</button>

							{/* Dropdown Menu */}
							{isDropdownOpen && (
								<div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
									<div className="px-4 py-3 border-b border-gray-100 mb-2">
										<div className="text-sm font-semibold text-gray-900">
											{user?.displayName ?? user?.email}
										</div>
										<div className="text-xs text-gray-500">{user?.email}</div>
									</div>

									{menuItems.map((item, index) => {
										const Icon = item.icon;
										return (
											<button
												key={item.label + index}
												onClick={() => {
													item.action();
													setIsDropdownOpen(false);
												}}
												className={`cursor-pointer w-[95%] m-auto rounded-xl flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'}`}
											>
												<Icon className="h-4 w-4" />
												<span className="text-sm font-medium">
													{item.label}
												</span>
											</button>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>

			{/* Enhanced Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto px-6 py-8">
					{/* Header Section */}
					<div className="mb-8">
						<h1 className="text-4xl font-bold text-gray-900 mb-3">Dashboard</h1>
						<div className="flex items-center space-x-4 text-gray-600">
							<span className="flex items-center space-x-2">
								<div className="h-2 w-2 bg-green-500 rounded-full"></div>
								<span>
									{profiles.length} profile{profiles.length !== 1 ? 's' : ''}{' '}
									saved
								</span>
							</span>
							<span>•</span>
							<span>Last updated: Just now</span>
						</div>
					</div>

					{/* Welcome Card */}
					<div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 mb-8 text-white">
						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-2xl font-bold mb-3">
									Welcome back,{' '}
									{user?.displayName ?? user?.email?.split('@')[0]}! 👋
								</h2>
								<p className="text-indigo-100 leading-relaxed max-w-2xl">
									Welcome to Vault — your personal autofill assistant is ready.
									Manage and use your saved profiles anytime.
								</p>
							</div>
							<div className="hidden lg:block">
								<div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
									<Box className="h-12 w-12 text-white" />
								</div>
							</div>
						</div>
					</div>

					{/* Profiles Section */}
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-semibold text-gray-900">
								Your Profiles
							</h3>
							<button
								onClick={() => navigate(ROUTES.ADD_PROFILE)}
								className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
							>
								<Plus className="h-4 w-4" />
								<span>Add Profile</span>
							</button>
						</div>

						<div className="grid gap-6">
							{profiles.map((profile) => (
								<div
									key={profile.id}
									className="transform hover:scale-[1.02] transition-transform"
								>
									<ProfileCard data={profile} />
								</div>
							))}

							{profiles.length === 0 && (
								<div className="text-center py-12">
									<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
										<User className="h-8 w-8 text-gray-400" />
									</div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										No profiles yet
									</h3>
									<p className="text-gray-600 mb-6">
										Get started by creating your first profile
									</p>
									<button
										onClick={() => navigate(ROUTES.ADD_PROFILE)}
										className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
									>
										<Plus className="h-5 w-5" />
										<span>Create Your First Profile</span>
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
