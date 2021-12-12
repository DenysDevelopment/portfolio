import '../../styles/cardWork.scss';

interface ItemPropsType {
	name: string;
	link: string;
	desk: string;
	urlImg: string;
}

export const Item = ({ name, link, desk, urlImg }: ItemPropsType) => {
	return (
		<li className='card-work__item'>
			<div className='card-work__images'>
				<img src={urlImg} alt='' />
			</div>
			<div className='card-work__body'>
				<h2 className='card-work__title'>{name}</h2>
				<p className='card-work__description'>{desk}</p>
				<a href={link} className='card-work__btn' title='Перейти на сайт'>
					Перейти на сайт
				</a>
			</div>
		</li>
	);
};
