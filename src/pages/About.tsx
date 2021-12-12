import { useAppSelector } from '../hooks/store';

export const About = () => {
	const userData = useAppSelector((state) => state.userData);
	return (
		<div className='container'>
			<pre>name: {userData.name}</pre>
			<pre>почта: {userData.email}</pre>
			<pre>uid: {userData.uid}</pre>
		</div>
	);
};
