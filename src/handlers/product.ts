import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['price', 'ASC']
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        res.status(200).json({ data: products })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const getProductByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            res.status(404).json({ error: 'Product not found' })
            return
        }

        res.status(200).json({ data: product })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const createProducts = async (req: Request, res: Response) => {

    try {
        const product = await Product.create(req.body);
        res.status(201).json({ data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateProduct = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            res.status(404).json({ error: 'Product not found' })
            return
        }
        //Update
        console.log(req.body)
        await product.update(req.body)
        await product.save()

        res.status(201).json({ data: product })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateAvailavility = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            res.status(404).json({ error: 'Product not found' })
            return
        }
        //Update
        product.availability = !product.dataValues.availability
        await product.save()

        res.status(200).json({ data: product })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            res.status(404).json({ error: 'Product not found' })
            return
        }
        await product.destroy()
        res.status(200).json({ data: 'The product has been removed' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}