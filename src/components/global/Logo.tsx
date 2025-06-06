import {Box} from 'lucide-react';

export const FullLogo = () => {
	return (
		<div className="flex items-center space-x-3">
			<div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
				<Box className="h-6 w-6 text-white" />
			</div>
			<span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
				Vault
			</span>
		</div>
	);
};

export const Logo = () => {
	return (
		<div className="p-2 max-w-max bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
			<Box className="h-6 w-6 text-white" />
		</div>
	);
};
