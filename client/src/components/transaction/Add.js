import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {currentDate as current}  from '../utils/getDate'
import {createTransaction} from '../../redux/actions/transactions'

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
    },
    formControl: {
        margin: '10px',
        height: '60px',
    },
    numberInput: {
        height: '60px',
    },
}))


export default function Add(){
    const classes = useStyles()
    const user = useSelector(state=>state.user.data)
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [inputs, setInputs] = useState({concept:'', category:'entry',amount: '0', date: current})
    
    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value})
    }

    const handleOpen = ()=>{
        setOpen(true)
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    const handleSubmit = ()=>{
        dispatch(createTransaction(inputs,token))
    }
    if(user){
        console.log(user)
    }
    return(
        <div>
            <Button className={classes.button} 
                    variant="outlined" 
                    color="primary"
                    onClick={handleOpen}>Nueva transacción</Button>
            <Dialog open={open}>
                <DialogTitle>Nueva transacción</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl} onChange={handleChange}>
                        <TextField name="concept" label="Concepto" variant="outlined"/>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                    <TextField
                        id="outlined-select-currency-native"
                        name="category"
                        select
                        label="Tipo"
                        value={inputs.category}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        >
                    {category.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                    </TextField>
                    </FormControl>
                    <FormControl className={classes.formControl} onChange={handleChange}>
                        <label htmlFor="amount">Monto: </label>
                        <input type="number" className={classes.numberInput} name="amount" id="amount"/>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <label htmlFor="date">Fecha: </label>
                        <input type="date" 
                                id="date" 
                                name="date"
                                defaultValue={inputs.date}
                                min="2020-01-01"
                                max="2025-01-01"
                        />
                    </FormControl> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} 
                            variant="outlined"
                            color="secondary">Cancelar</Button>
                    <Button onClick={handleSubmit} 
                            variant="outlined"
                            color="primary">Agregar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}