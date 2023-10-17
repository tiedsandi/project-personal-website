import React, { useState } from 'react';

import { Wrapper, Box, Container, Image, Title, Text, TextContainer, Overlay, ImageContainer } from './MyProjects.styles';
import { Heading, Paragraph } from '../../App.styles';
import { MainProjects, SideProjects } from '../../Datas';
import Modal from '../../components/modal/Modal';

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
							<Text>{item.year}</Text>
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
							<Text>{item.year}</Text>
						</TextContainer>
					</Container>
				))}
			</Box>
			<Modal selectedProject={selectedProject} setSelectedId={setSelectedId} />
		</Wrapper>
	);
};

export default MyProjects;
