import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import Cinema from './Cinema/Cinema';

import cinemasStyles from './styles';

const Cinemas = ({setCurrentId}) => {
    const classes = cinemasStyles();

    const {cinemas, isLoading } = useSelector((state) => state.cinemas);
    if(!cinemas.length && !isLoading) return 'No cinemas';
    
    return (
        isLoading ? <CircularProgress /> : 
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {cinemas?.map((cinema) => (
                    <Grid item key={cinema._id} xs={12} sm={12} md={6} lg={3}>
                        <Cinema cinema={cinema} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>        
    );
};

export default Cinemas;