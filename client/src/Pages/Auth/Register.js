import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [answer, setAnswer] = useState('')
    const navigate = useNavigate()

    //form handle
    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/register', { name, email, password, phone, address, answer });
            if (res && res.data.success) {
                toast.success(res.data.massage)
                navigate('/login')
            } else {
                toast.error(res.data.massage)
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong')
        }
    }

    return (
        <Layout title={'register e-commerce app'}>
            <div className='form-container '>
                <h1 className='mb-4'>Register Page</h1>
                <form onSubmit={handleSumbit}>
                    <div className="mb-3">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName1" placeholder='Enter Your Name' required />
                    </div>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your E-mail' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone1" placeholder='Enter Your Phone' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress1" placeholder='Enter Your Address' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer1" placeholder='what is your favorite sport' required />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register