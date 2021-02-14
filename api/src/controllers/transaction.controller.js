import Transaction from '../models/Transaction' 

export const getTransactions = async(req, res)=>{
    const userId = req.userId
    try{
        const transactions = await Transaction.findAll({
            where:{
                userId
            }
        })
        if(transactions){
            return(res.json({transactions}))
        }
    }
    catch(err){
        console.log(err)
    }
    
}

export const createTransaction = async(req, res)=>{
    const {amount, category, date, concept} = req.body
    const userId = req.userId
    try{
        const newTransaction = await Transaction.create({
            amount,
            category,
            userId,
            date,
            concept
        }, {
            fields: ['amount', 'category','userId', 'date', 'concept']
        })
        if(newTransaction){
            return res.status(201).json(newTransaction)
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg: "Error"})
    }
   
}

export const deleteTransaction = async(req, res)=>{
    const id = req.body.id
    try{
        let transaction = await Transaction.findByPk(id)
        if(transaction){
            await transaction.destroy()
            return res.status(204).json({msg: "transaction deleted"})
        }
    }
    catch(err){
        console.log(err)
    }
}

export const updateTransaction = async(req, res)=>{
    const {id, amount, category, date, concept} = req.body
    const userId = req.userId
    try{
        let transaction = await Transaction.findByPk(id)
        if(transaction){
            console.log("transaction: ", transaction)
            transaction.amount = amount
            transaction.category = category
            transaction.concept = concept
            transaction.date = date
            await transaction.save()
            return res.json({msg: "transaction updated"})
        }
        console.log("no está")
        return res.status(404).json({msg: "transaction not found"})
    }
    catch(err){
        console.log("en el error del api")
        console.log(err)
        return res.status(404).json({msg: "not found"})
    }
}


// module.exports = {getTransactions, createTransaction, deleteTransaction, }