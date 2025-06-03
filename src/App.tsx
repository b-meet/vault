import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';
import Landing from './page/Landing';
import Auth from './page/Auth';
import {ROUTES} from './constants';
import Dashboard from './page/Dashboard';
import Settings from './page/Settings';
import Extention from './page/Extention';
import AddProfile from './page/AddProfile';
import Account from './page/Account';
import {Provider} from 'react-redux';
import {store} from './redux/store';
// import AutofillSuggestion from './components/AutoFillPreview';

const VaultApp: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path={ROUTES.LANDING} element={<Landing />} />
					<Route path={ROUTES.AUTH} element={<Auth />} />
					<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
					<Route path={ROUTES.SETTINGS} element={<Settings />} />
					<Route path={ROUTES.EXTENTIONS} element={<Extention />} />
					<Route path={ROUTES.ADD_PROFILE} element={<AddProfile />} />
					<Route path={ROUTES.USER_PROFILE} element={<Account />} />
				</Routes>
			</BrowserRouter>

			{/* <AutofillSuggestion /> */}
		</Provider>
	);
};

export default VaultApp;
