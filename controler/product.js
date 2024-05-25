const Product = require('../models/model-product')
const path = require('path')
const fs = require('fs')
const { param } = require('../router/user')

module.exports = {
    getAllProduct: async (req, res, next) => {
        try {
            const { search, category } = req.query

            let query = {}
            if (search) {
                query.name = { $regex: search, $options: 'i' }
            }

            if (category) {
                query.category = category
            }

            const datas = await Product.find(query).populate('userId', '-password')

            res.status(200).json({
                error: false,
                message: 'Get all data Product success',
                datas
            });
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    getAllProductAuthorization: async (req, res, next) => {
        try {
            const { search, category } = req.query

            if (req.user.role === 'admin') {
                let query = { userId: req.user.id }
                if (search) {
                    query.name = { $regex: search, $options: 'i' }
                }

                if (category) {
                    query.category = category
                }

                const datas = await Product.find(query).populate('userId', '-password')

                return res.status(200).json({
                    error: false,
                    message: 'Get all data Product success',
                    datas
                });
            }

            let query = {}
            if (search) {
                query.name = { $regex: search, $options: 'i' }
            }

            if (category) {
                query.category = category
            }

            const datas = await Product.find(query).populate('userId', '-password')

            res.status(200).json({
                error: false,
                message: 'Get all data Product success',
                datas
            });
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    getByIdProduct: async (req, res, next) => {
        try {
            const datas = await Product.findById(req.params.id)
            if (!datas) return res.status(404).json({ message: `Id ${req.params.id} data not found` })

            res.status(200).json({
                error: false,
                message: 'Get dat by id Product success',
                datas
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    createProduct: async (req, res, next) => {
        try {
            if (req.user.role === 'user') return res.status(400).json({ message: 'User tidak boleh create Product' })

            const { name, price, description, category, stock } = req.body
            const files = req.files
            const image = files ? files.image : null

            if (!image) return res.status(400).json({ message: 'Kamu gagal masukan image Product' })


            const imageData = `${Date.now()}${path.extname(image.name)}`
            const file = path.join(__dirname, '../public/image', imageData)

            image.mv(file, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Failed to upload NIB file", error: err });
                }
            });

            const datas = await Product.create({
                name,
                price,
                description,
                category,
                stock,
                image: `${req.protocol}://${req.get('host')}/public/image/${imageData}`,
                userId: req.user.id
            })

            res.status(201).json({
                error: false,
                message: 'Create Product success',
                datas
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            if (req.user.role === 'user') return res.status(400).json({ message: 'User tidak boleh update Product' })

            const { name, price, description, category, stock } = req.body
            const files = req.files
            const image = files ? files.image : null

            const dataProduct = await Product.findById(req.params.id)
            if (!dataProduct) return res.status(404).json({ message: `id ${req.params.id} not found` })

            const fileImage = dataProduct.image.substring(dataProduct.image.lastIndexOf('/') + 1);
            const deleteImage = path.join(__dirname, '../public', 'image', fileImage);
            if (fs.existsSync(deleteImage)) {
                fs.unlinkSync(deleteImage);
            }

            if (!image) return res.status(400).json({ message: 'Kamu gagal masukan image Product' })

            const imageData = `${Date.now()}${path.extname(image.name)}`
            const file = path.join(__dirname, '../public/image', imageData)

            image.mv(file, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Failed to upload NIB file", error: err });
                }
            });

            const data = await Product.findByIdAndUpdate({ _id: req.params.id }, {
                name,
                price,
                description,
                category,
                stock,
                image: `${req.protocol}://${req.get('host')}/public/image/${imageData}`,
                userId: req.user.id
            }, { new: true })

            res.status(201).json({
                message: "Update data Success",
                data
            })

        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            if (req.user.role === 'user') return res.status(400).json({ message: 'User tidak boleh delete Product' })

            const dataProduct = await Product.findById(req.params.id)
            if (!dataProduct) return res.status(404).json({ message: `delete data id ${req.param.id} not found` })

            const fileImage = dataProduct.image.substring(dataProduct.image.lastIndexOf('/') + 1);
            const deleteImage = path.join(__dirname, '../public', 'image', fileImage);
            if (fs.existsSync(deleteImage)) {
                fs.unlinkSync(deleteImage);
            }

            await Product.deleteOne({ _id: req.params.id })

            res.status(200).json({ message: "Delete success" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}