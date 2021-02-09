import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {saveUser} from '../../redux/actions/user'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, FormHelperText} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import axios from 'axios'
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme)=>({
    dialogForm:{
        backgroundColor: 'rgba(0,23,240,0.2)',
        display: 'flex',
        flexDirection: 'column',

    },
}))
export default function Register(){
    const history = useHistory()
    const dispatch = useDispatch()
    const classes=useStyles()
    const [user, setUser] = useState({email:'', password:''})

    const handleInput = (e) =>{
        setUser({...user, [e.target.name] : e.target.value})
    }
    const handleSubmit = (e) =>{
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/login',
            data: user
        })
        .then(res => res.data)
        .then(data => {
            console.log(data)
            localStorage.setItem('token',data.token)
            let userData = {
                id: data.userId,
                name: data.name,
                lastName: data.lastName
            }
            dispatch(saveUser(userData))  
        })
        handleQuit()
    }

    const handleQuit = () => {
        setTimeout(function(){history.push('/')},1000)
        
    }

    if(user){
        console.log(user)
    }
    return(
        <div>
            <Dialog open={true}>
            <DialogTitle>Ingreso de Usuario</DialogTitle>
            <DialogContent className={classes.dialogForm}>
            <FormControl onChange={handleInput}>
                <InputLabel htmlFor="email">email</InputLabel>
                <Input name="email" id="email" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl onChange={handleInput}>
                <InputLabel htmlFor="password">contraseña</InputLabel>
                <Input type="password" name="password" id="password" />
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleSubmit}>Ingresar</Button>
                <Button variant="outlined" color="secondary" onClick={handleQuit}>Cancelar</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}