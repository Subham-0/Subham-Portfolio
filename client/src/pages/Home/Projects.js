import React from 'react';

import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';
// import { projects } from '../../resources/projects'


const Projects = () => {
    const [selectedItemIndex, setselectedItemIdex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const { project
    } = portfolioData;
    return (
        <>
            <SectionTitle title="Projects" />
            <div className='flex py-10 gap-10 sm:flex-col'>
                <div className=' flex flex-col gap-10 border-l-2 border-[#135e4c82]  w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                    {/* displaying the period */}

                    {project.map((project, index) => (

                        <div onClick={() => {
                            setselectedItemIdex(index);
                        }} className='cursor-pointer '>
                            <h1 className={`text-xl px-5 
                            ${selectedItemIndex === index ? 'text-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] border-tertiary' : 'text-white'}`}
                            >{project.title}</h1>
                        </div>
                    ))
                    }
                </div>

                <div className=' flex items-center justify-center gap-10 sm:flex-col md:flex-col'>


                    <iframe className='h-72 w-72 sm:h-52 sm:w-52'
                        src={project[selectedItemIndex].image}
                        title='/'
                    ></iframe>



                    <div className='flex flex-col gap-5'>
                        {/* displaying the contain */}
                        <h1 className='text-secondary text-2xl'>{project[selectedItemIndex].title}</h1>
                        <p className='text-white'> Technologies: {project[selectedItemIndex].technology.join(', ')}</p>

                        <p className='text-white '> {project[selectedItemIndex].description}</p>

                        <a className='text-tertiary ' href={project[selectedItemIndex].link} >
                            ➡️ To view my project click here ⬅️
                        </a>


                    </div>
                </div>
            </div >

        </>
    )
}

export default Projects