import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import React, {useState} from 'react'
import {deleteTransaction, getUserTransactions} from '../../redux/actions/transactions'
import {useDispatch} from 'react-redux'
import Add from '../transaction/Add'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'

export default function Detail({transaction}){
    const [open, setOpen] = useState(false)
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const history = useHistory()

    const stringLimit = (str, len)=>{
        return str.substring(0,len)+"..."
    }

    const handleOpen = ()=>{
        setOpen(true)
    }

    const handleClose = ()=>{
        setOpen(false)
    }

    const renameCategory = (cat) =>{
        return (cat==='entry')? "Ingreso" : "Egreso"
    }

    const deleteCurrentTransaction =()=>{
        let data = {id: transaction.id}
        dispatch(deleteTransaction(data, token))
        Swal.fire('Transacción eliminada')
        
        handleClose()
        history.push("/")
        dispatch(getUserTransactions(token))

    }
    if(transaction && open){
        console.log(transaction.id)
    }
    return(
        <div>
            <Button onClick={handleOpen}variant="outlined">{stringLimit(transaction.concept,10)}</Button>
            <Dialog open={open}>
                <DialogTitle>
                    Detalle de Transacción
                </DialogTitle>
                <DialogContent>
                <Typography>Fecha: </Typography>
                <Typography variant="h6">{transaction.date}</Typography>
                <Typography>Tipo de operación: </Typography>
                <Typography variant="h6">{renameCategory(transaction.category)}</Typography>
                <Typography>Concepto: </Typography>
                <Typography variant="h6">{transaction.concept}</Typography>
                <Typography>Monto: </Typography>
                <Typography variant="h6">{"$"+transaction.amount}</Typography>
                </DialogContent>
                <DialogActions>
                    <Add transaction={transaction}/>
                    <Button onClick={deleteCurrentTransaction} variant="outlined">Eliminar</Button>
                    <Button onClick={handleClose}variant="outlined">Salir</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}