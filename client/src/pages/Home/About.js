import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

const About = () => {
    const { loading, portfolioData } = useSelector((state) => state.root);
    const { about } = portfolioData;
    const { description1, description2, lottieURL, skills } = about;
    return (
        <>
            <SectionTitle title={"About"} />

            <div className='flex items-center w-full sm:flex-col md:flex-col' >
                <div className='flex justify-center items-center h-[70vh] w-1/2 sm:w-full md:w-full'>

                    {/* https://lottie.host/a81533eb-cf82-4edc-94bd-29795e76348e/8FoRx0O0b1.json */}

                    {/* https://lottie.host/67663bda-a517-4b10-a933-6b47ed5c6ba9/PU7De9Gr4i.json */}


                    <dotlottie-player src={lottieURL || ''} background="transparent" speed="1" style={{ width: '600px', height: '500px', border: 'none' }} loop autoplay></dotlottie-player>
                </div>
                <div className='flex flex-col gap-8 w-1/2 sm:w-full md:w-full'>
                    <p className='text-white'>
                        {description1 || ''}
                    </p>
                    <p className='text-white'>
                        {description2 || ''}
                    </p>
                </div>
            </div>
            <div className='py-5'>
                <h1 className='text-tertiary text-xl'>Here are a few tecnologies I've been working with recently</h1>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-5'>
                    {skills.map((skill, index) => (
                        <div key={index} className='border border-tertiary flex items-center justify-center py-5 px-10'>
                            <h1 className='text-tertiary'>{skill}</h1>
                        </div>
                    ))}
                </div>


            </div>
        </>
    )
}

export default About