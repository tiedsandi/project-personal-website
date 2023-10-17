import React from 'react';

import { AnimatePresence } from 'framer-motion';
import { CloseButton, Container, Content, Image, Links } from './Modal.styles';
import { Title, Text } from '../../pages/my-projects/MyProjects.styles';

const Modal = ({ selectedProject, setSelectedId }) => {
	return (
		<AnimatePresence>
			{selectedProject && (
				<Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					<Content initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
						<Title>{selectedProject.title}</Title>
						<Text>{selectedProject.subtitle}</Text>
						<Image src={selectedProject.image} alt="" />
						<Text>
							<b>Tech:</b> {selectedProject.tech}
						</Text>
						<div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
							<Links href={selectedProject.github} target="_blank" rel="noopener noreferrer">
								Github
							</Links>
							{selectedProject.live && (
								<Links href={selectedProject.live} target="_blank" rel="noopener noreferrer">
									Live
								</Links>
							)}
							{selectedProject.video && (
								<Links href={selectedProject.video} target="_blank" rel="noopener noreferrer">
									Video
								</Links>
							)}
						</div>
						<CloseButton onClick={() => setSelectedId(null)}>X</CloseButton>
					</Content>
				</Container>
			)}
		</AnimatePresence>
	);
};

export default Modal;
