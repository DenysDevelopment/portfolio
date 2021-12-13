import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { useAppDispatch, useAppSelector } from './hooks/store';
import { About, Works, Login, Register } from './pages';
import { useNavigate, useLocation } from 'react-router-dom';
import { List } from './pages/List';
import { User } from './pages/User';
import { onAuthState } from './firebase/authUser';

function App() {
	const { authUser } = useAppSelector((store) => store.auth);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		if (!authUser) {
			if (pathname.includes('/list/user/')) return;
			else if (pathname.includes('/list/user/')) navigate('list');
			else if (pathname.includes('/list')) navigate('list');
			else {
				navigate('login');
			}
		}
		onAuthState(dispatch, navigate);
	}, []);

	return (
		<>
			{authUser ? <Header /> : ''}
			<Routes>
				<>
					<Route path='works/:name' element={<Works />} />
					<Route path='works' element={<Works />} />
					<Route path='about' element={<About />} />
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
					<Route path='list' element={<List />} />
					<Route path='list/user/:username' element={<User />} />
				</>
			</Routes>
		</>
	);
}

export default App;
