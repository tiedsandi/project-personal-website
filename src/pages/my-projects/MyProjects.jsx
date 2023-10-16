import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
	Wrapper,
	Box,
	Container,
	Image,
	Title,
	Year,
	TextContainer,
	Overlay,
	ImageContainer,
	SelectedProjectContainer,
	SelectedProjectContent,
	CloseButton,
} from './MyProjects.styles';
import { Heading, Paragraph } from '../../App.styles';
import { MainProjects, SideProjects } from '../../Datas';

const MyProjects = () => {
	const [selectedId, setSelectedId] = useState(null);

	const selectedProject = MainProjects.concat(SideProjects).find(item => item.id === selectedId);

	return (
		<Wrapper initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ease: 'easeOut', duration: 1.5 }}>
			<Paragraph>Berbagai macam project utama dan sampingan yang saya buat</Paragraph>
			<Heading>Main Proyek</Heading>
			<Box>
				{MainProjects.map(item => (
					<Container key={item.id} layoutId={item.id} onClick={() => setSelectedId(item.id)}>
						<ImageContainer>
							<Image src={item.image} alt="" />
							<Overlay />
						</ImageContainer>
						<TextContainer>
							<Title>{item.title}</Title>
							<Year>{item.year}</Year>
						</TextContainer>
					</Container>
				))}
			</Box>
			<Heading>Side Proyek</Heading>
			<Box>
				{SideProjects.map(item => (
					<Container key={item.id} layoutId={item.id} onClick={() => setSelectedId(item.id)}>
						<ImageContainer>
							<Image src={item.image} alt="" />
							<Overlay />
						</ImageContainer>
						<TextContainer>
							<Title>{item.title}</Title>
							<Year>{item.year}</Year>
						</TextContainer>
					</Container>
				))}
			</Box>
			<AnimatePresence>
				{selectedProject && (
					<SelectedProjectContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						<SelectedProjectContent initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
							<Title>{selectedProject.title}</Title>
							<Year>{selectedProject.subtitle}</Year>
							<Image src={selectedProject.image} alt="" />
							<CloseButton onClick={() => setSelectedId(null)}>X</CloseButton>
						</SelectedProjectContent>
					</SelectedProjectContainer>
				)}
			</AnimatePresence>
		</Wrapper>
	);
};

export default MyProjects;
