import React from 'react'
import Layout from '../Components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi'

const Contact = () => {
    return (
        <Layout>
            <div className='row contactus'>
                <div className='col-md-6'>
                    <img src='image/OIP.jpg' alt='contactus' style={{ width: "100%" }} />
                </div>
                <div className='col-md-4'>
                    <h1 className='bg-dark p-2 mt-4 text-white text-center'>CONTACT US</h1>
                    <p className='text-justify mt-4 '>
                        any query and info about product feel free to call anytime we 24*7 available
                    </p>
                    <p className='mt-3'> <BiMailSend />:www.e-commercehelp.com</p>
                    <p className='mt-3'> <BiPhoneCall />:01-23456789</p>
                    <p className='mt-3'><BiSupport /> 1100 1000 1000</p>
                </div>

            </div>
        </Layout>
    )
}

export default Contact