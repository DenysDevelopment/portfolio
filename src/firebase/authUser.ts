import { app } from './index';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	browserSessionPersistence,
	setPersistence,
	inMemoryPersistence,
	GoogleAuthProvider,
	signInWithRedirect,
	onAuthStateChanged,
} from 'firebase/auth';
import { saveDataUser } from './dataUser';
import { setUserData } from '../redux/actions/setUserData';

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

export const loginUser = (email: string, password: string) => {
	onAuthStateChanged(auth, (user) => {
		console.log(user);
	});

	return signInWithEmailAndPassword(auth, email, password);
};
