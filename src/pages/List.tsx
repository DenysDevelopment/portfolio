import React from 'react';

import '../styles/list.scss';

import { getData } from '../firebase/dataUser';
import { Link } from 'react-router-dom';

export const List = () => {
	const [listUsers, setListUsers] = React.useState<
		{
			name?: string;
			uid?: string;
			email?: string;
			link?: string;
			works?: object[];
		}[]
	>([]);

	React.useEffect(() => {
		getData().then((data) => {
			const tempDoc = data.docs.map((doc) => {
				return { ...doc.data() };
			});
			setListUsers(tempDoc);
		});
	}, []);

	return (
		<div className='container'>
			<ul className='list-users'>
				{listUsers &&
					listUsers.map((user, idx) => (
						<Link
							to={`user/${user.uid}`}
							className='list-users__item'
							key={`${user.uid}_${idx}`}>
							<ul className='list-users__info'>
								<li className='list-users__info-item'>
									<span>Имя</span>
									{user.name}
								</li>
								<li className='list-users__info-item'>
									<span>Всего проектов</span>
									{user.works?.length}
								</li>
							</ul>
						</Link>
					))}
			</ul>
		</div>
	);
};
