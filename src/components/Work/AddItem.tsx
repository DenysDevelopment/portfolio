import React from 'react';
import '../../styles/cardWork.scss';
import { Modal } from './Modal';

export const AddItem = () => {
	const [showModal, setShowModal] = React.useState(false);

	const openModalShow = () => {
		setShowModal(true);
	};
	const closeModalShow = () => {
		setShowModal(false);
		console.log(1);
	};

	return (
		<>
			<li className='card-work__add' onClick={openModalShow}>
				<div>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M24 10H14V0H10V10H0V14H10V24H14V14H24V10Z' fill='black' />
					</svg>
				</div>
			</li>
			{showModal ? <Modal closeModalShow={closeModalShow} /> : ''}
		</>
	);
};
