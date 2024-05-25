const mongoose = require('mongoose')

const modelUser = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name harus di isi'],
        maxlength: [250, 'karakter max adalah 250'],
        minlength: [3, 'karakter min adalah 3']
    },
    email: {
        type: String,
        required: [true, 'email harus di isi'],
        validate: {
            validator: (value) => {
                const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
                return regex.test(value)
            },
            message: (props) => `${props.value} email tidak valid`
        }
    },
    password: {
        type: String,
        required: [true, 'password harus di isi'],
        maxlength: [250, 'max karakter adalah 250'],
        minlength: [3, 'min karakter adalah 3']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        message: `{VALUE} yang kamu masukan tidak valid`,
        default: 'user'
    }
})

const User = mongoose.model('User', modelUser)

module.exports = User