import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//FORGET PASSWORD ||POST METHOD
router.post('/forgot-password', forgotPasswordController);

//TEST ROUTES ||MEHTOD GET
router.get("/test", requireSignIn, isAdmin, testController);

//PROTECTED USER ROUTE AUTH ||METHOD GET
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//PROTECTED ADMIN ROUTE AUTH || METHOD GET
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

export default router;