import Sequelize from 'sequelize'
import {sequelize} from '../database/database'

import Transaction from './Transaction'

const User = sequelize.define('user',{
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lastName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email:{
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
})

User.hasMany(Transaction, {foreignkey: 'userId'})
Transaction.belongsTo(User)

User.sync({force: true})

export default User