import { Button, Form, Input, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
import React, { useState } from 'react';




function AdminProjects() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { project: projects } = portfolioData;
    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [form] = Form.useForm();

    console.log(portfolioData);


    const onFinish = async (values) => {
        console.log("Form Values:", values);
        try {
            const technologies = values.technology.split(",").map((tech) => tech.trim());

            values.technology = technologies;

            dispatch(ShowLoading());
            let response;
            if (selectedItemForEdit) {
                response = await axios.post("/api/portfolio/update-project", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("/api/portfolio/add-project", {
                    ...values,
                    technologies: values.technology, // Corrected key name
                });
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
            const response = await axios.post("/api/portfolio/delete-project", {
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

    const handleEditClick = (project) => {
        setSelectedItemForEdit(project);


        form.setFieldsValue({
            title: project.title,
            image: project.image,
            technology: project.technology.join(', '),
            description: project.description,
            link: project.link,

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
                    Add Project
                </Button>
            </div>
            <div className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-5'>
                {projects && projects.map((project) => (
                    <div className='shadow border p-5 border-gray-400 bg-yellow-50' key={project._id}>
                        <h1 className='text-tertiary text-xl font-bold'>{project.title}</h1>


                        <div className='flex justify-center items-center h-[50vh] sm:w-full md:w-full'>
                            <iframe src={project.image} className='h-[100%] w-[100%]' title={project.title}></iframe>
                        </div>

                        <h1>Technologies : {project.technology.join(', ')}</h1>
                        <h1>Description : {project.description}</h1>
                        <h1><a href={project.link}>project link</a></h1>
                        <div className='flex justify-end mt-5'>
                            <Button className='bg-primary text-white m-1'
                                onClick={() => handleEditClick(project)}
                            >Edit</Button>
                            <Button className='bg-red-500 text-white m-1'
                                onClick={() => onDelete(project)}
                            >Delete</Button>
                        </div>

                    </div>
                ))}
            </div>


            <Modal
                visible={showAddEditModel}
                title={selectedItemForEdit ? "Edit Project" : "Add Project"}
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
                        technology: selectedItemForEdit ? selectedItemForEdit.technology : "",
                        description: selectedItemForEdit ? selectedItemForEdit.description : "",
                        link: selectedItemForEdit ? selectedItemForEdit.link : "",
                    }}
                >
                    <Form.Item name='title' label='Title'>
                        <Input placeholder='Title' />
                    </Form.Item>
                    <Form.Item name='image' label='Image'>
                        <Input placeholder='Image URL' />
                    </Form.Item>
                    <Form.Item name='technology' label='Technologies'>
                        <Input placeholder='Technologies (comma-separated)' />
                    </Form.Item>
                    <Form.Item name='description' label='Description'>
                        <Input.TextArea rows={4} placeholder='Description' />
                    </Form.Item>
                    <Form.Item name='link' label='Link'>
                        <Input placeholder='Link URL' />
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

export default AdminProjects;
