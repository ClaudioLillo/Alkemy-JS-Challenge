import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, FormHelperText} from '@material-ui/core'
import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    dialogForm:{
        backgroundColor: 'rgba(0,23,240,0.2)',
        display: 'flex',
        flexDirection: 'column',

    },
}))


export default function Login(){
    const classes=useStyles()
    return(
    <div>
        <Dialog open={true}>
            <DialogTitle>Ingresa a tu cuenta</DialogTitle>
            <DialogContent className={classes.dialogForm}>
            <FormControl>
                <InputLabel htmlFor="name">Nombre</InputLabel>
                <Input id="name" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="lastName">Apellido</InputLabel>
                <Input id="lastName" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">email</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">xxx@xxx.xxx</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">contraseña</InputLabel>
                <Input id="password" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Al menos 8 caracteres</FormHelperText>
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary">Entrar</Button>
                <Button variant="outlined" color="secondary">Cancelar</Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}