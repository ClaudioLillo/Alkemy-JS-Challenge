import axios from 'axios'
import Swal from 'sweetalert2'

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
                Swal.fire('Transacción agregada con éxito')
            })
            
        }
        catch(err){
            console.log(err)
        }
    }
}

export function getUserTransactions(token){
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
                console.log("get res", res)
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

export function deleteTransaction(data,token){
    return async function(dispatch){
        try{
            return await axios({
                method: 'delete',
                url: 'http://localhost:3001/api/transactions',
                data: data,
                headers: {
                    "x-access-token": token
                }
            })
            .then(res=>{
                console.log("delete res :", res)
                getUserTransactions(token)
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export function updateTransaction(data, token){
    return async function (dispatch){
        try{
            return await axios({
                method: 'put',
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