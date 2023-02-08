import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { commentCinema } from '../../actions/cinemas';
import useStyles from './styles';

const CommentComponent = ({ cinema }) => {
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem('profile'));

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(cinema?.comments);

    const dispatch = useDispatch();
    const commentsRef = useRef();

    const handleComment = async () => {
        const newComments = await dispatch(commentCinema(`${user?.result?.name}: ${comment}`, cinema._id));
    
        setComment('');
        setComments(newComments);
    
        setTimeout(function () {
          commentsRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
          });
     }, 100);
    };

    return (
        <div>
          <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
              <Typography gutterBottom variant="h6">Comments</Typography>
              {comments?.map((c, i) => (
                <Typography key={i} gutterBottom variant="subtitle1">
                  <strong>{c.split(': ')[0]}</strong>
                  {c.split(':')[1]}
                </Typography>
              ))}
              <div ref={commentsRef} />
            </div>
            <div style={{ width: '70%' }}>
              <Typography gutterBottom variant="h6">Type your comment</Typography>
              <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
              <br />
              <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                Comment
              </Button>
            </div>
          </div>
        </div>
      );
};

export default CommentComponent;