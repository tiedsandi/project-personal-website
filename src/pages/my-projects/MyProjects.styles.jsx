import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { Heading, Paragraph } from '../../App.styles';

export const Wrapper = styled(motion.section)`
	height: 100%;
	width: 100%;
	padding-top: 3rem;

	@media (max-width: 768px) {
		padding-top: 1rem;
	}
`;

export const Box = styled.div`
	height: max-content;
	margin: 0.5rem 0 2.5rem;
	gap: 1rem;
	display: grid;
	overflow-x: auto;
	grid-auto-flow: column;
	scroll-snap-type: x mandatory;
	scroll-padding: 1rem;
	> * {
		scroll-snap-align: start;
	}
`;

export const Container = styled(motion.div)`
	width: max-content;
	display: flex;
	position: relative;
`;

export const ImageContainer = styled(motion.div)`
	position: relative;
`;

export const Image = styled.img`
	max-width: 100%;
	width: 300px;
	height: 150px;
`;

export const Overlay = styled.div`
	content: '';
	background: rgba(0, 0, 0, 0.5);
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export const TextContainer = styled(motion.div)`
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 1rem;
`;
export const Title = styled(Heading)`
	padding-bottom: 0;
`;
export const Year = styled(Paragraph)`
	padding-bottom: 0;
`;

export const SelectedProjectContainer = styled(motion.div)`
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

export const SelectedProjectContent = styled(motion.div)`
	background: grey;
	padding: 2rem;
	margin: 0.5rem;
	border-radius: 5px;
	text-align: center;
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
