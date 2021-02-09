import {Router} from 'express'
import {getTransactions, createTransaction} from '../controllers/transaction.controller'
import {verifyToken} from '../middlewares/authJwt'

const router = Router()
router.get('/', verifyToken, getTransactions)
router.post('/', verifyToken, createTransaction)



export default router