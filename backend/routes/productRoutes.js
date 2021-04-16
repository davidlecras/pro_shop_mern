import express from 'express'
import expreAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

//@desc Fetch all products from dataBase
//@route GET /api/products
//@access Public
router.get('/', expreAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

//@desc Fetch single product from dataBase
//@route GET /api/products/:id
//@access Public
router.get('/:id', expreAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json('Produit non trouvé')
    }
}))

export default router