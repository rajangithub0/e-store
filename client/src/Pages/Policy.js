import React from 'react'
import Layout from '../Components/Layout/Layout'

const Policy = () => {
    return (
        <Layout>
            <div className='row contactus'>
                <div className='col-md-6'>
                    <img src='image/TaC.webp' alt='policyus' style={{ width: "100%" }} />
                </div>
                <div className='col-md-4 '>
                    <h1 className='bg-dark p-2 mt-4 text-white text-center'>POLICY US</h1>
                    <p className='text-justify mt-4'>
                        Welcome to [Your Company Name]. We value your privacy and are committed to protecting your information. This policy explains how we collect, use, and disclose your data when you visit our website or use our services.
                        <h4>Information We Collect</h4>
                        <p>We collect personal information, such as your name, email, phone number, address, and payment details. Non-personal data, including browser type, device info, IP address, and cookies, is also gathered to enhance user experience.</p>
                        <h5>Sharing Information</h5>
                        <p>We do not sell your data. We may share it with service providers, legal authorities, or in the event of a business merger.</p>
                        <h6>Contact Us</h6>
                        <p>For questions, contact us at [Your Email] or [Your Phone].Effective Date: [Insert Date]</p>
                    </p>

                </div>

            </div>
        </Layout>
    )
}

export default Policy