import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { categoryController, CreateCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";


const router = express.Router()

//router
//create category ||post
router.post('/create-category', requireSignIn, isAdmin, CreateCategoryController)

//update category||put

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

//get all category ||get
router.get('/get-category', categoryController)

//single category ||get

router.get('/single-category/:slug', singleCategoryController)

//delete category ||delete

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)
export default router