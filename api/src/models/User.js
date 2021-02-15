import Sequelize from 'sequelize'
import sequelize from '../database/database'

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
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
})


User.hasMany(Transaction, {foreignkey: 'userId', sourceKey: 'id'})
Transaction.belongsTo(User, {foreignKey: 'userId', sourceKey: 'id'})

// User.sync({force: true})


export default User