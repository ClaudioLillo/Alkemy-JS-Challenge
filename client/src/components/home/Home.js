import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'; 

import Balance from '../balance/Balance'
import { Button } from '@material-ui/core';



const useStyles = makeStyles((theme) =>({
    root:{
        display:'flex',
        flexDirection:'column',
    },
    appBar: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        height: '100px',
        position:'relative',
    },
    title:{
        width: '40%',
        border: '1px solid rgba(0,0,0,1)',
        textAlign: 'center',
    },
    menuIcon:{
        width: '100px',
        
    },
    avatar:{
        display:'flex',
        margin:theme.spacing(1),
        width: '80px',
        height: '80px',
        marginLeft: 'auto',
    },
    loginButton:{
        marginLeft:'auto',
    }
}))

export default function Home(){
    const classes = useStyles()

    return(
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <IconButton className={classes.menuIcon}>
                    <MenuIcon/>
                </IconButton>
                <h1 className={classes.title}>Billetera Virtual</h1>
                <Button className={classes.loginButton}variant="outlined" color="default">Login</Button>
                <Avatar className={classes.avatar} alt="Lo que sea" src="/static/images/avatar/1.jpg"/>
                
            </AppBar>

            <Balance/>
            
        </div>
    )
}