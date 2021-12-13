import { app } from './index';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
} from 'firebase/auth';
import { saveDataUser } from './dataUser';
import { setUserData } from '../redux/actions/setUserData';
import { setIsAuth } from '../redux/actions/isAuth';

const auth = getAuth(app);

export const createUser = (
	name: string,
	email: string,
	password: string,
	dispatch?: any,
) =>
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log(user);

			updateProfile(user, {
				displayName: name,
				photoURL: null,
			});
			dispatch(
				setUserData({
					name: name,
					email: user.email,
					uid: user.uid,
				}),
			);
			saveDataUser(name, email, user.uid);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});

export const onAuthState = (dispatch: any, navigate: any) => {
	return onAuthStateChanged(auth, (user: any) => {
		if (user) {
			dispatch(
				setUserData({
					name: user.displayName,
					email: user.email,
					uid: user.uid,
				}),
			);
			dispatch(setIsAuth());
			navigate('/works');
		}
	});
};

export const loginUser = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};
