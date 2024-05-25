const jwt = require('jsonwebtoken')

// const config = require('../config/config')
const secret = 'hfuo poiefxpoi'

module.exports = {
    createToken: (token) => {
        return jwt.sign(token, secret)
    },
    verifyToken: (token) => {
        try {
            return jwt.verify(token, secret)
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Token has expired')
            } else {
                throw new Error('Invalid Token')
            }
        }
    }
}