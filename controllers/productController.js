import exp from "constants";
import productModel from "../models/productModel.js";
import fs from 'fs'
import slugify from 'slugify';

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //vaildation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'name is required' })
            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required less then 1 mb' })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).send({
            success: true,
            message: 'product create successfully',
            products,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in create product',
            error
        })
    }
}

//get all products

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({ createAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: 'all products',
            products,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'ERROR IN GET PRODUCTS',
            error: error.message
        })
    }
}

//get single product

export const getSingleProductController = async (req, res) => {
    try {
        const products = await productModel.findOne({ slug: req.params.slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: 'single product details',
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in fetch single product',
            error,
            error: error.message
        })
    }
}

//get photo

export const productPhotoController = async (req, res) => {
    try {

        const products = await productModel.findById(req.params.pid).select('photo')
        if (products.photo.data) {
            res.set('content-type', products.photo.contentType)
            return res.status(200).send(products.photo.data)
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in photo fetch',
            error
        })
    }
}

//delete  product

export const deleteProductController = async (req, res) => {
    try {
        const products = await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: 'product deleted successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in delete product',
            error
        })
    }
}

//update product controller

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //vaildation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'name is required' })
            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required less then 1 mb' })
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).send({
            success: true,
            message: 'product update successfully',
            products,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'unable to update the product',
            error
        })

    }
}