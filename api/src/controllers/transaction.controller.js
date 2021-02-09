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

const deleteTransaction = (req, res)=>{
    const id = req.body.id
    console.log(id)
    return(res.json({
        msg: "done"
    }))


}


module.exports = {getTransactions, createTransaction, deleteTransaction}