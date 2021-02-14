import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles((theme)=>({
    root: {
        textAlign: 'center',
        marginTop: '20px',
    },
}))

export default function Empty({transactions}){
    const classes = useStyles()
    return(
        <div>
            {(transactions && transactions.length > 0) ?
            null
            :<Typography variant="h5" className={classes.root}>No hay transacciones aún</Typography>}
        </div>
        
    )
}