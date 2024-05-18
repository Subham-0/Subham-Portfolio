import React from 'react'

const Slider = () => {
    return (
        <div className='fixed left-0 bottom-0 px-10 sm:static md:static'>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col gap-3 sm:flex-row md:flex-row'>
                    <a href="https://wa.me/qr/IZT37H7TGD5SN1"><i className="ri-whatsapp-line text-gray-400 text-xl"></i></a>

                    <a href="mailto:dashsubham2002@gmail.com"><i className="ri-mail-line text-gray-400 text-xl"></i></a>
                    <a href="https://www.instagram.com/subhamdash58/?next=%2F">
                        <i className="ri-instagram-line text-gray-400 text-xl"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/-subham-dash/">
                        <i className="ri-linkedin-box-line text-gray-400 text-xl"></i>
                    </a>
                    <a href="https://github.com/Subham-0">
                        <i className="ri-github-line text-gray-400 text-xl"></i>
                    </a>

                </div>
                <div className=' w-[1px] h-48 bg-gray-700 sm:hidden md:hidden'>

                </div>
            </div>
        </div>
    )
}

export default Slider