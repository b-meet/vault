import {useEffect, useState} from 'react';
import {Box, Globe} from 'lucide-react';
import {useLocation, useNavigate} from 'react-router';
import {ROUTES} from '../constants';

const Auth = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

	useEffect(() => {
		const state = location.state as {isSignIn?: boolean};
		if (state?.isSignIn !== undefined) {
			setAuthMode(state.isSignIn ? 'signin' : 'signup');
		}
	}, [location.state]);

	const handleAuth = () => {
		navigate(ROUTES.DASHBOARD);
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
			<div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
				<div className="text-center mb-8">
					<Box className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900">
						{authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
					</h2>
					<p className="text-gray-600 mt-2">
						{authMode === 'signin'
							? 'Sign in to your Vault'
							: 'Get started with Vault today'}
					</p>
				</div>

				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email
						</label>
						<input
							type="email"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="your@email.com"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Password
						</label>
						<input
							type="password"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="••••••••"
						/>
					</div>

					<button
						type="button"
						onClick={handleAuth}
						className="w-full py-3 main-gradient text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
					>
						{authMode === 'signin' ? 'Sign In' : 'Create Account'}
					</button>

					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">
								Or continue with
							</span>
						</div>
					</div>

					<button
						type="button"
						className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
					>
						<Globe className="h-5 w-5" />
						<span>Google</span>
					</button>
				</form>

				<p className="text-center text-sm text-gray-600 mt-6">
					{authMode === 'signin'
						? "Don't have an account? "
						: 'Already have an account? '}
					<button
						onClick={() =>
							setAuthMode(authMode === 'signin' ? 'signup' : 'signin')
						}
						className="text-indigo-600 hover:text-indigo-700 font-medium"
					>
						{authMode === 'signin' ? 'Sign up' : 'Sign in'}
					</button>
				</p>
			</div>
		</div>
	);
};

export default Auth;
