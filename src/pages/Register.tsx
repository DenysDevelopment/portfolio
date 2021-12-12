import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { createUser } from '../firebase/authUser';
import '../styles/auth.scss';

import { useAppDispatch } from '../hooks/store';
import { setIsAuth } from '../redux/actions/isAuth';

export const Register = () => {
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const onSubmitForm = (e: any) => {
		e.preventDefault();
		createUser(name, email, password, dispatch);
		navigate('/works');

		dispatch(setIsAuth());
	};

	return (
		<div className='auth'>
			<div className='auth__body'>
				<input
					onChange={(e) => setName(e.target.value)}
					type='text'
					name='name'
					placeholder='Имя'
					required
				/>
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
				<button onClick={onSubmitForm}>Submit</button>
				<p className='login-and-register'>
					Есть аккаунт, <Link to='/login'>Войти</Link>
				</p>
			</div>
		</div>
	);
};
