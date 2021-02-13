import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import { Table, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Grid, TableBody, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

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
    const [filter, setFilter] = useState("all")

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

    const handleFilter = (e)=>{
        setFilter(e.target.value)
    }
    const applyFilter = (transaction)=>{
        if(transaction.category === filter || filter==="all"){
            return true
        }
        return false
    }

    return(
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h5" color="primary">{"Balance: $"+balance}</Typography>
                </Grid>
                <Grid item xs={4} sm={3}>
                    <Add/>
                </Grid>
            <Grid item xs={6} sm={3}>
            <FormControl variant="outlined">
                <InputLabel>Ver</InputLabel>
                <Select
                    value={filter}
                    label="Ver"
                    onChange={handleFilter}>
                    <MenuItem value={"all"}>todos</MenuItem>
                    <MenuItem value={"entry"}>ingresos</MenuItem>
                    <MenuItem value={"out"}>egresos</MenuItem>
                </Select>
            </FormControl>
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
                    {((i<10) && (applyFilter(transaction))) &&
                    <>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                            <Detail transaction={transaction}/>
                        </TableCell>
                        <TableCell className={classes[transaction.category]}>
                            {categorySymbol(transaction.category)+" "+transaction.amount}
                        </TableCell>
                    </>}
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