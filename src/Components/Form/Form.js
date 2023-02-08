import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import formStyles from './styles';
import {createCinema, updateCinema} from '../../actions/cinemas';


const Form = ({ currentId, setCurrentId }) => {
    const [cinemaData, setCinemaData] = useState({
        title: '',
        bodyText: '',
        selectedFile: ''
    });
    const cinema = useSelector((state) => currentId ? state.cinemas.cinemas.find((bodytext) => bodytext._id === currentId) : null);
    const classes = formStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(cinema) setCinemaData(cinema);
    }, [cinema]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updateCinema(currentId, { ...cinemaData, name: user?.result?.name }, history));
        } 
        else {
            dispatch(createCinema({ ...cinemaData, name: user?.result?.name }));

        }

        clear();
    };

    const clear = () => {
        setCurrentId(0);
        setCinemaData({
            title: '',
            bodyText: '',
            selectedFile: ''
        });
    };

    if(!user?.result?.name) {
        return (
            <Paper sx={{padding: 2}}>
                <Typography variant='h6' align='center'>Login for creating a cinema</Typography>
            </Paper>
        );
    }
    
    return (
        <Paper sx={{padding: 2}} elevation={6}>
            <form autoComplete='off' noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant='h6'>{!currentId ? 'Creating' : 'Updating'} a cinema</Typography>
                <TextField name="title" variant='outlined' label="Title" fullWidth margin='dense' value={cinemaData.title} onChange={(e) => setCinemaData({ ...cinemaData, title: e.target.value})} />
                <TextField name="bodyText" variant='outlined' label="About" fullWidth margin='dense' value={cinemaData.bodyText} onChange={(e) => setCinemaData({ ...cinemaData, bodyText: e.target.value})} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setCinemaData({ ...cinemaData, selectedFile: base64})}/>
                </div>
                <Button sx={{marginBottom: 1}} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;