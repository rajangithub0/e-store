import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController, } from '../controllers/productController.js';
import Formidable from 'express-formidable';

const router = express.Router()

//routes
//create product ||post 
router.post('/create-product', requireSignIn, isAdmin, Formidable(), createProductController)

//get product ||GET
router.get('/get-product', getProductController)

//get single product ||Get
router.get('/get-single-product/:slug', getSingleProductController)

//get photo from product ||get
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid', isAdmin, requireSignIn, deleteProductController)

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, Formidable(), updateProductController)

export default router