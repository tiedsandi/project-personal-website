import React from 'react';

import { ReactComponent as HeroTitle } from '../../assets/hero-title.svg';
import { ReactComponent as HeroImage } from '../../assets/hero-img.svg';
import { Heading, Link, Paragraph } from '../../App.styles';
import { Box, ListContact, Wrapper } from './Home.styles';

const Home = () => {
	return (
		<Wrapper initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ease: 'easeOut', duration: 1.5 }}>
			<Box>
				<HeroTitle style={{ width: '100%', height: 'max-content' }} />
				<Paragraph>
					Menguasai proses user interface, testing, dan debugging processes. Membawa keahlian dalam design,
					installation, testing dan maintenance sistem web. Dilengkapi dengan kumpulan keterampilan yang beragam dan
					berpotensi. Mampu mengelola diri secara efektif saat mengerjakan proyek-proyek independen, serta berkolaborasi
					dalam tim.
				</Paragraph>
			</Box>
			<HeroImage style={{ width: '90%', height: '100%' }} />
			<ListContact>
				<Heading>Kontak Saya</Heading>
				<ul>
					<li>
						<Link href="https://github.com/TiedSandi" target="_blank" rel="noopener noreferrer">
							Githbub
						</Link>
					</li>
					<li>
						<Link href="https://www.linkedin.com/in/fachransandi/" target="_blank" rel="noopener noreferrer">
							LinkedIn
						</Link>
					</li>
					<li>
						<Link href="mailto:fachransandi@gmail.com" target="_blank" rel="noopener noreferrer">
							Email
						</Link>
					</li>
				</ul>
			</ListContact>
		</Wrapper>
	);
};

export default Home;
