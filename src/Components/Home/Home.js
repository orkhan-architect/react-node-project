import React, {useState} from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import {getCinemasBySearch} from '../../actions/cinemas';

import Cinemas from '../Cinemas/Cinemas';
import Form from '../Form/Form';
import Pagination from '../Pagination';

import useStyles from './styles';

function useQuery() { return new URLSearchParams(useLocation().search); }

const Home = () => {
    const classes = useStyles();

    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const history = useNavigate();

    const query = useQuery();    
    const page = query.get('page') || 1; console.log(page)
    const searchQuery = query.get('searchQuery');

    const searchPost = () => {
        if (search.trim()) {
          dispatch(getCinemasBySearch({search}));
          history(`/cinemas/search?searchQuery=${search || 'none'}`);
        } else {
          history('/');
        }
    };
    
    const handleKeyPress = (e) => { if(e.keyCode === 13) searchPost(); };

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Cinemas setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="Search Cinemas" fullWidth onKeyDown={handleKeyPress} value={search} onChange={ (e) => setSearch(e.target.value) } />
                            <Button onClick={searchPost} sx={{marginTop: 1}} variant="contained" color="primary">Search</Button>
                        </AppBar>

                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery) && (
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;