import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {currentDate as current}  from '../utils/getDate'
import {createTransaction, updateTransaction, getUserTransactions} from '../../redux/actions/transactions'

const category = [
    {
      value: 'entry',
      label: 'ingreso',
    },
    {
      value: 'out',
      label: 'egreso',
    },
  ]

const useStyles = makeStyles((theme)=>({
    button: {
        marginLeft: 'auto',
        marginBottom: '20px',
    },
    formControl: {
        margin: '10px',
        height: '60px',
    },
    numberInput: {
        height: '60px',
    },
}))


export default function Add({transaction}){
    const classes = useStyles()
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [inputs, setInputs] = useState({
        concept: transaction ? transaction.concept : '', 
        category:'entry',
        amount: transaction ? transaction.amount: '0', 
        date: current})
    
    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value})
    }

    const handleOpen = ()=>{
        setOpen(true)
    }
    const handleClose = ()=>{
        history.push('/')
        dispatch(getUserTransactions(token))
        setOpen(false)
    }
    const handleSubmit = ()=>{
        dispatch(createTransaction(inputs,token))
        cleanForm()
    }
    const edit = ()=>{
        console.log("editar")
        let data = {...inputs, id: transaction.id}
        dispatch(updateTransaction(data, token))
        dispatch(getUserTransactions(token))
        handleClose()
    }
    const cleanForm = ()=>{
        setInputs({
            concept:'', 
            category:'entry',
            amount: '0', 
            date: current})
    }

    return(
        <div>
            {transaction?
            <Button className={classes.button} 
                    variant="outlined" 
                    color="primary"
                    onClick={handleOpen}>Editar
            </Button>
            :
            <Button className={classes.button} 
                    variant="outlined" 
                    color="primary"
                    onClick={handleOpen}>Nueva transacción
            </Button>}
            <Dialog open={open}>
                <DialogTitle>
                    {transaction?"Editar transacción": "Nueva transacción"}
                </DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl} >
                        <TextField name="concept" 
                                    label="Concepto" 
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={inputs.concept}
                                    />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                    <TextField
                        id="outlined-select-currency-native"
                        name="category"
                        select
                        label="Tipo"
                        value={transaction? transaction.category: inputs.category}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        disabled={transaction?true:false}
                        >
                    {category.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                    </TextField>
                    </FormControl>
                    <FormControl className={classes.formControl} >
                        <label htmlFor="amount">Monto: </label>
                        <input type="number" 
                                className={classes.numberInput}  
                                name="amount" 
                                id="amount"
                                onChange={handleChange}
                                value={inputs.amount}/>
                    </FormControl>
                    <FormControl onChange={handleChange} className={classes.formControl}>
                        <label htmlFor="date">Fecha: </label>
                        <input type="date" 
                                id="date" 
                                name="date"
                                defaultValue={transaction? transaction.date :inputs.date}
                                min="2020-01-01"
                                max="2025-01-01"
                        />
                    </FormControl> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} 
                            variant="outlined"
                            color="default">Hecho</Button>

                    <Button onClick={transaction?edit:handleSubmit} 
                            variant="outlined"
                            color="primary">{transaction?"Editar":"Agregar"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}