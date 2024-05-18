import React from 'react'
// import { experience } from '../../resources/experience'

import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

const Experience = () => {
    const [selectedItemIndex, setselectedItemIdex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const { experiences
    } = portfolioData;

    return (
        <>
            <SectionTitle title="Experiences" />

            <div className='flex py-10 gap-10 sm:flex-col'>
                <div className=' flex flex-col gap-10 border-l-2 border-[#135e4c82]  w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                    {/* displaying the period */}

                    {experiences.map((experiences, index) => (

                        <div onClick={() => {
                            setselectedItemIdex(index);
                        }} className='cursor-pointer '>
                            <h1 className={`text-xl px-5 
                            ${selectedItemIndex === index ? 'text-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] border-tertiary' : 'text-white'}`}
                            >{experiences.period}</h1>
                        </div>
                    ))
                    }
                </div>

                <div className='flex flex-col gap-5'>
                    {/* displaying the contain */}
                    <h1 className='text-secondary text-2xl'>{experiences[selectedItemIndex].tittle}</h1>
                    <h1 className='text-tertiary text-xl'>{experiences[selectedItemIndex].company}</h1>
                    <p className='text-white'>
                        {experiences[selectedItemIndex].description}
                    </p>

                </div>
            </div>
        </>
    )
}

export default Experience