import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import moment from 'moment';
import {useDispatch} from 'react-redux';

import cinemaStyles from './styles';
import { deleteCinema, likeCinema } from '../../../actions/cinemas';

const Cinema = ({ cinema, setCurrentId }) => {
    const classes = cinemaStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (cinema.likes.length > 0) {
          return cinema.likes.find((like) => like === user?.result?._id)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{cinema.likes.length > 2 ? `You and ${cinema.likes.length - 1} others` : `${cinema.likes.length} like${cinema.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{cinema.likes.length} {cinema.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
        return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
    };

    const openPost = (e) => { history(`/cinemas/${cinema._id}`); };

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase component="span" name="test" sx={{display: 'block'}} onClick={openPost}>
                <CardMedia className={classes.media} image={cinema.selectedFile} title={cinema.title} />

                <div className={classes.overlay}>
                    <Typography variant='h6'>{cinema.name}</Typography>
                    <Typography variant="body2">{moment(cinema.createdAt).fromNow()}</Typography>
                </div>
                
                <Typography className={classes.title} variant="h5" gutterBottom>{cinema.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{cinema.bodyText}</Typography>
                </CardContent>
            </ButtonBase>

            {(user?.result?._id === cinema?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{color: "white"}} size="small" onClick={() => setCurrentId(cinema._id)}>
                        <MoreHorizIcon fontSize='default' style={{zIndex: 1, position: 'absolute'}} />
                    </Button>
                </div>
            )}

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeCinema(cinema._id))}>
                    <Likes />
                </Button>
                {(user?.result?._id === cinema?.creator) && (
                <Button size="small" color="primary" onClick={() => dispatch(deleteCinema(cinema._id))}>
                    <DeleteIcon fontSize='small' /> Delete
                </Button>
                )}                
            </CardActions>
        </Card>
    );
}

export default Cinema;