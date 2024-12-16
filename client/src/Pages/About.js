import React from 'react'
import Layout from '../Components/Layout/Layout'

const About = () => {
    return (
        <Layout>
            <div className='row contactus'>
                <div className='col-md-6'>
                    <img src='' alt='aboutus' style={{ width: "100%" }} />
                    <div className='col-md-4'>
                        <h1 className='bg-dark p-2 text-white text-center'>ABOUT US</h1>
                        <p className='text-justify mt-2'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, neque fuga ipsum modi blanditiis eaque quasi eum nobis quas. Perspiciatis sed, esse sunt velit provident molestias quam dolores iusto molestiae?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, architecto dolor quas dicta dolores eius soluta? Velit eveniet possimus molestiae recusandae, amet facere autem. Quibusdam ea aut excepturi beatae sit.
                        </p>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About