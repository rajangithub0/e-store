import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Modal } from 'antd'
import CategoryForm from '../../Components/Form/CategoryForm'
import PrivateRoute from './../../Components/Routes/Private';

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updateName, setUpdateName] = useState(false)
    //handle submit

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name })
            if (data?.success) {
                toast.success(`${name} is created successfully`)
                getAllCategory()
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong in input form')
        }
    }

    //get all categories

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data.success) {
                setCategories(data.category)
            }

        } catch (error) {
            console.log(error);
            toast.error('Error loading categories')
        }
    }
    useEffect(() => {
        getAllCategory()
    }, [])

    //handle update

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updateName })
            if (data.success) {
                toast.success(`${updateName} is updated successfully`)
                setSelected(null)
                setUpdateName('')
                setVisible(false)
                getAllCategory()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong in input form')
        }
    }

    //delete category
    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pid}`);
            if (data.success) {
                toast.success(`category is deleted successfully`)
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong in input form')
        }
    }


    return (
        <Layout title={'dashboard -create category'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='p-3 w-50'>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map(c => (
                                        <>
                                            <tr>
                                                <td key={c.id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdateName(c.name); setSelected(c) }}>Edit</button>
                                                    <button className='btn btn-danger ms-2' onClick={() => { handleDelete(c._id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                            <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory