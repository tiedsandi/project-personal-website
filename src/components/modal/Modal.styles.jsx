import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from '../../App.styles';

export const Container = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.8);
	z-index: 2;
`;

export const Content = styled(motion.div)`
	background: grey;
	padding: 2rem;
	margin: 0.5rem;
	border-radius: 5px;
	text-align: center;
	position: relative;
`;

export const CloseButton = styled(motion.button)`
	background: none;
	border: none;
	color: white;
	position: absolute;
	top: 1rem;
	right: 1rem;
	font-size: 1.5rem;
	cursor: pointer;
`;

export const Image = styled(motion.img)`
	max-width: 100%;
	width: 100%;
	max-height: 500px;
`;

export const Links = styled(Link)`
	color: #c6ff00;
	&:hover {
		color: #c8ff0034;
	}
`;
