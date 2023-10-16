import React, { useState } from 'react';
import { StyleSheetManager } from 'styled-components';

import HamburgerMenu from '../../assets/icon-hamburger.svg';
import { NavIconHamburger, NavList, NavItem } from './Navigation.styles';

const Navigation = ({ pageRender, setPageRender }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleToggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<StyleSheetManager shouldForwardProp={prop => !prop.startsWith('$')}>
			<NavIconHamburger src={HamburgerMenu} alt="Hamburger Menu" onClick={handleToggleMenu} />
			<NavList className={`${isMenuOpen ? 'open' : ''}`}>
				<NavItem onClick={() => setPageRender('home')} active={pageRender === 'home' ? 'true' : 'false'}>
					Home
				</NavItem>
				<NavItem onClick={() => setPageRender('about-me')} active={pageRender === 'about-me' ? 'true' : 'false'}>
					Tentang Saya
				</NavItem>
				<NavItem onClick={() => setPageRender('my-project')} active={pageRender === 'my-project' ? 'true' : 'false'}>
					Project Saya
				</NavItem>
			</NavList>
		</StyleSheetManager>
	);
};

export default Navigation;
