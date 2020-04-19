const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) =>{
    try {
        const token = req.headers.token

        if (!token){
            return res.status(403).json({message: "Токен не найден"})
        }

        try {
            const decoded = jwt.verify(token, process.env.secretKey || config.get('secretKey'))
            // console.log(decoded);
            
            req.user = decoded.email
            next()
        } catch (error) {
            res.status(403).json({message: error.message})
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}