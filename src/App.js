import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes';
import { useDispatch } from 'react-redux';
import { setUserToken, setCurrentUser } from './redux/slices';

function App() {
	const dispatch = useDispatch();
	React.useEffect(() => {
		const user = localStorage.getItem('user');
		const token = localStorage.getItem('crud_token');
		if (user && token) {
			dispatch(setUserToken(token));
			dispatch(setCurrentUser(JSON.parse(user)));
		}
	}, [dispatch]);
	return <RouterProvider router={appRoutes} />;
}

export default App;
