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
        if(decoded.JsonWebTokenError){
            console.log("Error de jwt")
            return res.status(403).json({msg: "Unauthorized"})
        }
        console.log("decoded: ", decoded)
        req.userId = decoded.user.id 

        const user = await User.findOne({
            where:{
                id: req.userId
                }
            })
        if(!user) return res.status(404).json({message: 'user not found'})

        next()
    }
    catch(error){
        res.status(403).json({message: 'Unauthorized'})
    }
    
}
