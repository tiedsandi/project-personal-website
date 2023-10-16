import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.section)`
	height: 100%;
	width: 100%;
	padding-top: 3rem;

	section:last-child {
		display: flex;
		gap: 4rem;
		padding-bottom: 0.2rem;
	}

	@media (max-width: 768px) {
		padding-top: 1rem;

		section:last-child {
			display: block;
		}
	}
`;

export const Container = styled.div`
	margin-bottom: 3rem;
	> p {
		padding-bottom: 0;
		@media (max-width: 425px) {
			padding-bottom: 0.5rem;
		}
	}
`;
