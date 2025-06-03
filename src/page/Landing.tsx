import {Chrome, Lock, Shield, User} from 'lucide-react';
import Navbar from '../components/global/Navbar';
import {useNavigate} from 'react-router';
import {ROUTES} from '../constants';

const Landing = () => {
	const navigate = useNavigate();
	const handleNavigateToAuth = () => {
		navigate(ROUTES.AUTH, {state: {isSignIn: false}});
	};

	return (
		<section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<Navbar />
			<div className="max-w-6xl mx-auto px-6 pt-8 text-center flex flex-col items-center gap-3">
				<h1 className="text-7xl font-bold text-gray-900 mb-6 flex flex-col gap-3 font-[Caveat_Brush]">
					Your Personal{' '}
					<span className="text-indigo-600">Autofill Assistant</span>
				</h1>
				<p className="leading-8 text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-[Delius]">
					Store and manage your personal information securely. Autofill web
					forms instantly with your saved profiles. No more typing the same
					details over and over again. Save time on every signup, checkout, and
					registration. Your data stays private, encrypted, and always under
					your control. Simple, fast, and hassle-free.
				</p>
				<button
					onClick={handleNavigateToAuth}
					className="font-[Delius] text-xl gap-2 cursor-pointer main-gradient group/btn rounded-full flex items-center text-white py-2 px-5"
				>
					Start Filling
					<div className="flex items-center opacity-50 group-hover/btn:opacity-100 transition-opacity ">
						<svg
							viewBox="0 0 16 16"
							width="0"
							height="10"
							fill="currentColor"
							className="w-0 group-hover/btn:w-2.5 h-3 translate-x-2.5 ease-out duration-200 transition-all transform-gpu"
						>
							<path d="M1 9h14a1 1 0 000-2H1a1 1 0 000 2z"></path>
						</svg>
						<svg
							viewBox="0 0 16 16"
							width="10"
							height="10"
							fill="currentColor"
							className="size-[0.7em]"
						>
							<path d="M7.293 1.707L13.586 8l-6.293 6.293a1 1 0 001.414 1.414l7-7a.999.999 0 000-1.414l-7-7a1 1 0 00-1.414 1.414z"></path>
						</svg>
					</div>
				</button>
				<div className="font-[Delius] max-w-6xl mx-auto px-2 py-12 flex gap-5 flex-wrap justify-center">
					<div className="bg-white w-md flex items-start rounded-xl p-4 shadow-lg">
						<span className="bg-gradient-to-br from-indigo-600/60 to-purple-600 p-2 rounded-xl shadow-lg">
							<Shield className="h-6 w-6 text-white" />
						</span>
						<div className="flex flex-col items-start text-left pl-4">
							<h3 className="text-2xl font-light text-gray-900 mb-2 pb-4">
								Secure Storage
							</h3>
							<p className="text-gray-600 text-lg">
								Your contact details are{' '}
								<strong className="text-black">
									encrypted and securely stored
								</strong>{' '}
								in a private vault.
							</p>
						</div>
					</div>
					<div className="bg-white w-md flex items-start rounded-xl p-4 shadow-lg">
						<span className="bg-gradient-to-br from-indigo-600/60 to-purple-600 p-2 rounded-xl shadow-lg">
							<Chrome className="h-6 w-6 text-white" />
						</span>
						<div className="flex flex-col items-start text-left pl-4">
							<h3 className="text-2xl font-light text-gray-900 mb-2 pb-4">
								Browser Extension
							</h3>
							<p className="text-gray-600 text-lg">
								Autofill forms instantly across the web with our{' '}
								<strong className="text-black">lightweight</strong> extension.
							</p>
						</div>
					</div>
					<div className="bg-white w-md flex items-start rounded-xl p-4 shadow-lg">
						<span className="bg-gradient-to-br from-indigo-600/60 to-purple-600 p-2 rounded-xl shadow-lg">
							<User className="h-6 w-6 text-white" />
						</span>
						<div className="flex flex-col items-start text-left pl-4">
							<h3 className="text-2xl font-light text-gray-900 mb-2 pb-4">
								Multiple Profiles
							</h3>
							<p className="text-gray-600 text-lg">
								Create <strong className="text-black">separate profiles</strong>{' '}
								for work, personal use, or anything in between.
							</p>
						</div>
					</div>
					<div className="bg-white w-md flex items-start rounded-xl p-4 shadow-lg">
						<span className="bg-gradient-to-br from-indigo-600/60 to-purple-600 p-2 rounded-xl shadow-lg">
							<Lock className="h-6 w-6 text-white" />
						</span>
						<div className="flex flex-col items-start text-left pl-4">
							<h3 className="text-2xl font-light text-gray-900 mb-2 pb-4">
								Full Control
							</h3>
							<p className="text-gray-600 text-lg">
								<strong className="text-black">Manage, edit, or remove</strong>{' '}
								your saved data anytime—right from your vault.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
