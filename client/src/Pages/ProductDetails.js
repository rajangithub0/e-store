import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {

    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])


    //inital p details
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])
    //getproduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    //get similar Product 
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProduct(data?.products)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout >
            <div className='row container mt-2'>
                <div className='col-md-6'>
                    <img src={`/api/v1/product/product-photo/${product._id}`} className='card-img-top' alt={product.name} height='300' width='300' />
                </div>
                <div className='col-md-6 '>
                    <h1 className='text-center'>Product Details</h1>
                    <h3>Name : {product.name}</h3>
                    <h3>Description:{product.description}</h3>
                    <h3>price:{product.price}</h3>
                    <h3>quantity:{product.quantity}</h3>
                    <h3>Category :{product.category?.name}</h3>
                    <button className='btn btn-secondary ms-1'>Add To Cart</button>
                </div>
            </div>
            <hr />
            <div className='row container'>
                <h1>Similar Product</h1>
                {relatedProduct.length < 1 && (<p className='text-center'>no similar product found</p>)}
                {relatedProduct?.map((p) => (
                    <div className='card m-2' style={{ width: '18rem' }}>
                        <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className='card-img-top'
                            alt={p.name} />
                        <div className='card-body'>
                            <h5 className='card-title'>{p.name}</h5>
                            <p className='card-text>'>
                                {p.description.substring(0, 30)}...
                            </p>
                            <p className='card-text'>$ {p.price}</p>
                            <button className='btn btn-secondary ms-1'> Add To Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default ProductDetails