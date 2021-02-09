import {combineReducers} from 'redux'

import user from './user'
import transactions from './transactions'

const rootReducer = combineReducers({
    user,
    transactions
})

export default rootReducer