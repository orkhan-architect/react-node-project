import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import useStyles from './styles';
import { getCinema, getCinemasBySearch } from '../../actions/cinemas';
import CommentComponent from './CommentComponent';

const CinemaDetails = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { cinema, isLoading } = useSelector((state) => state.cinemas);
  const {id} = useParams();

  useEffect(() => {
    dispatch(getCinema(id));
  }, [id]);

  useEffect(() => {
    if(cinema) {
      dispatch(getCinemasBySearch({ search: 'none' }));
    }
  }, [cinema]);

  if (!cinema) return null;

  if(isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{cinema.title}</Typography>
          <Typography gutterBottom variant="body1" component="p">{cinema.bodyText}</Typography>
          <Typography variant="h6">Created by: {cinema.name}</Typography>
          <Typography variant="body1">{moment(cinema.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentComponent cinema={cinema} />
          <Divider style={{ margin: '20px 0' }} />
        </div>

        <div className={classes.imageSection}>
          <img className={classes.media} src={cinema.selectedFile} alt={cinema.title} />
        </div>
      </div>

    </Paper>
  )
}

export default CinemaDetails;