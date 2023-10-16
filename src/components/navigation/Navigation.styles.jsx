import { styled } from 'styled-components';

export const NavList = styled.ul`
	display: flex;
	align-items: center;
	list-style: none;
	@media (max-width: 425px) {
		display: none;

		&.open {
			flex-direction: column;
			display: block;
			background-color: rgba(255, 255, 255, 0.1);
			padding: 0.5em;
		}
	}
`;

export const NavItem = styled.li`
	color: ${props => (props.active === 'true' ? '#C6FF00' : '#fff')};
	cursor: pointer;
	margin-right: 1rem;
	transition: color 0.5s;

	&:hover {
		color: #c6ff00;
	}
`;

export const NavIconHamburger = styled.img`
	display: none;
	cursor: pointer;
	width: 30px;
	@media (max-width: 425px) {
		display: block;
	}
`;
