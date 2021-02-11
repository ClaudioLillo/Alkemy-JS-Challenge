import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import { Table, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Grid, TableBody } from '@material-ui/core'

import Add from '../transaction/Add'
import Detail from '../transaction/Detail'

const useStyles = makeStyles((theme) =>({
    root:{
        position: 'relative',
        padding: ' 30px',
        width: '100%',
    },
    table:{ 
        width: '100%',
    },
    entry: {
        color: 'green',
    },
    out: {
        color: 'red',
    },
}))

export default function Balance(){
    const classes = useStyles()
    const transactions = useSelector(state=>state.transactions.data)
    const [balance, setBalance] = useState(null)

     const categorySymbol = (cat) =>{
         return (cat==='entry')? "↑" : "↓"
     }
    useEffect(()=>{
        if(transactions){
            let sum = 0
            for(let i of transactions){
                if(i.category==="entry"){
                    sum += i.amount
                }
                else{
                    sum -=i.amount
                }
                
            }
            setBalance(sum)
        }
    },[transactions])
    

    return(
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h5" color="primary">{"Balance: $"+balance}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Add/>
                </Grid>
            <Grid item xs={12} >
            <TableContainer component={Paper} >
            <Table className={classes.table} >
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Detalle</TableCell>
                        <TableCell>Monto</TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>
                {transactions && transactions.map((transaction,i)=>
                    <TableRow key={i}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                            <Detail transaction={transaction}/>
                        </TableCell>
                        <TableCell className={classes[transaction.category]}>
                            {categorySymbol(transaction.category)+" "+transaction.amount}
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
            </TableContainer>
            </Grid>
            </Grid>
        </div>
    )
}