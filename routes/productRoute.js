import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController } from '../controllers/productController.js';
import Formidable from 'express-formidable';

const router = express.Router()

//routes
router.post('/create-product', requireSignIn, isAdmin, Formidable(), createProductController)

export default router