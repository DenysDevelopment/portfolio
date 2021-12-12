import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useAppSelector } from '../hooks/store';

import '../styles/header.scss';

export const Header = () => {
	const router = useLocation();
	const { name } = useAppSelector((state) => state.userData);

	const [offsetSlider, setOffsetSlider] = React.useState(0);
	const [widthSlider, setWidthSlider] = React.useState(0);

	type routesTypes = {
		name: string;
		to: string;
		onClick: any;
		className: string;
	};

	const handleMenuActive = (e: React.ChangeEvent<HTMLLinkElement>) => {
		setOffsetSlider(e.target.offsetLeft);
		setWidthSlider(e.target.offsetWidth);
	};

	React.useEffect(() => {
		if (router.pathname === '/about') {
			setOffsetSlider(125);
			setWidthSlider(70);
		} else {
			setOffsetSlider(0);
			setWidthSlider(80);
		}
	}, []);

	const routes: routesTypes[] = [
		{
			name: 'Работы',
			to: 'works',
			onClick: handleMenuActive,
			className: 'menu__link',
		},
		{
			name: 'Про меня',
			to: 'about',
			onClick: handleMenuActive,
			className: 'menu__link',
		},
		{
			name: 'Список всех портфолио',
			to: 'list',
			onClick: handleMenuActive,
			className: 'menu__link',
		},
	];

	return (
		<header className='header'>
			<div className='container'>
				<div className='header__body'>
					<p className='header__name'>{name}</p>
					<nav className='header__menu menu'>
						<div
							className='menu__slider'
							style={{ left: offsetSlider, width: widthSlider }}></div>
						<ul className='menu__list'>
							{routes &&
								routes.map((route) => (
									<li className='menu__item' key={`${route.to}_${route.name}`}>
										<NavLink
											to={route.to}
											className={route.className}
											onClick={route.onClick}>
											{route.name}
										</NavLink>
									</li>
								))}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};
