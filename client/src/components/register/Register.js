import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, FormHelperText} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme)=>({
    dialogForm:{
        backgroundColor: 'rgba(0,23,240,0.2)',
        display: 'flex',
        flexDirection: 'column',

    },
}))
export default function Register(){
    const history = useHistory()
    const classes=useStyles()
    const [user, setUser] = useState({name:'', lastName:'', email:'', password:''})

    const handleInput = (e) =>{
        setUser({...user, [e.target.name] : e.target.value})
    }
    const handleSubmit = (e) =>{
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/users',
            data: user
        })
        .then(res => res.data)
        .then(data => {
            console.log(data)
        }) 
    }

    const handleQuit = () => {
        history.push('/')
    }

    if(user){
        console.log(user)
    }
    return(
        <div>
            <Dialog open={true}>
            <DialogTitle>Ingreso de Nuevo Usuario</DialogTitle>
            <DialogContent className={classes.dialogForm}>
            <FormControl onChange={handleInput}>
                <InputLabel htmlFor="name">Nombre</InputLabel>
                <Input name="name" id="name" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl onChange={handleInput}>
                <InputLabel htmlFor="lastName">Apellido</InputLabel>
                <Input name="lastName" id="lastName" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl onChange={handleInput}>
                <InputLabel htmlFor="email">email</InputLabel>
                <Input name="email" id="email" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl onChange={handleInput}>
                <InputLabel htmlFor="password">contraseña</InputLabel>
                <Input type="password" name="password" id="password" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Al menos 8 caracteres</FormHelperText>
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleSubmit}>Regístrate</Button>
                <Button variant="outlined" color="secondary" onClick={handleQuit}>Cancelar</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}