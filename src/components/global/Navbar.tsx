import {Box} from 'lucide-react';
import {useNavigate} from 'react-router';
import {ROUTES} from '../../constants';

const Navbar = () => {
	const navigate = useNavigate();

	const handleNavigateToAuth = (isSignIn: boolean) => {
		navigate(ROUTES.AUTH, {state: {isSignIn}});
	};

	return (
		<header className="px-6 py-4 flex justify-between items-center">
			<div className="flex items-center space-x-2">
				<Box className="h-8 w-8 text-indigo-600" />
				<span className="text-2xl font-bold text-gray-900">Vault</span>
			</div>
			<div className="font-[Delius] font-semibold flex items-center gap-1 rounded-full bg-white/75 bg-gradient-to-r from-pink-200/40 via-violet-200/40 to-indigo-200/40 border border-white/50 p-1 text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-800/[.075] backdrop-blur-lg">
				<button
					className="cursor-pointer flex-none group relative inline-flex items-center bg-clip-padding rounded-l-[20px] rounded-r-[8px] border h-8 pl-3 pr-[10px] bg-white/40 border-white/90 shadow hover:text-violet-600 hover:bg-violet-50/40 transition-colors duration-300"
					onClick={() => handleNavigateToAuth(true)}
				>
					Sign In{' '}
					<span className="overflow-hidden absolute inset-0 transition origin-bottom duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100" />
					<span className="absolute inset-x-4 -bottom-2 h-full bg-gradient-to-t from-violet-500/20 to-transparent blur rounded-t-full" />
				</button>
				<button
					onClick={() => handleNavigateToAuth(false)}
					className="cursor-pointer text-white bg-gradient-to-br from-indigo-600 to-purple-500 group/btn group h-8 pr-3 pl-[10px] rounded-r-[20px] rounded-l-[8px] shadow relative"
				>
					Get Started
				</button>
			</div>
		</header>
	);
};

export default Navbar;
