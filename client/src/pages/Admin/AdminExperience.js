import { Button, Form, Input, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import React, { useState } from 'react';
import loginInstance from '../../util/loginInstance';

function AdminExperience() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { experiences } = portfolioData;
    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response;
            if (selectedItemForEdit) {
                response = await loginInstance.post("/api/portfolio/update-experience", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await loginInstance.post("/api/portfolio/add-experience", values);
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
            const response = await loginInstance.post("/api/portfolio/delete-experience", {
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

    const handleEditClick = (experience) => {
        setSelectedItemForEdit(experience);
        form.setFieldsValue({
            period: experience.period,
            company: experience.company,
            tittle: experience.tittle,
            description: experience.description,
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
                    Add Experience
                </Button>
            </div>
            <div className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-5'>
                {experiences.map((experience) => (
                    <div className='shadow border p-5 border-gray-400 bg-yellow-50' key={experience._id}>
                        <h1 className='text-tertiary text-xl font-bold'>{experience.period}</h1>
                        <h1>Company : {experience.company}</h1>
                        <h1>Role : {experience.tittle}</h1>
                        <h1>{experience.description}</h1>
                        <div className='flex justify-end mt-5'>
                            <Button className='bg-primary text-white m-1'
                                onClick={() => handleEditClick(experience)}
                            >Edit</Button>
                            <Button className='bg-red-500 text-white m-1'
                                onClick={() => onDelete(experience)}
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
                        period: selectedItemForEdit ? selectedItemForEdit.period : "",
                        company: selectedItemForEdit ? selectedItemForEdit.company : "",
                        tittle: selectedItemForEdit ? selectedItemForEdit.tittle : "",
                        description: selectedItemForEdit ? selectedItemForEdit.description : "",
                    }}
                >
                    <Form.Item name='period' label='Period'>
                        <Input placeholder='Period' />
                    </Form.Item>
                    <Form.Item name='company' label='Company'>
                        <Input placeholder='Company' />
                    </Form.Item>
                    <Form.Item name='tittle' label='Title'>
                        <Input placeholder='Title' />
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
    );
}

export default AdminExperience;
