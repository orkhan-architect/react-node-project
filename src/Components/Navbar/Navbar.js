import React, { useState, useEffect } from 'react';
import { Avatar, Button, Link, Toolbar, AppBar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import navbarStyles from './styles';

import cinemaLogo from '../../Assets/Images/cinemaLogo.png';

const Navbar = () => {
    const classes = navbarStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        history('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography variant='h2' align='center'>
                    <Link href="/" color="black" underline="none">Cinemas</Link>
                </Typography>
                <img className={classes.image} src={cinemaLogo} alt='cinemaLogo' />
                
                <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar variant="square" alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography variant="h4">{user?.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>
                            <Link color="black" underline="none">LOGOUT</Link>
                        </Button>
                    </div>
                    ) : (
                        <Link href="/auth" underline="none"><Button variant='contained' color='primary'>LOGIN</Button></Link>
                    )}
                </Toolbar>
            </div>
        </AppBar>
    );
}

export default Navbar;