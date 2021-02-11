import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import {saveUser} from '../../redux/actions/user'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import Balance from '../balance/Balance'
import Landing from '../landing/Landing'
import { Button, Grid, Typography } from '@material-ui/core';
import { getUserTransactions } from '../../redux/actions/transactions'



const useStyles = makeStyles((theme) =>({
    root:{
        display:'flex',
        flexDirection:'column',
        witdh: '100%',
    },
    appBar: {
        position:'relative',
        padding: '20px',
        alignItems:'center',
        width: '100%',
        border: '1px solid black',
    },
    title:{
        backgroundColor: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        borderRadius: '5px',
    },
    loginButton:{
        marginLeft:'50px',
        color: 'white',
        marginTop: '5px',
    },
    userName:{
        textAlign: 'center',
        marginLeft: '30px',
        marginTop: '30px',
    },
    exitIcon:{
        marginLeft: '50px',
        fontSize: '200%',
    },
    appBarContainer:{
        width: '100%',
        border: '1px solid black',
    },
}))

export default function Home(){
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    

    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(token){
            axios.get('http://localhost:3001/api/users',{
                headers:{
                    "x-access-token": token 
                }
            })
            .then(res =>{
                setUser(res.data)
                dispatch(saveUser(res.data))
                dispatch(getUserTransactions(token))
            })
        }
        else{
            setUser(null)
        }
    },[dispatch])

    const gotoRegister = () =>{
        history.push('/register')
    }
    const gotoLogin = () =>{
        history.push('/login')
    }
    const handleLogout = ()=>{
        localStorage.clear()
        window.location.reload({forceReload: false})
    }
    const camelCase = (string)=>{
        return string[0].toUpperCase() + string.substring(1,string.length)
    }

    return(
        <div className={classes.root}>
            
            <AppBar className={classes.appBar}>
            <Grid container className={classes.appBarContainer}>
                <Grid item xs={12} sm={5}>
                <h1 className={classes.title}>Billetera Virtual</h1>
                </Grid>

                {user?
                <Grid item xs={6} sm={3}>
                <Typography 
                    className={classes.userName}
                    variant="h6"
                    >
                    {camelCase(user.name)+" "+camelCase(user.lastName)}
                </Typography>
                </Grid>
                :
                <>
                <Grid item xs={5} sm={2}>
                    <Button className={classes.loginButton} 
                            variant="outlined" 
                            color="default"
                            onClick={gotoLogin}>
                        Ingresa
                    </Button>
                </Grid>
                <Grid item xs={5} sm={2}>
                    <Button className={classes.loginButton} 
                            variant="outlined" 
                            color="default"
                            onClick={gotoRegister}>
                        Regístrate
                    </Button>
                </Grid>
                </>}
                {user?
                <Grid item xs={3}>
                <IconButton onClick={handleLogout}>
                <ExitToAppIcon className={classes.exitIcon}/>
                </IconButton>
                </Grid>:
                null}
                </Grid> 
            </AppBar>
            <Grid container>
            {user ?
            <Balance/>
            :<Landing/>
            }
            </Grid>
            
        </div>
    )
}