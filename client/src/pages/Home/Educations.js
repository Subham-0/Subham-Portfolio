import React from 'react'

import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';
// import { educations } from '../../resources/educations'


const Educations = () => {
    const [selectedItemIndex, setselectedItemIdex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const { education
    } = portfolioData;
    return (
        <>
            <SectionTitle title="Education" />
            <div className='flex py-10 gap-10 sm:flex-col'>
                <div className=' flex flex-col gap-10 border-l-2 border-[#135e4c82]  w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                    {/* displaying the period */}

                    {education.map((education, index) => (

                        <div onClick={() => {
                            setselectedItemIdex(index);
                        }} className='cursor-pointer '>
                            <h1 className={`text-xl px-5 
                            ${selectedItemIndex === index ? 'text-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] border-tertiary' : 'text-white'}`}
                            >{education.title}</h1>
                        </div>
                    ))
                    }
                </div>

                <div className=' flex  items-center justify-center gap-10 sm:flex-col-reverse md:flex-col-reverse'>






                    <div className='flex flex-col gap-5'>
                        {/* displaying the contain */}
                        <h1 className='text-secondary text-2xl'>{education[selectedItemIndex].title}</h1>
                        <p className='text-white '> {education[selectedItemIndex].description}</p>




                    </div>
                    <iframe className='h-72 w-80 sm:w-52 sm:h-52'
                        src={education[selectedItemIndex].image}
                        title='/'
                    ></iframe>
                </div>
            </div >

        </>
    )
}


export default Educations


