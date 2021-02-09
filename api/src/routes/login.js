import {Router} from 'express'

import {userLogin} from '../controllers/login.controller'

const router = Router()
router.post('/',userLogin)

export default router

