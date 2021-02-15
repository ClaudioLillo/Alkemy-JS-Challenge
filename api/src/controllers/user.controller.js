import User from '../models/User'

export const createUser = async(req, res) => {
    const {name, lastName, email, password} = req.body
    try{
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(user){
            return(res.status(409).json({msg: "Email adress is already registered"}))
        }
        else{
            const newUser = await User.create({
                name,
                lastName,
                email,
                password
            }, {
                fields: ['name', 'lastName', 'email', 'password']
            })
            if(newUser){
                return(res.status(201).json({msg: "User created"}))
            }
        }
        
    }
    catch(e){
        console.log(e)
        res.status(500).json({msg: "Error"})
    }
}

export const getAllUsers = async(req, res) =>{
    try{
        const users = await User.findAll()
        if(users){
            return(res.json(users))
        }
    }
    catch(e){
        console.log(e)
    }
}

export const getUser = async(req, res)=>{
    try{
        let user = await User.findByPk(req.userId)
        if(user){
            return(res.json({id: user.id, name: user.name, lastName: user.lastName}))
        }
    }
    catch(err){
        console.log(err)
    }
}


