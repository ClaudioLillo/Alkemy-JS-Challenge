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

app.get('/', (req, res)=>{
    return res.status(200).json({
        name: 'Virtual Wallet API',
        author: 'Claudio Lillo'
    })
})

//Routes
app.use('/api/users', userRoutes)
app.use('/api/register', registerRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/login', loginRoutes)


module.exports = app


  


