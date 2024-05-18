import React from 'react'
import { Form, Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoading, HideLoading } from '../../redux/rootSlice'
import axios from "axios";
import { message } from 'antd'

const AdminContact = () => {


    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root)

    console.log(portfolioData.contact);

    const onfinish = async (values) => {
        try {
            dispatch(ShowLoading())
            const response = await axios.post("/api/portfolio/update-contact",
                {

                    ...values,
                    _id: portfolioData.contact._id,
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
                initialValues={portfolioData.contact}>

                <FormItem name={'name'} label='Name' >
                    <Input placeholder='Name' />
                </FormItem>
                <FormItem name={'age'} label='Age' >
                    <Input placeholder='Age' />
                </FormItem>
                <FormItem name={'gender'} label='Gender' >
                    <Input placeholder='Gender' />
                </FormItem>
                <FormItem name={'email'} label='Email' >
                    <Input placeholder='Email' />
                </FormItem>
                <FormItem name={'mobile'} label='Mobile' >
                    <Input placeholder='Mobile' />
                </FormItem>
                <FormItem name={'country'} label='Country' >
                    <Input placeholder='Country' />
                </FormItem>


                <div className='flex justify-end w-full'>
                    <button className='px-10 py-2 bg-primary text-white rounded' type='submit'>SAVE</button>
                </div>
            </Form>
        </>
    )
}

export default AdminContact