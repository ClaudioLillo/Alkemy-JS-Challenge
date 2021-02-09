import jwt from 'jsonwebtoken'
require('dotenv').config()
import User from '../models/User'

export const verifyToken = async (req, res, next) =>{
    try{
        const token = req.headers["x-access-token"]
        console.log("token: ", token)

        if(!token){
        return res.status(403).json({message: "No Token Provided"})
        }
        const decoded = jwt.verify(token, process.env.SECRET)
        console.log("decoded: ", decoded)
        req.userId = decoded.user.id //se guarda el valor del id extraido por jwt en el request

        const user = await User.findOne({
            where:{
                id: req.userId
                }
            })
        if(!user) return res.status(404).json({message: 'user not found'})

        next()
    }
    catch(error){
        res.json({message: 'Unauthorized'})
        console.log(error)
    }
    
}
