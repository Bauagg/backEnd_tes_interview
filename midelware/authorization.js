const jwt = require('../utils/jwt')
const { getToken } = require('../utils/getToken')

module.exports = (req, res, next) => {
    try {
        const token = getToken(req)
        if (!token) return res.status(401).json({ error: false, message: 'authenticate faileds' })

        const verifyToke = jwt.verifyToken(token)
        if (!verifyToke) return res.status(401).json({ error: false, message: 'authenticate faileds' })

        req.user = verifyToke
        next()
    } catch (error) {
        next(error)
    }
}