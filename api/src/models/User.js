import Sequelize from 'sequelize'
import {sequelize} from '../database/database'

import Transaction from './Transaction'

const User = sequelize.define('user',{
    name: {
        type: Sequelize.TEXT
    },
    lastName: {
        type: Sequelize.TEXT
    },
    email:{
        type: Sequelize.TEXT
    },
    password:{
        type: Sequelize.TEXT
    }
}, {
    timestamps: false
})

User.hasMany(Transaction, {foreignkey: 'userId'})
Transaction.belongsTo(User)

User.sync({force: true})

export default User