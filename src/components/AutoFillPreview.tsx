import {Box, Check, X} from 'lucide-react';

const AutofillSuggestion = () => (
	<div className="fixed bottom-4 right-4 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
		<div className="px-4 py-3 border-b border-gray-200">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Box className="h-5 w-5 text-indigo-600" />
					<span className="font-medium text-gray-900">Vault Autofill</span>
				</div>
				<button className="text-gray-400 hover:text-gray-600">
					<X className="h-4 w-4" />
				</button>
			</div>
		</div>

		<div className="px-4 py-4">
			<p className="text-sm text-gray-600 mb-3">
				Fill form with your saved profile:
			</p>

			<div className="space-y-2 mb-4">
				<div className="flex items-center justify-between text-sm">
					<span className="text-gray-600">Name:</span>
					<span className="font-medium">John Doe</span>
				</div>
				<div className="flex items-center justify-between text-sm">
					<span className="text-gray-600">Email:</span>
					<span className="font-medium">john.doe@email.com</span>
				</div>
				<div className="flex items-center justify-between text-sm">
					<span className="text-gray-600">Phone:</span>
					<span className="font-medium">+1 (555) 123-4567</span>
				</div>
			</div>

			<div className="flex space-x-2">
				<button className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-1">
					<Check className="h-4 w-4" />
					<span>Fill Form</span>
				</button>
				<button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
					<X className="h-4 w-4" />
				</button>
			</div>
		</div>
	</div>
);

export default AutofillSuggestion;
