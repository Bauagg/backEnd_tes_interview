const User = require('../models/model-user')
const bcrypt = require('../utils/bcrypt')
const jwt = require('../utils/jwt')

const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body

        const validateEmail = await User.exists({ email })
        if (validateEmail) return res.status(401).json({ error: true, message: 'email sudah terdaftar' })

        if (!password || password.length < 3) return res.status(500).json({ error: true, message: 'password kurang kuat' })

        const newUser = await User.create({ name, email, password: await bcrypt.hashPassword(password), role })

        res.status(201).json({
            error: false,
            message: 'register successfully',
            datas: newUser
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const newUser = await User.findOne({ email })
        if (!newUser) return res.status(401).json({ error: true, message: 'Email dan Password salah' })

        const verifyPassword = await bcrypt.verifyPassword(password, newUser.password)
        if (!verifyPassword) return res.status(401).json({ error: true, message: 'Email dan Password salah' })

        const payloadToken = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }

        const token = await jwt.createToken(payloadToken)

        res.status(200).json({
            error: false,
            message: 'login successfully',
            datas: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                token: token
            }
        })
    } catch (error) {
        next(error)
    }
}

const profile = async (req, res, next) => {
    try {
        const newUser = await User.findById(req.user.id).select('-password')

        res.status(200).json({
            error: false,
            message: 'get data profile user success',
            datas: newUser
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { register, login, profile }