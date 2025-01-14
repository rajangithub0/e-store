import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {

    const params = useParams()
    const [product, setProduct] = useState({})
    //get product
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])
    const getProduct = async () => {
        try {
            const { data } = axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title={'Product Details'} className='row'>
            <div className='col-md-6'>
                <img src={`/api/v1/product/product-photo/${product._id}`}
                    className='card-img-top'
                    alt={product.name} />
            </div>
            <div className='col-md-6'>details</div>
            <div className='row'>details</div>
        </Layout>
    )
}

export default ProductDetails