import {useEffect, useState} from 'react';
import {Globe} from 'lucide-react';
import {useLocation, useNavigate} from 'react-router';
import {ROUTES} from '../constants';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {clearError} from '../redux/slice/userSlice';
import {
	loginWithEmail,
	loginWithGoogle,
	signupWithEmail,
} from '../redux/thunk/userThunk';
import {Logo} from '../components/global/Logo';

const Auth = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {loading, error, isAuthenticated} = useAppSelector(
		(state) => state.user
	);

	const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');

	useEffect(() => {
		const state = location.state as {isSignIn?: boolean};
		if (state?.isSignIn !== undefined) {
			setAuthMode(state.isSignIn ? 'signin' : 'signup');
		}
	}, [location.state]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate(ROUTES.DASHBOARD);
		}
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		dispatch(clearError());
	}, [authMode, dispatch]);

	const handleEmailAuth = async (e: React.FormEvent) => {
		e.preventDefault();

		if (authMode === 'signin') {
			dispatch(loginWithEmail({email, password}));
		} else {
			dispatch(
				signupWithEmail({
					email,
					password,
					...(displayName && {displayName}),
				})
			);
		}
	};

	const handleGoogleAuth = async () => {
		dispatch(loginWithGoogle());
	};

	const handleModeSwitch = () => {
		setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
		setEmail('');
		setPassword('');
		setDisplayName('');
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
			<div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
				<div className="flex flex-col justify-center items-center gap-4 w-full mb-8">
					<Logo />
					<div className="text-center">
						<h2 className="text-2xl font-bold text-gray-900">
							{authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
						</h2>
						<p className="text-gray-600 mt-2">
							{authMode === 'signin'
								? 'Sign in to your Vault'
								: 'Get started with Vault today'}
						</p>
					</div>
				</div>

				{error && (
					<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
						{error}
					</div>
				)}

				<form onSubmit={handleEmailAuth} className="space-y-4">
					{authMode === 'signup' && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Display Name (Optional)
							</label>
							<input
								type="text"
								value={displayName}
								onChange={(e) => setDisplayName(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
								placeholder="Your Name"
							/>
						</div>
					)}

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="your@email.com"
							required
							disabled={loading}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="••••••••"
							required
							disabled={loading}
							minLength={6}
						/>
					</div>

					<button
						type="submit"
						disabled={loading || !email || !password}
						className="w-full py-3 main-gradient text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading
							? 'Loading...'
							: authMode === 'signin'
								? 'Sign In'
								: 'Create Account'}
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
						onClick={handleGoogleAuth}
						disabled={loading}
						className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<Globe className="h-5 w-5" />
						<span>{loading ? 'Loading...' : 'Google'}</span>
					</button>
				</form>

				<p className="text-center text-sm text-gray-600 mt-6">
					{authMode === 'signin'
						? "Don't have an account? "
						: 'Already have an account? '}
					<button
						onClick={handleModeSwitch}
						className="text-indigo-600 hover:text-indigo-700 font-medium"
						disabled={loading}
					>
						{authMode === 'signin' ? 'Sign up' : 'Sign in'}
					</button>
				</p>
			</div>
		</div>
	);
};

export default Auth;
