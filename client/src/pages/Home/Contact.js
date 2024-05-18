import React from 'react'
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';
const Contact = () => {
    const { loading, portfolioData } = useSelector((state) => state.root);
    const { contact } = portfolioData;


    return (
        <>
            <SectionTitle title={"Say Hello"} />
            <div className='flex items-center justify-between  sm:flex-col'>
                <div className='flex flex-col gap-3 w-[600px] sm:w-full sm:text-sm'>

                    <h1 className='text-tertiary'>{'{'}</h1>
                    {
                        Object.keys(contact).map((key) =>
                            key !== '_id' && (
                                <h1 className='ml-5'>
                                    <span className='text-tertiary'>{key} : </span>
                                    <span className='text-tertiary'>"{contact[key]}"</span>
                                </h1>
                            ))
                    }
                    <h1 className='text-tertiary'>{'}'}</h1>
                </div>
                <div className='sm:w-full' >


                    <dotlottie-player src="https://lottie.host/3c01cdef-ab09-40f5-89db-395164707341/pk20u39RLA.json" background="transparent" speed="1" style={{ border: 'none' }} loop autoplay></dotlottie-player>
                </div>
            </div>
        </>
    )
}

export default Contact