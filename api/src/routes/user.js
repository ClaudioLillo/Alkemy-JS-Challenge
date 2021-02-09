import {Router} from 'express'

import {createUser, getUser} from '../controllers/user.controller'
import {verifyToken} from '../middlewares/authJwt'

const router = Router()
router.post('/',createUser)
router.get('/', verifyToken, getUser)


export default router
