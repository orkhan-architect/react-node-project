import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Typography, Paper, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import useStyles from './styles';
import Input from './Input';
import { login, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignUp, setIsSignup] = useState(false);

    const dispatch = useDispatch();
    const history = useNavigate();
    const classes = useStyles();  

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
          dispatch(signup(form, history));
        } else {
          dispatch(login(form, history));
        }
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} sx={{ bgcolor: "red" }}><LockOutlinedIcon /></Avatar>
            
                <Typography component="h1" variant='h5'>{isSignUp ? "SIGNUP" : "LOGIN"}</Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                    { isSignUp && (
                    <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{marginTop: 1}}>
                        { isSignUp ? 'Sign up' : 'LOGIN' }
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{ isSignUp ? 'Already have an account? LOGIN' : "No account yet, SIGN UP" }</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;