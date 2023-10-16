import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const Container = styled.div`
	width: calc(100vw - 4em);
	height: calc(100vh - 4em);
	max-width: 1440px;
	margin: 2em auto;
`;

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export const Heading = styled(motion.h5)`
	padding-bottom: 0.6rem;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: 100%; /* 24px */
	text-transform: uppercase;

	@media (max-width: 425px) {
		font-size: 20px;
		padding-bottom: 0.3rem;
	}
`;
export const Paragraph = styled(motion.p)`
	padding-bottom: 1rem;
	font-size: 20px;
	font-style: normal;
	font-weight: 300;
	line-height: 176.682%;
	letter-spacing: 1.8px;

	@media (max-width: 425px) {
		font-size: 16px;
		padding-bottom: 1rem;
		letter-spacing: 1px;
		line-height: 160%;
	}
`;
export const Link = styled.a`
	text-decoration: none;
	color: #fff;
	font-size: 18px;
	font-style: normal;
	font-weight: 300;
	line-height: 176.682%;
	// letter-spacing: 1.8px;
	&:hover {
		color: #c6ff00;
	}
	@media (max-width: 425px) {
		font-size: 15px;
	}
`;
