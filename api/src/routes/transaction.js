import {Router} from 'express'
import {getTransactions, createTransaction, deleteTransaction, updateTransaction} from '../controllers/transaction.controller'
import {verifyToken} from '../middlewares/authJwt'

const router = Router()
router.get('/', verifyToken, getTransactions)
router.post('/', verifyToken, createTransaction)
router.delete('/', verifyToken, deleteTransaction)
router.put('/',verifyToken, updateTransaction)


export default router