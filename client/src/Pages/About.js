import React from 'react'
import Layout from '../Components/Layout/Layout'

const About = () => {
    return (
        <Layout title={'About e-commerce app'}>
            <div className='row contactus'>
                <div className='col-md-6'>
                    <img src='image/about-us.jpg' alt='aboutus' style={{ width: "100%" }} />
                </div>
                <div className='col-md-4'>
                    <h1 className='bg-dark p-2 text-white text-center'>ABOUT US</h1>
                    <p className='text-justify mt-2'>
                        Welcome to [Your Brand Name] – your one-stop destination for premium [products/services your app offers]. We are passionate about bringing you the best selection of [specific products, e.g., fashion, electronics, home essentials], curated with care to enhance your lifestyle.

                        Founded in [Year], our mission is to combine quality, affordability, and convenience. Whether you're shopping for the latest trends, everyday necessities, or exclusive deals, we’ve got you covered with an intuitive shopping experience.

                        Why Choose Us?

                        Wide Selection: Explore a diverse range of products tailored to meet your needs.
                        Exceptional Quality: We partner with trusted brands and suppliers to ensure you get only the best.
                        Seamless Experience: Enjoy smooth navigation, secure payments, and reliable delivery options.
                        Customer First: Your satisfaction is our priority. Our dedicated support team is here to assist you at every step.
                        Join our growing community of satisfied shoppers and discover the joy of effortless online shopping. At [Your Brand Name], we don’t just sell products – we deliver happiness
                    </p>

                </div>

            </div>
        </Layout>
    )
}

export default About