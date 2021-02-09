import { Button, Dialog, DialogTitle } from '@material-ui/core'
import React from 'react'

export default function Detail({transaction}){
    const stringLimit = (str, len)=>{
        return str.substring(0,len)+"..."
    }
    return(
        <div>
            <Button variant="outlined">{stringLimit(transaction.concept,10)}</Button>
            <Dialog open={false}>
                <DialogTitle>
                    Detalle de Transacción
                </DialogTitle>
            </Dialog>
        </div>
    )
}