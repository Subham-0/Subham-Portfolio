import React from 'react'

const Loader = () => {

    return (
        <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[1000]'>
            <div className='flex gap-5 text-6xl font-semibold sm:text-3xl '>
                <h1 className='text-secondary m'>M</h1>
                <h1 className='text-white s'>S</h1>
                <h1 className='text-tertiary d'>D</h1>
            </div>
        </div>
    )
}

export default Loader