import Sequelize from 'sequelize'
import sequelize from '../database/database'

const Transaction = sequelize.define('transaction',{
    amount: {
        type: Sequelize.INTEGER
    },
    category: {
        type: Sequelize.ENUM('out', 'entry')
    },
    userId:{
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.STRING
    },
    concept: {
        type: Sequelize.TEXT
    },
}, {
    timestamps: true
})

Transaction.sync({force: true})

export default Transaction




