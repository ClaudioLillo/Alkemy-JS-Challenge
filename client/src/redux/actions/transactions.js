import axios from 'axios'

export function createTransaction(data, token){
    return async function (dispatch){
        try{
            return await axios({
                method: 'post',
                url: 'http://localhost:3001/api/transactions',
                data: data,
                headers:{
                    "x-access-token": token 
                }
            })
            .then(res=>{
                console.log(res)
            })
            
        }
        catch(err){
            console.log(err)
        }
    }
}

export function getUserTransactions(token){
    console.log("en el action")
    return async function(dispatch){
        try{
            return await axios({
                method: 'get',
                url: 'http://localhost:3001/api/transactions',
                headers: {
                    "x-access-token": token
                }
            })
            .then(res =>{
                dispatch({
                    type: 'SAVE_USER_TRANSACTIONS',
                    payload: res.data.transactions
            })
        })}
        catch(err){
            console.log(err)
        }
    }
}