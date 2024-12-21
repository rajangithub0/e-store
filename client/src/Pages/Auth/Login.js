import React, { useState } from 'react'
import './Register.css'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useAuth } from '../../context/auth';
import Layout from '../../Components/Layout/Layout';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    //form handle
    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password, });
            if (res && res.data.success) {
                toast.success('login successfullly')
                setAuth({ ...auth, user: res.data.user, token: res.data.token, })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/')
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
            <div className='form-container'>
                <h1 className='mb-4'>Login Form</h1>
                <form onSubmit={handleSumbit}>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='E-mail' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Password' required />
                    </div>
                    <div className='mb-3'>
                        <button type="button" className="btn btn-primary" onClick={() => { navigate('/forgot-password') }}>Forget Password</button>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login