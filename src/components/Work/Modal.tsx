import { getFirestore, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import React from 'react';
import { writeFile } from '../../firebase/storage';
import { useAppSelector } from '../../hooks/store';
import '../../styles/modal.scss';

export const Modal = ({ closeModalShow }: any) => {
	const [name, setName] = React.useState('');
	const [desk, setDesk] = React.useState('');
	const [link, setLink] = React.useState('');
	const [fileImg, setFileImg] = React.useState<any>();
	const [progress, setProgress] = React.useState(0);
	const [urlImg, setUrlImg] = React.useState('');

	const { uid } = useAppSelector((state) => state.userData);

	const addProject = () => {
		writeFile(fileImg[0], setProgress, setUrlImg);
	};

	React.useEffect(() => {
		const db = getFirestore();
		if (urlImg !== '' && progress === 100) {
			updateDoc(doc(db, 'users', uid), {
				works: arrayUnion({ name, desk, link, urlImg }),
			});
			closeModalShow();
		}
	}, [urlImg]);

	return (
		<div className='modal'>
			<div className='modal__overlay' onClick={closeModalShow}></div>
			<div className='modal__body'>
				<div
					style={{
						height: '20px',
						width: `${progress}%`,
						alignSelf: `self-start`,
						backgroundColor: 'red',
						transition: `all .5s`,
					}}></div>
				<div className='modal__close' onClick={closeModalShow}>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M24 10H14V0H10V10H0V14H10V24H14V14H24V10Z' />
					</svg>
				</div>
				<input
					type='text'
					placeholder='Назва проекта'
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Ссылка на сайт'
					onChange={(e) => setLink(e.target.value)}
				/>
				<input
					type='file'
					placeholder='Ссылка на картинку или gif'
					onChange={(e) => setFileImg(e?.target?.files)}
				/>
				<textarea
					placeholder='Описание'
					onChange={(e) => setDesk(e.target.value)}></textarea>
				<button onClick={addProject}>Добавить</button>
			</div>
		</div>
	);
};
