import {
	getFirestore,
	collection,
	getDocs,
	setDoc,
	doc,
} from 'firebase/firestore';
import { app } from '.';

const db = getFirestore(app);

export const saveDataUser = async (
	name: string,
	email: string,
	uid: string,
) => {
	const users = await setDoc(doc(db, 'users', uid), {
		name,
		email,
		uid,
		works: [],
	});
	return users;
};

export const getData = async () => {
	const data = await getDocs(collection(db, 'users'));
	return data;
};
