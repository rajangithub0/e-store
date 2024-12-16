import React from 'react'
import Layout from '../Components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi'

const Contact = () => {
    return (
        <Layout>
            <div className='row contactus'>
                <div className='col-md-6'>
                    <img src='' alt='contactus' style={{ width: "100%" }} />
                    <div className='col-md-4'>
                        <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
                        <p className='text-justify mt-2'>
                            any query and info about product feel free to call anytime we 24*7 available
                        </p>
                        <p className='mt-3'> <BiMailSend />:www.e-commercehelp.com</p>
                        <p className='mt-3'> <BiPhoneCall />:01-23456789</p>
                        <p className='mt-3'><BiSupport /> 1100 1000 1000</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact