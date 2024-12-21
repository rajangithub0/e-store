

import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'

import Layout from '../../Components/Layout/Layout';

const ForgotPasssword = () => {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate()


    //form handle
    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', { email, newPassword, answer });
            if (res && res.data.success) {
                toast.success('password changed successfully')
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
        <Layout title={"forgot-password e-commerce app"}>
            <div className='form-container'>
                <h1 className='mb-4'>Reset Password</h1>
                <form onSubmit={handleSumbit}>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter your E-mail' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Favourite Sport' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
                    </div>

                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPasssword