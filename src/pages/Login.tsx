import React from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebase/authUser';
import { useAppDispatch } from '../hooks/store';
import { setIsAuth } from '../redux/actions/isAuth';
import { setUserData } from '../redux/actions/setUserData';
import { useNavigate } from 'react-router';

import '../styles/auth.scss';

export const Login = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const onSubmitForm = () => {
		loginUser(email, password)
			.then(({ user }) => {
				console.log(user);

				dispatch(
					setUserData({
						name: user.displayName,
						email: user.email,
						uid: user.uid,
						works: [],
					}),
				);
				dispatch(setIsAuth());

				navigate('/works');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='auth'>
			<div className='auth__body'>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type='mail'
					name='mail'
					placeholder='Почта'
					required
				/>
				<input
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					name='password'
					placeholder='Пароль'
					required
				/>
				<button onClick={onSubmitForm}>Войти</button>
				<p className='login-and-register'>
					Нету аккаунта, <Link to='/register'>зарегистрироваться</Link>
				</p>
			</div>
		</div>
	);
};
