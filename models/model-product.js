const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        maxlength: [100, 'Product name cannot exceed 100 characters'],
        minlength: [3, 'Product name must be at least 3 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price cannot be less than 0']
    },
    description: {
        type: String,
        maxlength: [1000, 'Product description cannot exceed 1000 characters']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: {
            values: ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'],
            message: '{VALUE} is not a valid category'
        }
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        min: [0, 'Product stock cannot be less than 0']
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'UserId is required'],
        ref: 'User'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
