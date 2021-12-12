import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { useAppSelector } from './hooks/store';
import { About, Works, Login, Register } from './pages';
import { getData } from './firebase/dataUser';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	addDoc,
	collection,
	getFirestore,
	setDoc,
	doc,
	updateDoc,
	arrayUnion,
} from 'firebase/firestore';
import { List } from './pages/List';
import { User } from './pages/User';

function App() {
	const { authUser } = useAppSelector((store) => store.auth);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	React.useEffect(() => {
		getData();
		console.log(pathname);

		if (!authUser) {
			if (pathname.includes('/list/user/')) return;
			else if (pathname.includes('/list/user/')) navigate('list');
			else if (pathname.includes('/list')) navigate('list');
			else {
				navigate('login');
			}
		}
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
