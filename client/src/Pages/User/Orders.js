import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'

const Orders = () => {
    return (
        <Layout title={'dashboard Yours-orders'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>All Orders</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders