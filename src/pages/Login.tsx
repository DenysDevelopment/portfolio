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

	const [errorEmail, setErrorEmail] = React.useState(false);
	const [errorPassword, setErrorPassword] = React.useState(false);
	const [userNotFound, setUserNotFound] = React.useState(false);

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const onSubmitForm = () => {
		setErrorEmail(false);
		setErrorPassword(false);
		setUserNotFound(false);
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
				console.dir(err);
				switch (err.code) {
					case 'auth/invalid-email':
						setErrorEmail(true);
						break;
					case 'auth/invalid-password':
						setErrorPassword(true);
						break;
					case 'auth/wrong-password':
						setErrorPassword(true);
						break;
					case 'auth/user-not-found':
						setUserNotFound(true);
						break;
					case 'auth/too-many-requests':
						alert('Попробуйте  позже');
						break;
				}
			});
	};

	return (
		<div className='auth'>
			<div className='auth__body'>
				<span className='auth__error'>
					{userNotFound ? 'Пользователь не найден' : ''}
				</span>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type='mail'
					name='mail'
					placeholder='Почта'
					required
					style={{
						border: errorEmail ? '2px solid red' : '2px solid transparent',
					}}
				/>
				<span className='auth__error'>
					{errorEmail ? 'Не верно указана почта' : ''}
				</span>
				<input
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					name='password'
					placeholder='Пароль'
					required
					style={{
						border: errorPassword ? '2px solid red' : '2px solid transparent',
					}}
				/>
				<span className='auth__error'>
					{errorPassword ? 'Не верный пароль' : ''}
				</span>
				<button onClick={onSubmitForm}>Войти</button>
				<p className='login-and-register'>
					Нету аккаунта, <Link to='/register'>зарегистрироваться</Link>
				</p>
			</div>
		</div>
	);
};
