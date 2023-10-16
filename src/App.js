import React from 'react';
import useLocalStorage from 'use-local-storage';

import Navigation from './components/navigation/Navigation';
import Home from './pages/home/Home';
import AboutMe from './pages/about-me/AboutMe';
import MyProjects from './pages/my-projects/MyProjects';

import { Container, Wrapper } from './App.styles';

function App() {
	const [pageRender, setPageRender] = useLocalStorage('page', 'home');

	return (
		<Container>
			<Navigation pageRender={pageRender} setPageRender={setPageRender} />
			<Wrapper>
				{pageRender === 'home' && <Home />}
				{pageRender === 'about-me' && <AboutMe />}
				{pageRender === 'my-project' && <MyProjects />}
			</Wrapper>
		</Container>
	);
}

export default App;
