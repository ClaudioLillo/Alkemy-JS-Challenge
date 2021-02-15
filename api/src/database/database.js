import Sequelize from 'sequelize'
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)

export default sequelize

// const dbInit = async() => {
//     try{
//         await sequelize.sync({force: true})
//         sequelize.authenticate()
//         console.log("Connection has benn established successfully.")
//     }
//     catch(err){
//         console.log(err)
//     }
    
// }

// dbInit()


