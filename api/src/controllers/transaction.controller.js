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
    const {id, amount, concept} = req.body
    try{
        let transaction = await Transaction.findByPk(id)
        if(transaction){
            transaction.amount = amount
            transaction.concept = concept
            transaction.date = date
            await transaction.save()
            return res.json({msg: "transaction updated"})
        }
    }
    catch(err){
        console.log(err)
    }
}


// module.exports = {getTransactions, createTransaction, deleteTransaction, }