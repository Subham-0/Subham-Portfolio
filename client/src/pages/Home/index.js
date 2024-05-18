import React from 'react'
import Header from '../../components/Header'
import Intro from './Intro'
import About from './About'
import Experience from './Experiences'
import Projects from './Projects'
import Educations from './Educations'
import Contact from './Contact'
import Footer from './Footer'
import Slider from './Slider'
import { useSelector } from 'react-redux'


const Home = () => {
    const { portfolioData } = useSelector((state) => state.root);
    return (
        <div>
            <Header />
            {portfolioData && (
                <div className='bg-primary px-40  sm:px-5    md:px-10'>
                    <Intro />
                    <About />
                    <Experience />
                    <Projects />
                    <Educations />
                    <Contact />
                    <Footer />
                    <Slider />
                </div>
            )}
        </div>
    )
}

export default Home