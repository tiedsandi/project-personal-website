import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.section)`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: max-content;
	gap: 1rem 3rem;
	padding-top: 1rem;
	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`;

export const Box = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`;

export const ListContact = styled.section`
	margin: 2em 0;
	ul {
		display: flex;
		gap: 0.7rem;
		list-style: none;
	}
`;
