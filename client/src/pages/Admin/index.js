import React, { useEffect } from 'react'
import Header from '../../components/Header'
import { Tabs } from 'antd'
import AdminIntro from './AdminIntro'
import AdminAbout from './AdminAbout'
import { useSelector } from 'react-redux'
import AdminExperience from './AdminExperience'
import AdminProjects from './AdminProjects'
import AdminEducation from './AdminEducation'
import AdminContact from './AdminContact'



function Admin() {
    const { portfolioData } = useSelector((state) => state.root)

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            window.location.href = "/admin-login"
        }
    }, [])


    return (
        < >
            <div>
                <Header />

                <div className='flex gap-10 items-center px-5 py-2 justify-between'>
                    <div className='flex gap-10 items-center '>
                        <h1 className='text-2xl  py-2 text-primary sm:text-lg'>Protfolio Admin</h1>
                    </div>
                    <h1 className='underline text-primary text-xl cursor-pointer sm:text-sm'
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/admin-login"
                        }}
                    >Logout</h1>
                </div>

                {portfolioData && <div className='p-4 py-0'>
                    <Tabs className='px-2 ' defaultActiveKey="1" >
                        <Tabs.TabPane tab="Intro" key="1">
                            <AdminIntro />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="About" key="2">
                            <AdminAbout />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Experience" key="3">
                            <AdminExperience />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Projects" key="4">
                            <AdminProjects />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Education" key="5">
                            <AdminEducation />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Contact" key="6">
                            <AdminContact />
                        </Tabs.TabPane>

                    </Tabs>
                </div>}
            </div>
        </>
    )
}

export default Admin