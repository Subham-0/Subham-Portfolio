import React from 'react'
import { Form, Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoading, HideLoading } from '../../redux/rootSlice'
import axios from "axios";
import { message } from 'antd'

const AdminIntro = () => {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root)
    const onfinish = async (values) => {
        try {
            dispatch(ShowLoading())
            const response = await axios.post("/api/portfolio/update-intro",
                {
                    ...values,
                    _id: portfolioData.intro._id,
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
            <Form onFinish={onfinish} layout='vertical'
                initialValues={portfolioData.intro}>
                <FormItem name={'welcomeText'} label='WelcomeText' >
                    <Input placeholder='welcomeText' />
                </FormItem>
                <FormItem name={'firstName'} label='FirstName'>
                    <Input placeholder='firstName' />
                </FormItem>
                <FormItem name={'caption'} label='Caption'>
                    <Input placeholder='caption' />
                </FormItem>
                <FormItem name={'discription'} label='Discription'>
                    <TextArea className='pb-36' placeholder='discription' />
                </FormItem>
                <div className='flex justify-end w-full'>
                    <button className='px-10 py-2 bg-primary text-white rounded' type='submit'>SAVE</button>
                </div>
            </Form>
        </>
    )
}

export default AdminIntro