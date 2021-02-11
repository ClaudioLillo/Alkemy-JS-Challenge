import { Typography } from '@material-ui/core'
import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>({
    root:{
        color: 'rgba(150,100,200,1)',
    },
    title:{
        textAlign: 'center',
        margin: '20px',
    },
    info:{
        textAlign: 'center',
        margin: '20px',
    },
}))


export default function Landing(){
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Typography variant="h5" className={classes.title}>
                Bienvenido a la Aplicación de Billetera Virtual
            </Typography>
            <Typography className={classes.info}>
                Aquí podrás llevar un registro de todos tus ingresos
                y egresos de dinero y calcular fácilmente el estado
                de tus finanzas
            </Typography>
            <Typography className={classes.info}>
                Para comenzar Regístrate. Si ya tienes una cuenta, 
                Íngresa.
            </Typography>
        </div>
    )
}