import React from 'react'
import { useSelector } from 'react-redux';

const Intro = () => {
    const { loading, portfolioData } = useSelector((state) => state.root);
    const { intro } = portfolioData;
    const { caption, discription, firstName, welcomeText } = intro;
    return (
        <>
            <div className='h-[90vh] bg-primary flex flex-col items-start justify-center gap-10 py-10 ' >

                {/* style={{ backgroundImage: 'url("https://picsum.photos/1000/500?grayscale&blur=10")' }} */}
                {/* bg-contain bg-no-repeat rounded */}

                <h1 className='text-white'>{welcomeText || ''}</h1>
                <h1 className='text-8xl md:text-6xl sm:text-3xl text-secondary font-semibold'>{firstName || ''}</h1>
                <h1 className='text-7xl md:text-5xl sm:text-2xl text-white font-semibold '>{caption || ''}</h1>
                <p className='text-white w-2/3'>
                    {discription || ''}
                </p>
                <button className='border-2 border-tertiary text-tertiary px-10 py-4 rounded hover:bg-slate-800'>Get Started</button>

            </div>
        </>
    )
}

export default Intro