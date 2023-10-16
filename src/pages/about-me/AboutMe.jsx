import React from 'react';
import { Container, Wrapper } from './AboutMe.styles';
import { Heading, Paragraph } from '../../App.styles';

const AboutMe = () => {
	return (
		<Wrapper initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ease: 'easeOut', duration: 1.5 }}>
			<section style={{ marginBottom: '3rem' }}>
				<Heading>Siapa Saya</Heading>
				<Paragraph>
					Perkenalkan, saya adalah Fachran Sandi, seorang individu yang berusia 23 tahun yang memiliki semangat besar
					untuk terlibat dalam dunia desain dan pengembangan web. Meskipun saya belum memiliki pengalaman profesional
					yang cukup, saya sangat berminat untuk belajar dan memperoleh pengalaman di bidang ini.
				</Paragraph>
				<Paragraph>
					Saya yakin bahwa dengan dedikasi dan kemauan keras untuk terus belajar, saya dapat mengembangkan keterampilan
					desain dan pengembangan web saya. Saya telah memulai perjalanan ini dengan mempelajari berbagai sumber daya
					online dan proyek-proyek kecil yang saya kerjakan sendiri.
				</Paragraph>
				<Paragraph>
					Saya berharap dapat menjadi bagian dari komunitas yang memungkinkan saya untuk berkontribusi, belajar, dan
					tumbuh dalam bidang ini. Saya siap untuk menghadapi tantangan-tantangan baru yang mungkin muncul dalam
					perjalanan saya menuju pengembangan profesional di dunia desain dan pengembangan web.
				</Paragraph>
			</section>
			<section>
				<Container>
					<Heading>Skills</Heading>
					<Paragraph>
						<b style={{ fontWeight: 500 }}>SoftSkills:</b> ReactJs, Html & CSS, Javascript, SASS, Git, Redux, Jest
					</Paragraph>
					<Paragraph>
						<b style={{ fontWeight: 500 }}>HardSkills:</b> Bekerja Dalam Team, Berpikir Kritis
					</Paragraph>
				</Container>
				<Container>
					<Heading>Bahasa</Heading>
					<Paragraph>
						Bahasa Indonesia (Native)
						<br />
						Bahasa Inggris (toefl: 456)
					</Paragraph>
				</Container>
			</section>
		</Wrapper>
	);
};

export default AboutMe;
