import express, {json} from 'express'
import morgan from 'morgan'
const cors = require('cors')

const app = express()

// Import Routes
import userRoutes from './routes/user'
import transactionRoutes from './routes/transaction'
import loginRoutes from './routes/login'
import registerRoutes from './routes/register'

//Middlewares
app.use(morgan('dev'))
app.use(json())
app.use(cors())

//Routes
app.use('/api/users', userRoutes)
app.use('/api/register', registerRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/login', loginRoutes)






export default app

  


