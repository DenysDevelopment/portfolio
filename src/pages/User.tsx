import React from 'react';
import { useParams } from 'react-router';
import { WorkItem } from '../components';
import { getData } from '../firebase/dataUser';

interface userDataType {
	name: string;
	uid: string;
	works: [];
}

export const User = () => {
	const { username } = useParams();
	const [userData, setUserData] = React.useState<any>({});
	const [userFound, setUserFound] = React.useState<string>('');

	React.useEffect(() => {
		getData().then((data) => {
			data.forEach((user) => {
				console.log(1);
				if (user.data().uid === username) {
					setUserData(user.data());
				}
			});
		});
	}, []);

	const randomGif = () => {
		const arrGif = [
			'https://i.gifer.com/SaMP.gif',
			'https://i.gifer.com/TO55.gif',
			'https://i.gifer.com/g0bL.gif',
			'https://i.gifer.com/7fot.gif',
			'https://i.gifer.com/76hR.gif',
		];
		const randomNumber = Math.floor(Math.random() * (arrGif.length - 0) + 0);
		return arrGif[randomNumber];
	};

	return (
		<div className='container'>
			{Object.keys(userData).length === 0 ? (
				<>
					<p style={{ textAlign: 'center', fontSize: 50 }}>
						Пользователь не найден
					</p>
					<img
						style={{
							width: '50%',
							textAlign: 'center',
							margin: `0 auto`,
							display: 'block',
						}}
						src={randomGif()}
						alt=''
					/>
				</>
			) : (
				<>
					<h1 style={{ textAlign: 'center' }}>{userData.name}</h1>
					<p style={{ textAlign: 'center' }}>
						Количество проектов {userData?.works?.length}
					</p>
					<WorkItem {...userData} />
				</>
			)}
		</div>
	);
};
