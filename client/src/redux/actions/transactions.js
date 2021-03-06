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
            .then((res)=>{
                
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export function updateTransaction(data, token){
    return async function (dispatch){
        console.log("en el action")
        try{
            return await axios.put('http://localhost:3001/api/transactions', data,
                {headers:{
                    "x-access-token": token 
                }})
            .then(res=>{
                console.log(res.status)
                Swal.fire('Transacción editada')

            })
            
        }
        catch(err){
            console.log(err)
        }
    }
}