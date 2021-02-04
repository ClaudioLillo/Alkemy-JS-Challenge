import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Table, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) =>({
    root:{
        position: 'relative',
        padding: ' 30px',
    },
    table:{
        
    },
}))

const data=[
    ['03-04-2005','ingreso','remuneraciones','850000'],
    ['03-04-2005','ingreso','remuneraciones','850000'],
    ['03-04-2005','ingreso','remuneraciones','850000'],
    ['03-04-2005','ingreso','remuneraciones','850000'],
    ['14-04-2005','egreso','combustible','8500'],
    ['03-04-2005','ingreso','remuneraciones','850000'],
    ['03-04-2005','ingreso','arriendo','200000'],
    ['07-04-2005','egreso','remuneraciones','850000'],
    ['10-04-2005','ingreso','remuneraciones','850000'],
    ]

export default function Balance(){
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Typography variant="h2" component="h2" color="primary">Balance : $8000</Typography>
            <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Movimiento</TableCell>
                        <TableCell>Resumen</TableCell>
                        <TableCell>Monto</TableCell>
                    </TableRow>

                </TableHead>
                {data.map((element,i)=>
                    <TableRow>
                        <TableCell>{element[0]}</TableCell>
                        <TableCell>Movimiento</TableCell>
                        <TableCell>Resumen</TableCell>
                        <TableCell>Monto</TableCell>
                    </TableRow>
                    )}
                
            </Table>
            </TableContainer>
            
        </div>
    )
}