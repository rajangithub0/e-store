import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory';
import Layout from '../Components/Layout/Layout';

const Categories = () => {
    const categories = useCategory()
    return (
        <Layout title={'All categories'}>
            <div className='container'>
                <div className='row'>
                    {
                        categories.map((c) => (
                            <div className='col-md-6'>
                                <button><Link to={"/"}>
                                    {c.name}
                                </Link></button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Categories