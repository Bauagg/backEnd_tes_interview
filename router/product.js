const router = require('express').Router()
const authorization = require('../midelware/authorization')

const controlerProduct = require('../controler/product')

router.get('/', controlerProduct.getAllProduct)
router.get('/list', authorization, controlerProduct.getAllProductAuthorization)
router.get('/detail/:id', authorization, controlerProduct.getByIdProduct)
router.post('/create', authorization, controlerProduct.createProduct)
router.put('/update/:id', authorization, controlerProduct.updateProduct)
router.delete('/delete/:id', authorization, controlerProduct.deleteProduct)

module.exports = router