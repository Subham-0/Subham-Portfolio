import React from 'react'
import { Form, Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoading, HideLoading } from '../../redux/rootSlice'
import { message } from 'antd'
import loginInstance from '../../util/loginInstance'

const AdminAbout = () => {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root)
    const onfinish = async (values) => {
        try {
            const tempskills = values.skills.split(" , ");
            values.skills = tempskills;

            dispatch(ShowLoading())
            const response = await loginInstance.post("/api/portfolio/update-about",
                {
                    ...values,
                    _id: portfolioData.about._id,
                })
            dispatch(HideLoading())
            if (response.data.success) {
                message.success(response.data.message)
            }
            else {
                message.error(response.data.message)
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }
    return (
        <>
            <Form onFinish={onfinish} layout='vertical' className=' rounded'

                initialValues={{
                    ...portfolioData.about,
                    skills: portfolioData.about.skills.join(" , "),
                }}
            >
                <FormItem name={'lottieURL'} label='lottieURL'>
                    <Input placeholder='lottieURL' />
                </FormItem>
                <FormItem name={'description1'} label='Description1'>
                    <TextArea className='pb-24' placeholder='description1' />
                </FormItem>
                <FormItem name={'description2'} label='description2'>
                    <TextArea className='pb-24' placeholder='description2' />

                </FormItem>
                <FormItem name={'skills'} label='Skills'>
                    <Input placeholder='Skills' />
                </FormItem>
                <div className='flex justify-end w-full'>
                    <button className='px-10 py-2 bg-primary text-white rounded' type='submit'>SAVE</button>
                </div>
            </Form>
        </>
    )
}

export default AdminAbout
