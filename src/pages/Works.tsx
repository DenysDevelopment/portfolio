import { onSnapshot, doc, getFirestore } from 'firebase/firestore';
import React from 'react';
import { WorkItem } from '../components';
import { app } from '../firebase';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setUserData } from '../redux/actions/setUserData';

export const Works = () => {
	const dispatch = useAppDispatch();
	const { works, uid } = useAppSelector((state) => state.userData);

	const db = getFirestore(app);

	React.useEffect(() => {
		if (uid) {
			onSnapshot(doc(db, 'users', uid), (doc) => {
				dispatch(setUserData({ ...doc.data() }));
			});
		}
	}, []);

	return (
		<div className='container'>
			<WorkItem works={works} addProject />
		</div>
	);
};
