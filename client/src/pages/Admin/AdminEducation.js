import { Button, Form, Input, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import React, { useState } from 'react';
import loginInstance from '../../util/loginInstance';

const AdminEducation = () => {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { education: educations } = portfolioData;
    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [form] = Form.useForm();

    console.log(portfolioData);


    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response;
            if (selectedItemForEdit) {
                response = await loginInstance.post("/api/portfolio/update-education", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await loginInstance.post("/api/portfolio/add-education", values);
            }
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModel(false);
                setSelectedItemForEdit(null);
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const onDelete = async (item) => {
        try {
            dispatch(ShowLoading());
            const response = await loginInstance.post("/api/portfolio/delete-education", {
                _id: item._id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const handleEditClick = (education) => {
        setSelectedItemForEdit(education);
        form.setFieldsValue({

            title: education.title,
            image: education.image,
            description: education.description,
        });
        setShowAddEditModel(true);
    };


    return (
        <>
            <div className='flex justify-end'>
                <Button className='bg-primary text-white mb-2'
                    onClick={() => {
                        setSelectedItemForEdit(null);
                        form.resetFields();
                        setShowAddEditModel(true);
                    }}>
                    Add Education
                </Button>
            </div>
            <div className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-5'>
                {educations.map((education) => (
                    <div className='shadow border p-5 border-gray-400 bg-yellow-50' key={education._id}>
                        <h1 className='text-tertiary text-xl font-bold'>{education.title}</h1>

                        <div className='flex justify-center items-center h-[50vh] sm:w-full md:w-full'>
                            <iframe src={education.image} className='h-[100%] w-[100%]' title={education.title}></iframe>
                        </div>
                        <h1>{education.description}</h1>
                        <div className='flex justify-end mt-5'>
                            <Button className='bg-primary text-white m-1'
                                onClick={() => handleEditClick(education)}
                            >Edit</Button>
                            <Button className='bg-red-500 text-white m-1'
                                onClick={() => onDelete(education)}
                            >Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                visible={showAddEditModel}
                title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
                footer={null}
                onCancel={() => {
                    setShowAddEditModel(false);
                    setSelectedItemForEdit(null);
                    form.resetFields();
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        title: selectedItemForEdit ? selectedItemForEdit.title : "",
                        image: selectedItemForEdit ? selectedItemForEdit.image : "",
                        description: selectedItemForEdit ? selectedItemForEdit.description : "",
                    }}
                >

                    <Form.Item name='title' label='Title'>
                        <Input placeholder='Title' />
                    </Form.Item>
                    <Form.Item name='image' label='Image'>
                        <Input placeholder='Image URL' />
                    </Form.Item>
                    <Form.Item name='description' label='Description'>
                        <Input placeholder='Description' />
                    </Form.Item>
                    <div className='flex justify-end'>
                        <Button className='border-primary text-primary m-1' onClick={() => {
                            setShowAddEditModel(false);
                            setSelectedItemForEdit(null);
                            form.resetFields();
                        }}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" className='bg-primary text-white px-5 py-1 m-1 rounded'>
                            {selectedItemForEdit ? "Update" : "Add"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default AdminEducation