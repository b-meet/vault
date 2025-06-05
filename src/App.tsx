import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Provider } from 'react-redux';
import { Settings } from 'lucide-react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { SessionProvider } from './components/SessionManager';
import { ROUTES } from './constants';
import Dashboard from './page/Dashboard';
import Landing from './page/Landing';
import Auth from './page/Auth';
import Extention from './page/Extention';
import AddProfile from './page/AddProfile';
import Account from './page/Account';
import { withAuthGuard } from './components/AuthGuard';

// Loading component for PersistGate
const LoadingScreen = () => (
	<div className="min-h-screen bg-gray-50 flex items-center justify-center">
		<div className="text-center">
			<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
			<p className="text-gray-600">Loading...</p>
		</div>
	</div>
);

// Protected Dashboard component
const ProtectedDashboard = withAuthGuard(Dashboard);

// App component
function VaultApp() {
	return (
		<Provider store={store}>
			<PersistGate loading={<LoadingScreen />} persistor={persistor}>
					<BrowserRouter>
						<SessionProvider>
							<Routes>
								<Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
								<Route path={ROUTES.LANDING} element={<Landing />} />
								<Route path={ROUTES.AUTH} element={<Auth />} />
								<Route path={ROUTES.DASHBOARD} element={<ProtectedDashboard />} />
								<Route path={ROUTES.SETTINGS} element={<Settings />} />
								<Route path={ROUTES.EXTENTIONS} element={<Extention />} />
								<Route path={ROUTES.ADD_PROFILE} element={<AddProfile />} />
								<Route path={ROUTES.USER_PROFILE} element={<Account />} />
								<Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
							</Routes>
						</SessionProvider>
					</BrowserRouter>
			</PersistGate>
		</Provider>
	);
}

export default VaultApp;
